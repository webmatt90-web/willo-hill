import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { getNotificationEmail, sendEmail } from "@/lib/email";
import { prayerNotificationEmail } from "@/lib/email-templates/prayer-notification";

const prayerSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email().max(200).optional().or(z.literal("")),
  request: z.string().min(5).max(5000),
  is_public: z.boolean().default(false),
  website: z.string().optional().default(""), // honeypot
});

export async function POST(request: Request) {
  try {
    if (isRateLimited(`prayer:${getClientIp(request)}`, 5, 10 * 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const parsed = prayerSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please add your name and prayer request." },
        { status: 400 }
      );
    }
    const data = parsed.data;

    if (data.website) return NextResponse.json({ ok: true }); // bot trapped

    const supabase = createAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "The site isn't fully set up yet. Please call (440) 488-4024." },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("prayer_requests").insert({
      name: data.name,
      email: data.email || null,
      request: data.request,
      is_public: data.is_public,
    });

    if (error) {
      console.error("prayer insert failed:", error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    await sendEmail({
      to: getNotificationEmail(),
      subject: `New Prayer Request from ${data.name}`,
      html: prayerNotificationEmail({
        name: data.name,
        email: data.email,
        request: data.request,
        isPublic: data.is_public,
      }),
      replyTo: data.email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("prayer route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
