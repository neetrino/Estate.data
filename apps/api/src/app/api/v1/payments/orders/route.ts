import { createPaymentOrder } from "@/features/payments/idram-payment";
import { createOrderSchema } from "@/features/payments/payment.schema";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

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
