import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";

export type HealthStatus = {
  status: "ok";
};

/** Example: mock until apps/api implements GET /v1/health. */
export async function fetchHealth(): Promise<HealthStatus> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return { status: "ok" };
  }

  return apiClient.get<HealthStatus>(API_ROUTES.health);
}
