import { deleteArticle } from "@/server/features/articles/delete-article";
import { updateArticleSchema } from "@/server/features/articles/article.schema";
import { updateArticle } from "@/server/features/articles/mutate-article";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchAdminArticle(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  const body = await parseJsonBody(request, updateArticleSchema);
  const article = await updateArticle(id, body);

  logger.info("admin.article.updated", { id: article.id });

  return jsonSuccess(article);
}

async function deleteAdminArticle(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  await deleteArticle(id);

  logger.info("admin.article.deleted", { id });

  return jsonSuccess({ deleted: true });
}

export const PATCH = handleApiRoute(patchAdminArticle);
export const DELETE = handleApiRoute(deleteAdminArticle);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
