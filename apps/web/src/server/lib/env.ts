import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  APP_URL: z.string().url(),
  DATABASE_URL: z.string().url().startsWith("postgresql"),
  DIRECT_URL: z.string().url().startsWith("postgresql"),
  DATABASE_CONNECTION_LIMIT: z.coerce.number().int().positive().default(10),
  DATABASE_POOL_TIMEOUT: z.coerce.number().int().positive().default(20),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function parseServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid API server environment: ${message}`);
  }

  return result.data;
}

/** Validated server env — DATABASE_URL required for API runtime. */
export const serverEnv = parseServerEnv();

/**
 * Eager Prisma init so missing DATABASE_URL fails fast at boot.
 * Called from `instrumentation.ts`.
 */
export async function ensureDatabaseReady(): Promise<void> {
  const { getPrisma, pingDatabase } = await import("@estate/db/server");

  getPrisma();
  const ok = await pingDatabase();

  if (!ok) {
    throw new Error("Database ping failed — check DATABASE_URL and Neon connectivity.");
  }
}
