import { Redis } from "@upstash/redis";
import { logger } from "@/lib/logger";

const DEFAULT_CACHE_TTL_SEC = 60;

let redis: Redis | null = null;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    return null;
  }

  if (!redis) {
    redis = new Redis({ url, token });
  }

  return redis;
}

function cacheTtlSec(): number {
  const raw = process.env.CACHE_TTL_SEC;
  if (!raw) {
    return DEFAULT_CACHE_TTL_SEC;
  }

  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CACHE_TTL_SEC;
}

/** Read JSON cache entry — null on miss or when Redis unavailable. */
export async function cacheGet<T>(key: string): Promise<T | null> {
  const client = getRedis();
  if (!client) {
    return null;
  }

  try {
    const value = await client.get<T>(key);
    if (value !== null) {
      logger.info("cache.hit", { key });
    }
    return value;
  } catch (error) {
    logger.warn("cache.get_failed", {
      key,
      message: error instanceof Error ? error.message : "unknown",
    });
    return null;
  }
}

/** Store JSON cache entry with TTL. */
export async function cacheSet<T>(key: string, value: T): Promise<void> {
  const client = getRedis();
  if (!client) {
    return;
  }

  try {
    await client.set(key, value, { ex: cacheTtlSec() });
  } catch (error) {
    logger.warn("cache.set_failed", {
      key,
      message: error instanceof Error ? error.message : "unknown",
    });
  }
}

/** Invalidate cache keys by prefix (best-effort scan). */
export async function cacheInvalidatePrefix(prefix: string): Promise<void> {
  const client = getRedis();
  if (!client) {
    return;
  }

  try {
    const keys = await client.keys(`${prefix}*`);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch (error) {
    logger.warn("cache.invalidate_failed", {
      prefix,
      message: error instanceof Error ? error.message : "unknown",
    });
  }
}

export function isRedisCacheConfigured(): boolean {
  return getRedis() !== null;
}
