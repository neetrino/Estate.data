import { getPricingPage } from "@/features/pricing/get-pricing-page";
import { parseLocaleFromRequest } from "@/lib/i18n/parse-locale";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";

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
