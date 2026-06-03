import { listArticles } from "@/server/features/articles/list-articles";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { parseLocaleFromRequest } from "@/server/lib/i18n/parse-locale";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getArticles(
  request: Request
): Promise<Response> {
  const locale = parseLocaleFromRequest(request);
  const articles = await listArticles(locale);
  return jsonSuccess(articles, { meta: { locale } });
}

export const GET = handleApiRoute(getArticles);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
