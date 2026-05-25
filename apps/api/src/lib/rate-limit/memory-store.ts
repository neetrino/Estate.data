import type { RateLimitConfig, RateLimitResult } from "@/lib/rate-limit/constants";

type MemoryBucket = {
  count: number;
  resetAtMs: number;
};

const buckets = new Map<string, MemoryBucket>();

/** In-memory fixed window — used when Upstash is not configured (local dev). */
export function checkMemoryRateLimit(
  key: string,
  config: RateLimitConfig,
): RateLimitResult {
  const nowMs = Date.now();
  const windowMs = config.windowSec * 1000;
  const existing = buckets.get(key);

  if (!existing || nowMs >= existing.resetAtMs) {
    buckets.set(key, { count: 1, resetAtMs: nowMs + windowMs });
    return buildResult(true, config, config.maxRequests - 1, config.windowSec);
  }

  existing.count += 1;
  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((existing.resetAtMs - nowMs) / 1000),
  );

  if (existing.count > config.maxRequests) {
    return buildResult(false, config, 0, retryAfterSeconds);
  }

  return buildResult(
    true,
    config,
    config.maxRequests - existing.count,
    retryAfterSeconds,
  );
}

function buildResult(
  success: boolean,
  config: RateLimitConfig,
  remaining: number,
  retryAfterSeconds: number,
): RateLimitResult {
  return {
    success,
    limit: config.maxRequests,
    remaining: Math.max(0, remaining),
    retryAfterSeconds,
  };
}
