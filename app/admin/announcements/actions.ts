"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/guard";
import type { ActionResult } from "@/app/admin/events/actions";

const announcementSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().max(2000).optional().default(""),
  link_url: z.string().max(500).optional().default(""),
  link_text: z.string().max(100).optional().default(""),
  week_of: z
    .union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal("")])
    .optional()
    .default(""),
  is_active: z.boolean().default(true),
});

export type AnnouncementInput = z.input<typeof announcementSchema>;

function revalidateAnnouncementPages() {
  // The bar renders in the root layout, so refresh every page.
  revalidatePath("/", "layout");
}

/** Saves a new announcement; only one is active at a time. */
export async function saveAnnouncement(
  input: AnnouncementInput
): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const parsed = announcementSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Please add a title." };
    const data = parsed.data;

    // Deactivate everything, then insert the new one.
    const { error: deactivateError } = await supabase
      .from("announcements")
      .update({ is_active: false })
      .eq("is_active", true);
    if (deactivateError) return { ok: false, error: deactivateError.message };

    const { error } = await supabase.from("announcements").insert({
      title: data.title,
      content: data.content || null,
      link_url: data.link_url || null,
      link_text: data.link_text || null,
      week_of: data.week_of || null,
      is_active: data.is_active,
    });
    if (error) return { ok: false, error: error.message };

    revalidateAnnouncementPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}

export async function clearAnnouncement(): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase
      .from("announcements")
      .update({ is_active: false })
      .eq("is_active", true);
    if (error) return { ok: false, error: error.message };

    revalidateAnnouncementPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}
