/**
 * Supports both the new API key names (sb_publishable_...) and the legacy
 * anon key name. NEXT_PUBLIC_ vars are inlined at build time, so both
 * references must appear literally.
 */
/** Strip whitespace and accidental wrapping quotes from a pasted env value. */
function clean(value: string | undefined): string {
  return (value ?? "").trim().replace(/^["']|["']$/g, "");
}

export function getSupabaseUrl(): string {
  // Normalize a protocol-less value (e.g. pasted into Vercel without
  // https://) — supabase-js throws on it and that kills the build.
  const raw = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  if (!raw) return "";
  return raw.startsWith("http://") || raw.startsWith("https://")
    ? raw
    : `https://${raw}`;
}

export function getSupabasePublicKey(): string {
  return clean(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabasePublicKey());
}
