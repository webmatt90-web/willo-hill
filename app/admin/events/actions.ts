"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/guard";

const eventSchema = z.object({
  id: z.uuid().optional(),
  title: z.string().min(1).max(200),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  event_time: z.string().max(50).optional().default(""),
  description: z.string().max(2000).optional().default(""),
  location: z.string().max(200).optional().default(""),
  is_featured: z.boolean().default(false),
});

export type EventInput = z.input<typeof eventSchema>;
export type ActionResult = { ok: boolean; error?: string };

function revalidateEventPages() {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/admin/events");
}

export async function saveEvent(input: EventInput): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const parsed = eventSchema.safeParse(input);
    if (!parsed.success) return { ok: false, error: "Please fill in a title and date." };

    const { id, ...data } = parsed.data;
    const row = {
      ...data,
      event_time: data.event_time || null,
      description: data.description || null,
      location: data.location || null,
    };

    const { error } = id
      ? await supabase.from("events").update(row).eq("id", id)
      : await supabase.from("events").insert(row);

    if (error) return { ok: false, error: error.message };
    revalidateEventPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}

export async function deleteEvent(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateEventPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}
