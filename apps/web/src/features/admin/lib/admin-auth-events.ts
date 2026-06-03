export const ADMIN_AUTH_CHANGED_EVENT = "estate-admin-auth-changed";

/** Notify listeners that admin auth storage changed. */
export function notifyAdminAuthChanged(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
}
