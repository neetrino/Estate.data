export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { ensureDatabaseReady } = await import("@/lib/env");
  await ensureDatabaseReady();
}
