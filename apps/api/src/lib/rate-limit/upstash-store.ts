import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { RateLimitConfig, RateLimitResult } from "@/lib/rate-limit/constants";

let contactLimiter: Ratelimit | null = null;

function getContactLimiter(config: RateLimitConfig): Ratelimit {
  if (!contactLimiter) {
    contactLimiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(
        config.maxRequests,
        `${config.windowSec} s`,
      ),
      prefix: "estate-api:contact",
    });
  }

  return contactLimiter;
}

export function isUpstashRateLimitConfigured(): boolean {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  return Boolean(url && token);
}

/** Distributed rate limit via Upstash Redis (production). */
export async function checkUpstashRateLimit(
  key: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const limiter = getContactLimiter(config);
  const result = await limiter.limit(key);

  const retryAfterSeconds = Math.max(
    1,
    Math.ceil((result.reset - Date.now()) / 1000),
  );

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    retryAfterSeconds,
  };
}
