import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { getNotificationEmail, sendEmail } from "@/lib/email";
import { contactNotificationEmail } from "@/lib/email-templates/contact-notification";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().max(200),
  phone: z.string().max(40).optional().default(""),
  message: z.string().min(5).max(5000),
  website: z.string().optional().default(""), // honeypot
});

export async function POST(request: Request) {
  try {
    if (isRateLimited(`contact:${getClientIp(request)}`, 5, 10 * 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please fill in your name, email, and message." },
        { status: 400 }
      );
    }
    const data = parsed.data;

    if (data.website) return NextResponse.json({ ok: true }); // bot trapped

    const sent = await sendEmail({
      to: getNotificationEmail(),
      subject: `New Contact Message from ${data.name}`,
      html: contactNotificationEmail(data),
      replyTo: data.email,
    });

    if (!sent) {
      return NextResponse.json(
        { error: "We couldn't send your message. Please call (440) 488-4024." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
