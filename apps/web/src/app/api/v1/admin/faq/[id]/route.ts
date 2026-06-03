import { deleteFaqItem } from "@/server/features/faq/delete-faq-item";
import { updateFaqItemSchema } from "@/server/features/faq/faq.schema";
import { updateFaqItem } from "@/server/features/faq/mutate-faq-item";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchAdminFaq(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  const body = await parseJsonBody(request, updateFaqItemSchema);
  const item = await updateFaqItem(id, body);

  logger.info("admin.faq.updated", { id: item.id });

  return jsonSuccess(item);
}

async function deleteAdminFaq(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  await deleteFaqItem(id);

  logger.info("admin.faq.deleted", { id });

  return jsonSuccess({ deleted: true });
}

export const PATCH = handleApiRoute(patchAdminFaq);
export const DELETE = handleApiRoute(deleteAdminFaq);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
