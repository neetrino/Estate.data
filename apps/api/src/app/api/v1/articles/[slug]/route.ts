import { articleSlugSchema } from "@/features/articles/article.schema";
import { getArticleBySlug } from "@/features/articles/list-articles";
import { ApiError } from "@/lib/api-error";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { parseLocaleFromRequest } from "@/lib/i18n/parse-locale";
import { handleApiRoute } from "@/lib/route-handler";

async function getArticle(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  const { slug: rawSlug } = await context.params;
  const parsed = articleSlugSchema.safeParse(rawSlug);

  if (!parsed.success) {
    throw ApiError.notFound("Article not found");
  }

  const locale = parseLocaleFromRequest(request);
  const article = await getArticleBySlug(parsed.data, locale);
  return jsonSuccess(article, { meta: { locale } });
}

export const GET = handleApiRoute(getArticle);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
