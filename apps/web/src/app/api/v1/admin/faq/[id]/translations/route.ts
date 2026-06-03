import { upsertFaqTranslationSchema } from "@/server/features/i18n/translation.schema";
import { upsertFaqTranslation } from "@/server/features/i18n/upsert-faq-translation";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function putAdminFaqTranslation(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  const body = await parseJsonBody(request, upsertFaqTranslationSchema);
  const translation = await upsertFaqTranslation(id, body);

  logger.info("admin.faq.translation.upserted", {
    faqItemId: id,
    locale: translation.locale,
  });

  return jsonSuccess(translation);
}

export const PUT = handleApiRoute(putAdminFaqTranslation);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
