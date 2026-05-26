import { buildHealthStatus } from "@/lib/health";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";

async function getHealth(): Promise<Response> {
  const data = await buildHealthStatus();

  if (data.db === "error") {
    logger.warn("health.db.unavailable", { status: data.status });
  }

  return jsonSuccess(data, {
    status: data.db === "ok" ? 200 : 503,
    meta: { timestamp: new Date().toISOString() },
  });
}

export const GET = handleApiRoute(getHealth);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
