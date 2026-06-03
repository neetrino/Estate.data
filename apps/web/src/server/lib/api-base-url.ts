/** Public base URL for API callbacks (defaults to local :3000 merged app). */
export function getApiBaseUrl(): string {
  const fromEnv =
    process.env.API_PUBLIC_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://localhost:3000";

  return fromEnv.replace(/\/$/, "");
}
