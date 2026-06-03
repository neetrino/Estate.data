import { listFaqItems } from "@/server/features/faq/list-faq-items";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { parseLocaleFromRequest } from "@/server/lib/i18n/parse-locale";
import { handleApiRoute } from "@/server/lib/route-handler";

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
