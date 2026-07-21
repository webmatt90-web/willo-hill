import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/keys";
import type { ChurchEvent } from "@/lib/database.types";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getUpcomingEvents(limit?: number): Promise<ChurchEvent[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  let query = supabase
    .from("events")
    .select("*")
    .gte("event_date", todayISO())
    .order("event_date", { ascending: true });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("getUpcomingEvents failed:", error.message);
    return [];
  }
  return data;
}

export async function getAllEvents(): Promise<ChurchEvent[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  if (error) {
    console.error("getAllEvents failed:", error.message);
    return [];
  }
  return data;
}
