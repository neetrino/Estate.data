/** Contact form — max POSTs per IP within the sliding window (11th → 429). */
export const CONTACT_RATE_LIMIT_MAX_REQUESTS = 10;

/** Contact rate limit window length (seconds). */
export const CONTACT_RATE_LIMIT_WINDOW_SEC = 60;

/** Admin auth/mutations — max requests per IP per window. */
export const ADMIN_RATE_LIMIT_MAX_REQUESTS = 30;

/** Admin rate limit window length (seconds). */
export const ADMIN_RATE_LIMIT_WINDOW_SEC = 60;

export const RATE_LIMIT_KEY_PREFIX = {
  contact: "contact",
  admin: "admin",
} as const;

export type RateLimitScope = keyof typeof RATE_LIMIT_KEY_PREFIX;

export type RateLimitConfig = {
  maxRequests: number;
  windowSec: number;
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

export function getContactRateLimitConfig(): RateLimitConfig {
  const maxRequests = parsePositiveInt(
    process.env.RATE_LIMIT_CONTACT_MAX,
    CONTACT_RATE_LIMIT_MAX_REQUESTS,
  );
  const windowSec = parsePositiveInt(
    process.env.RATE_LIMIT_CONTACT_WINDOW_SEC,
    CONTACT_RATE_LIMIT_WINDOW_SEC,
  );

  return { maxRequests, windowSec };
}

export function getAdminRateLimitConfig(): RateLimitConfig {
  const maxRequests = parsePositiveInt(
    process.env.RATE_LIMIT_ADMIN_MAX,
    ADMIN_RATE_LIMIT_MAX_REQUESTS,
  );
  const windowSec = parsePositiveInt(
    process.env.RATE_LIMIT_ADMIN_WINDOW_SEC,
    ADMIN_RATE_LIMIT_WINDOW_SEC,
  );

  return { maxRequests, windowSec };
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
}
