"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/guard";
import { getYouTubeThumbnail } from "@/lib/youtube";
import type { ActionResult } from "@/app/admin/events/actions";

const sermonSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().min(1).max(200),
  sermon_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  pastor: z.string().max(100).optional().default(""),
  series_name: z.string().max(200).optional().default(""),
  youtube_url: z.union([z.url(), z.literal("")]).optional().default(""),
});

export type SermonInput = z.input<typeof sermonSchema>;

function revalidateSermonPages() {
  revalidatePath("/sermons");
  revalidatePath("/admin/sermons");
}

export async function saveSermon(input: SermonInput): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const parsed = sermonSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, error: "Please add a title, date, and a valid YouTube URL." };
    }

    const { id, ...data } = parsed.data;
    const row = {
      ...data,
      pastor: data.pastor || null,
      series_name: data.series_name || null,
      youtube_url: data.youtube_url || null,
      thumbnail_url: data.youtube_url
        ? getYouTubeThumbnail(data.youtube_url)
        : null,
    };

    const { error } = id
      ? await supabase.from("sermons").update(row).eq("id", id)
      : await supabase.from("sermons").insert(row);

    if (error) return { ok: false, error: error.message };
    revalidateSermonPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}

export async function deleteSermon(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("sermons").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateSermonPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}
