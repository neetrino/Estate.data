import type {
  AdminAuthResult,
  AdminLoginPayload,
} from "@/features/admin/types/admin-auth";
import { API_ROUTES, apiClient } from "@/shared/api";

/** Authenticate admin credentials against the API. */
export async function submitAdminLogin(
  payload: AdminLoginPayload,
): Promise<AdminAuthResult> {
  return apiClient.post<AdminAuthResult>(API_ROUTES.adminAuthLogin, {
    email: payload.email.toLowerCase(),
    password: payload.password,
  });
}
