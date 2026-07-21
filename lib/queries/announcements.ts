import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/keys";
import type { Announcement } from "@/lib/database.types";

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getActiveAnnouncement failed:", error.message);
    return null;
  }
  return data;
}
