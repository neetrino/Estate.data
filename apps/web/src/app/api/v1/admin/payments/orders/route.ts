import { listAdminOrders } from "@/server/features/payments/list-admin-orders";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getAdminPaymentOrders(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const orders = await listAdminOrders();
  return jsonSuccess(orders);
}

export const GET = handleApiRoute(getAdminPaymentOrders);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
