import { getClientIp } from "@/lib/rate-limit/client-ip";
import {
  getAdminRateLimitConfig,
  getContactRateLimitConfig,
  RATE_LIMIT_KEY_PREFIX,
  type RateLimitResult,
} from "@/lib/rate-limit/constants";
import { checkMemoryRateLimit } from "@/lib/rate-limit/memory-store";
import {
  checkUpstashRateLimit,
  isUpstashRateLimitConfigured,
} from "@/lib/rate-limit/upstash-store";
import { logger } from "@/lib/logger";

/**
 * Enforce contact POST rate limit by client IP.
 * Uses Upstash when configured; otherwise in-memory (single instance dev).
 */
export async function enforceContactRateLimit(
  request: Request,
): Promise<RateLimitResult> {
  const config = getContactRateLimitConfig();
  const ip = getClientIp(request);
  const key = `${RATE_LIMIT_KEY_PREFIX.contact}:${ip}`;

  const result = isUpstashRateLimitConfigured()
    ? await checkUpstashRateLimit(key, config)
    : checkMemoryRateLimit(key, config);

  if (!result.success) {
    logger.warn("rate_limit.exceeded", {
      scope: RATE_LIMIT_KEY_PREFIX.contact,
      ip,
      limit: result.limit,
    });
  }

  return result;
}

/**
 * Enforce admin route rate limit by client IP.
 */
export async function enforceAdminRateLimit(
  request: Request,
): Promise<RateLimitResult> {
  const config = getAdminRateLimitConfig();
  const ip = getClientIp(request);
  const key = `${RATE_LIMIT_KEY_PREFIX.admin}:${ip}`;

  const result = isUpstashRateLimitConfigured()
    ? await checkUpstashRateLimit(key, config)
    : checkMemoryRateLimit(key, config);

  if (!result.success) {
    logger.warn("rate_limit.exceeded", {
      scope: RATE_LIMIT_KEY_PREFIX.admin,
      ip,
      limit: result.limit,
    });
  }

  return result;
}
