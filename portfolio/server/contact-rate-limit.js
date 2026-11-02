import { createHmac, randomBytes } from 'node:crypto'

export const CONTACT_WINDOW_MS = 15 * 60 * 1000

// Per-instance abuse control only: no raw addresses, bounded storage, fixed expiry.
// A distributed limiter is still needed for coordination across serverless instances.
export function createContactLimiter({
  now = Date.now,
  maxEntries = 10000,
  maxRequests = 5,
  windowMs = CONTACT_WINDOW_MS,
} = {}) {
  const secret = randomBytes(32)
  const buckets = new Map()
  return (ip) => {
    const timestamp = now()
    for (const [key, bucket] of buckets) {
      if (bucket.expiresAt <= timestamp) buckets.delete(key)
    }
    const key = createHmac('sha256', secret).update(ip).digest('hex')
    const bucket = buckets.get(key)
    if (bucket) {
      if (bucket.count >= maxRequests) return true
      bucket.count += 1
      return false
    }
    // Fail closed at capacity instead of evicting active limits.
    if (buckets.size >= maxEntries) return true
    buckets.set(key, { count: 1, expiresAt: timestamp + windowMs })
    return false
  }
}
