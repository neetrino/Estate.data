import { listArticles } from "@/features/articles/list-articles";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { parseLocaleFromRequest } from "@/lib/i18n/parse-locale";
import { handleApiRoute } from "@/lib/route-handler";

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
