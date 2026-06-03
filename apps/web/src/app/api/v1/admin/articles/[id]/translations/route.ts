import { upsertArticleTranslationSchema } from "@/server/features/i18n/translation.schema";
import { upsertArticleTranslation } from "@/server/features/i18n/upsert-article-translation";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function putAdminArticleTranslation(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  const body = await parseJsonBody(request, upsertArticleTranslationSchema);
  const translation = await upsertArticleTranslation(id, body);

  logger.info("admin.article.translation.upserted", {
    articleId: id,
    locale: translation.locale,
  });

  return jsonSuccess(translation);
}

export const PUT = handleApiRoute(putAdminArticleTranslation);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
