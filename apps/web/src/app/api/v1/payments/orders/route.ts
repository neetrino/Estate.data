import { createPaymentOrder } from "@/server/features/payments/idram-payment";
import { createOrderSchema } from "@/server/features/payments/payment.schema";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function postOrder(
  request: Request
): Promise<Response> {
  const body = await parseJsonBody(request, createOrderSchema);
  const data = await createPaymentOrder(body);
  return jsonSuccess(data, { status: 201 });
}

export const POST = handleApiRoute(postOrder);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
