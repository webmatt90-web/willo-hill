/**
 * In-memory sliding-window rate limiter. Per serverless instance only —
 * good enough to blunt casual form spam on a small church site without
 * adding a Redis dependency. Combine with the honeypot field.
 */
const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  limit = 5,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 10_000) hits.clear(); // memory backstop
  return false;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}
