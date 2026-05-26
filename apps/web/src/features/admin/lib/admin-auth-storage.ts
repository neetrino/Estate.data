const ADMIN_AUTH_TOKEN_KEY = "estate.admin.authToken";

/** Read persisted admin JWT from browser storage. */
export function readAdminAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ADMIN_AUTH_TOKEN_KEY);
}

/** Persist admin JWT for subsequent authenticated API calls. */
export function writeAdminAuthToken(token: string): void {
  window.localStorage.setItem(ADMIN_AUTH_TOKEN_KEY, token);
}

/** Clear stored admin session. */
export function clearAdminAuthToken(): void {
  window.localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
}
