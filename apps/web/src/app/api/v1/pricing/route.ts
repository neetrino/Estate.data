import { getPricingPage } from "@/server/features/pricing/get-pricing-page";
import { parseLocaleFromRequest } from "@/server/lib/i18n/parse-locale";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getPricing(
  request: Request
): Promise<Response> {
  const locale = parseLocaleFromRequest(request);
  const pricing = await getPricingPage(locale);
  return jsonSuccess(pricing);
}
export const GET = handleApiRoute(getPricing);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
