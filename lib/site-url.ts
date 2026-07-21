// Canonical site origin. NEXT_PUBLIC_SITE_URL may be set without a protocol
// (Vercel's own URLs are bare hostnames), so normalize before use — new URL()
// throws on a bare hostname and that kills the production build.
const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://willohill.com").trim();

export const SITE_URL = (raw.startsWith("http://") || raw.startsWith("https://")
  ? raw
  : `https://${raw}`
).replace(/\/+$/, "");
