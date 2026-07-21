import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicKey, getSupabaseUrl } from "@/lib/supabase/keys";
import type { Database } from "@/lib/database.types";

export function createClient() {
  return createBrowserClient<Database>(getSupabaseUrl(), getSupabasePublicKey());
}
