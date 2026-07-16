export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { ensureDatabaseReady } = await import("@/server/lib/env");
  try {
    await ensureDatabaseReady();
  } catch (error) {
    if (process.env.NODE_ENV !== "development") {
      throw error;
    }

    const { logger } = await import("@/server/lib/logger");
    logger.warn("startup.db.unavailable", {
      reason: error instanceof Error ? error.message : "Unknown database startup failure",
    });
  }
}
