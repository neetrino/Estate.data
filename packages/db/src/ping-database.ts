import { getPrisma } from "./client";
import { parseDatabaseEnv } from "./database-env";

/** Lightweight connectivity check — `SELECT 1` via Prisma. */
export async function pingDatabase(): Promise<boolean> {
  if (!parseDatabaseEnv()) {
    return false;
  }

  try {
    await getPrisma().$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
