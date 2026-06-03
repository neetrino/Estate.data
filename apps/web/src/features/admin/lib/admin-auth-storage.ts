const ADMIN_AUTH_TOKEN_KEY = "estate.admin.authToken";
const ADMIN_AUTH_EMAIL_KEY = "estate.admin.authEmail";

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

/** Read admin email shown in the panel top bar. */
export function readAdminAuthEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ADMIN_AUTH_EMAIL_KEY);
}

/** Persist admin email for display (not used for auth). */
export function writeAdminAuthEmail(email: string): void {
  window.localStorage.setItem(ADMIN_AUTH_EMAIL_KEY, email);
}

/** Clear stored admin session. */
export function clearAdminAuthToken(): void {
  window.localStorage.removeItem(ADMIN_AUTH_TOKEN_KEY);
  window.localStorage.removeItem(ADMIN_AUTH_EMAIL_KEY);
}
