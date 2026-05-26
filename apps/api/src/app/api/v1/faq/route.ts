import { listFaqItems } from "@/features/faq/list-faq-items";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { parseLocaleFromRequest } from "@/lib/i18n/parse-locale";
import { handleApiRoute } from "@/lib/route-handler";

async function getFaq(
  request: Request
): Promise<Response> {
  const locale = parseLocaleFromRequest(request);
  const items = await listFaqItems(locale);
  return jsonSuccess(items, { meta: { locale } });
}

export const GET = handleApiRoute(getFaq);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
