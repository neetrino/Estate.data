import { updateFaqItemSchema } from "@/features/faq/faq.schema";
import { updateFaqItem } from "@/features/faq/mutate-faq-item";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

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

export const PATCH = handleApiRoute(patchAdminFaq);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
