/**
 * Lightweight in-memory token-bucket rate limiter.
 * Suitable for a single-instance demo / hackathon deployment.
 * For multi-instance production (e.g. multiple concurrent serverless
 * invocations on Vercel), back this with a shared store such as Upstash
 * Redis — each instance otherwise keeps its own bucket, so the effective
 * limit becomes `limit × warm instance count`.
 */
interface Bucket {
  tokens: number
  updatedAt: number
}

const buckets = new Map<string, Bucket>()

// Bound memory growth: once the map gets large, sweep buckets that have
// been fully idle (and therefore fully refilled) for a while. Without this,
// an attacker rotating fake client identifiers could grow this map forever.
const MAX_TRACKED_KEYS = 5000
const STALE_AFTER_MS = 10 * 60_000

function sweepStaleBuckets(now: number) {
  if (buckets.size <= MAX_TRACKED_KEYS) return
  for (const [key, bucket] of buckets) {
    if (now - bucket.updatedAt > STALE_AFTER_MS) {
      buckets.delete(key)
    }
  }
}

interface RateLimitOptions {
  /** Max requests allowed within the window. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

export function rateLimit(
  key: string,
  { limit, windowMs }: RateLimitOptions,
): { success: boolean; remaining: number } {
  const now = Date.now()
  sweepStaleBuckets(now)

  const refillRate = limit / windowMs
  const bucket = buckets.get(key) ?? { tokens: limit, updatedAt: now }

  // Refill tokens based on elapsed time.
  const elapsed = now - bucket.updatedAt
  bucket.tokens = Math.min(limit, bucket.tokens + elapsed * refillRate)
  bucket.updatedAt = now

  if (bucket.tokens < 1) {
    buckets.set(key, bucket)
    return { success: false, remaining: 0 }
  }

  bucket.tokens -= 1
  buckets.set(key, bucket)
  return { success: true, remaining: Math.floor(bucket.tokens) }
}

/**
 * Best-effort client identifier from request headers.
 *
 * NOTE: `x-forwarded-for` is only trustworthy when the app sits behind a
 * proxy/edge platform that sets this header itself and strips or overwrites
 * any client-supplied value (true on Vercel and most managed CDNs/proxies).
 * If you deploy behind a different reverse proxy, confirm it does the same —
 * otherwise a client can spoof this header and bypass rate limiting.
 */
export function getClientId(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = headers.get('x-real-ip')?.trim()
  return realIp || 'anonymous'
}
