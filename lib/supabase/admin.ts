import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl } from "@/lib/supabase/keys";
import type { Database } from "@/lib/database.types";

/** Supports the new secret key (sb_secret_...) and the legacy service role key. */
export function getSupabaseSecretKey(): string {
  return (
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    ""
  );
}

/**
 * Server-only client that bypasses RLS. Never import from client components.
 * Returns null when the secret key isn't configured yet.
 */
export function createAdminClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseSecretKey();
  if (!url || !key) return null;

  return createSupabaseClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
