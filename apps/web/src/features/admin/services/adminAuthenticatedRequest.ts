import { ADMIN_AUTH_CHANGED_EVENT } from "@/features/admin/lib/admin-auth-events";
import {
  clearAdminAuthToken,
  readAdminAuthToken,
} from "@/features/admin/lib/admin-auth-storage";
import { SUPERSUDO_PATH } from "@/features/admin/lib/admin-paths";
import { apiRequest, type ApiRequestOptions } from "@/shared/api/client";
import { ApiError } from "@/shared/api/errors";

function handleUnauthorized(): void {
  clearAdminAuthToken();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(ADMIN_AUTH_CHANGED_EVENT));
    if (!window.location.pathname.startsWith(SUPERSUDO_PATH)) {
      window.location.assign(SUPERSUDO_PATH);
      return;
    }
    if (window.location.pathname !== SUPERSUDO_PATH) {
      window.location.assign(SUPERSUDO_PATH);
    }
  }
}

/** API request with `Authorization: Bearer` when an admin token exists. */
export async function adminAuthenticatedRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const token = readAdminAuthToken();
  const headers = { ...options.headers };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    return await apiRequest<T>(path, { ...options, headers });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      handleUnauthorized();
    }

    throw error;
  }
}
