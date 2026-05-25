import { createArticleSchema } from "@/features/articles/article.schema";
import { createArticle } from "@/features/articles/mutate-article";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

async function postAdminArticle(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createArticleSchema);
  const article = await createArticle(body);

  logger.info("admin.article.created", { id: article.id, slug: article.slug });

  return jsonSuccess(article, { status: 201 });
}

export const POST = handleApiRoute(postAdminArticle);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
