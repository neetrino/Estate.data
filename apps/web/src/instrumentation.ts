export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  try {
    const { ensureDatabaseReady } = await import("@/server/lib/env");
    await ensureDatabaseReady();
  } catch (error) {
    const { logger } = await import("@/server/lib/logger");
    logger.warn("startup.db.unavailable", {
      reason: error instanceof Error ? error.message : "Unknown database startup failure",
    });
  }
}
