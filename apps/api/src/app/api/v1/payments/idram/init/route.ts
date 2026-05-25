import { initIdramPayment } from "@/features/payments/idram-payment";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";
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
