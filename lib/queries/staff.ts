import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/keys";
import type { StaffMember } from "@/lib/database.types";

export const STAFF_CATEGORIES = [
  "Staff",
  "Ministry Team Leaders",
  "Elders",
  "Deacons",
] as const;

export type StaffCategory = (typeof STAFF_CATEGORIES)[number];

export async function getAllStaff(): Promise<StaffMember[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getAllStaff failed:", error.message);
    return [];
  }
  return data;
}

export async function getStaffByCategory(): Promise<
  Record<StaffCategory, StaffMember[]>
> {
  const all = await getAllStaff();
  const grouped = Object.fromEntries(
    STAFF_CATEGORIES.map((c) => [c, [] as StaffMember[]])
  ) as Record<StaffCategory, StaffMember[]>;

  for (const member of all) {
    const category = member.role_category as StaffCategory;
    if (grouped[category]) grouped[category].push(member);
  }
  return grouped;
}
