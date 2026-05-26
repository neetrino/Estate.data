import { readAdminAuthToken } from "@/features/admin/lib/admin-auth-storage";
import { apiRequest, type ApiRequestOptions } from "@/shared/api/client";

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

  return apiRequest<T>(path, { ...options, headers });
}
