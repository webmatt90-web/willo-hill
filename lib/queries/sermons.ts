import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/keys";
import type { Sermon } from "@/lib/database.types";

export async function getLatestSermons(limit?: number): Promise<Sermon[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  let query = supabase
    .from("sermons")
    .select("*")
    .order("sermon_date", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getLatestSermons failed:", error.message);
    return [];
  }
  return data;
}

export async function getAllSermons(): Promise<Sermon[]> {
  return getLatestSermons();
}
