import { updateArticleSchema } from "@/features/articles/article.schema";
import { updateArticle } from "@/features/articles/mutate-article";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

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

export const PATCH = handleApiRoute(patchAdminArticle);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
