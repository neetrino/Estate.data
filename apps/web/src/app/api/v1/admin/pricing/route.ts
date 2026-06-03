import { getAdminPricing } from "@/server/features/pricing/get-admin-pricing";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getAdminPricingRoute(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const pricing = await getAdminPricing();
  return jsonSuccess(pricing);
}

export const GET = handleApiRoute(getAdminPricingRoute);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
