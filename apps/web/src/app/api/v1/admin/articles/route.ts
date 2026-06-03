import { listAdminArticles } from "@/server/features/articles/list-admin-articles";
import { createArticleSchema } from "@/server/features/articles/article.schema";
import { createArticle } from "@/server/features/articles/mutate-article";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getAdminArticles(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const articles = await listAdminArticles();
  return jsonSuccess(articles);
}

async function postAdminArticle(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createArticleSchema);
  const article = await createArticle(body);

  logger.info("admin.article.created", { id: article.id, slug: article.slug });

  return jsonSuccess(article, { status: 201 });
}

export const GET = handleApiRoute(getAdminArticles);
export const POST = handleApiRoute(postAdminArticle);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
