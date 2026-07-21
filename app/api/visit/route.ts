import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { getNotificationEmail, sendEmail } from "@/lib/email";
import { visitConfirmationEmail } from "@/lib/email-templates/visit-confirmation";
import { visitNotificationEmail } from "@/lib/email-templates/visit-notification";

const childSchema = z.object({
  name: z.string().max(100),
  age: z.string().max(50),
  allergies: z.string().max(300),
});

const visitSchema = z.object({
  visit_date: z.string().min(1).max(100),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  email: z.email().max(200),
  phone: z.string().max(40).optional().default(""),
  bringing_kids: z.boolean().default(false),
  other_adult_name: z.string().max(200).optional().default(""),
  needs_ride: z.boolean().default(false),
  pickup_address: z.string().max(400).optional().default(""),
  wants_host: z.boolean().default(false),
  coffee_order: z.string().max(200).optional().default(""),
  children: z.array(childSchema).max(10).default([]),
  website: z.string().optional().default(""), // honeypot — real users leave empty
});

export async function POST(request: Request) {
  try {
    if (isRateLimited(`visit:${getClientIp(request)}`, 5, 10 * 60_000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const parsed = visitSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
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

    const { error } = await supabase.from("visit_registrations").insert({
      visit_date: data.visit_date,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || null,
      bringing_kids: data.bringing_kids,
      other_adult_name: data.other_adult_name || null,
      needs_ride: data.needs_ride,
      pickup_address: data.pickup_address || null,
      wants_host: data.wants_host,
      coffee_order: data.coffee_order || null,
      children: data.children.length ? data.children : null,
    });

    if (error) {
      console.error("visit insert failed:", error.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again or call the church office." },
        { status: 500 }
      );
    }

    await Promise.allSettled([
      sendEmail({
        to: data.email,
        subject: `We're so excited to meet you, ${data.first_name}!`,
        html: visitConfirmationEmail({
          firstName: data.first_name,
          visitDate: data.visit_date,
          bringingKids: data.bringing_kids,
          childCount: data.children.length,
        }),
      }),
      sendEmail({
        to: getNotificationEmail(),
        subject: `New Visit Registration — ${data.first_name} ${data.last_name}`,
        html: visitNotificationEmail({
          visitDate: data.visit_date,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          phone: data.phone,
          bringingKids: data.bringing_kids,
          otherAdultName: data.other_adult_name,
          childList: data.children,
          wantsHost: data.wants_host,
          needsRide: data.needs_ride,
          pickupAddress: data.pickup_address,
          coffeeOrder: data.coffee_order,
        }),
        replyTo: data.email,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("visit route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
