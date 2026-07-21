import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicKey, getSupabaseUrl } from "@/lib/supabase/keys";
import type { Database } from "@/lib/database.types";

/**
 * Cookie-less anon client for PUBLIC content reads (events, sermons, staff,
 * announcements). Never touches cookies(), so pages that use it stay
 * static/ISR — the session-bound server client would force dynamic
 * rendering on every page.
 */
export function createPublicClient() {
  return createSupabaseClient<Database>(
    getSupabaseUrl(),
    getSupabasePublicKey(),
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
