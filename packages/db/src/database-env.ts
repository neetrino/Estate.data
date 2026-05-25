const DEFAULT_CONNECTION_LIMIT = 10;
const DEFAULT_POOL_TIMEOUT_SECONDS = 20;

export type DatabaseEnv = {
  databaseUrl: string;
  connectionLimit: number;
  poolTimeoutSeconds: number;
};

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

/** Runtime database settings from environment (API / web server routes). */
export function parseDatabaseEnv(): DatabaseEnv | null {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (!databaseUrl) {
    return null;
  }

  return {
    databaseUrl,
    connectionLimit: parsePositiveInt(
      process.env.DATABASE_CONNECTION_LIMIT,
      DEFAULT_CONNECTION_LIMIT,
    ),
    poolTimeoutSeconds: parsePositiveInt(
      process.env.DATABASE_POOL_TIMEOUT,
      DEFAULT_POOL_TIMEOUT_SECONDS,
    ),
  };
}

/**
 * Append Neon/Prisma pool params to the runtime connection string.
 * Uses DATABASE_CONNECTION_LIMIT and DATABASE_POOL_TIMEOUT from env.
 */
export function buildPooledDatabaseUrl(env: DatabaseEnv): string {
  const url = new URL(env.databaseUrl);
  url.searchParams.set("connection_limit", String(env.connectionLimit));
  url.searchParams.set("pool_timeout", String(env.poolTimeoutSeconds));
  return url.toString();
}
