import { handleIdramCallback } from "@/features/payments/idram-payment";
import { ApiError } from "@/lib/api-error";
import { jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";

async function getCallback(
  request: Request
): Promise<Response> {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  const status = url.searchParams.get("status");

  if (!orderId) {
    throw ApiError.badRequest("orderId is required", "VALIDATION_ERROR");
  }

  const data = await handleIdramCallback(orderId, status);
  return jsonSuccess(data);
}

export const GET = handleApiRoute(getCallback);
