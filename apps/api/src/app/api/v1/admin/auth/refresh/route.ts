import { adminRefresh } from "@/features/auth/admin-refresh";
import { adminRefreshSchema } from "@/features/auth/auth.schema";
import { enforceAdminRateLimit } from "@/lib/rate-limit/enforce-rate-limit";
import { ApiError } from "@/lib/api-error";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

async function postRefresh(
  request: Request
): Promise<Response> {
  const rateLimit = await enforceAdminRateLimit(request);
  if (!rateLimit.success) {
    throw ApiError.rateLimited(rateLimit.retryAfterSeconds);
  }

  const body = await parseJsonBody(request, adminRefreshSchema);
  const data = await adminRefresh(body);

  return jsonSuccess(data);
}

export const POST = handleApiRoute(postRefresh);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
