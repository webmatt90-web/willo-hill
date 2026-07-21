"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/guard";
import type { ActionResult } from "@/app/admin/events/actions";

const staffSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1).max(100),
  title: z.string().min(1).max(150),
  role_category: z.enum(["Staff", "Ministry Team Leaders", "Elders", "Deacons"]),
  photo_url: z.string().max(500).optional().default(""),
  email: z.union([z.email(), z.literal("")]).optional().default(""),
  sort_order: z.number().int().min(0).max(1000).default(0),
});

export type StaffInput = z.input<typeof staffSchema>;

function revalidateStaffPages() {
  revalidatePath("/leadership");
  revalidatePath("/admin/staff");
}

export async function saveStaff(input: StaffInput): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const parsed = staffSchema.safeParse(input);
    if (!parsed.success) {
      return { ok: false, error: "Please fill in name, title, and category (and a valid email)." };
    }

    const { id, ...data } = parsed.data;
    const row = {
      ...data,
      photo_url: data.photo_url || null,
      email: data.email || null,
    };

    const { error } = id
      ? await supabase.from("staff").update(row).eq("id", id)
      : await supabase.from("staff").insert(row);

    if (error) return { ok: false, error: error.message };
    revalidateStaffPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}

export async function deleteStaff(id: string): Promise<ActionResult> {
  try {
    const supabase = await requireAdmin();
    const { error } = await supabase.from("staff").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidateStaffPages();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Failed" };
  }
}
