import { PrismaClient } from "@prisma/client";
import { buildPooledDatabaseUrl, parseDatabaseEnv } from "./database-env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const env = parseDatabaseEnv();
  if (!env) {
    throw new Error(
      "DATABASE_URL is not set — copy .env.example and configure Neon credentials.",
    );
  }

  const pooledUrl = buildPooledDatabaseUrl(env);

  return new PrismaClient({
    datasources: {
      db: { url: pooledUrl },
    },
  });
}

/** Singleton Prisma client with pooled DATABASE_URL (serverless-safe limits). */
export function getPrisma(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
}

/** Returns Prisma when DATABASE_URL is configured; otherwise null (mock / static fallbacks). */
export function tryGetPrisma(): PrismaClient | null {
  if (!parseDatabaseEnv()) {
    return null;
  }

  return getPrisma();
}
