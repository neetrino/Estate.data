import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import type { HealthStatus } from "@/shared/api/types";

export type { HealthStatus };

/** Calls `GET /api/v1/health` on the API app, or returns mock when configured. */
export async function fetchHealth(): Promise<HealthStatus> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return { status: "ok", db: "ok" };
  }

  return apiClient.get<HealthStatus>(API_ROUTES.health);
}
