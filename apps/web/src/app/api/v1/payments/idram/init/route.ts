import { initIdramPayment } from "@/server/features/payments/idram-payment";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";
import { z } from "zod";

const initBodySchema = z.object({
  orderId: z.string().min(1),
});

async function postInit(
  request: Request
): Promise<Response> {
  const body = await parseJsonBody(request, initBodySchema);
  const data = await initIdramPayment(body.orderId);
  return jsonSuccess(data);
}

export const POST = handleApiRoute(postInit);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
