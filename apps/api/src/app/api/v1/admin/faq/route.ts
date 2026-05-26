import { createFaqItemSchema } from "@/features/faq/faq.schema";
import { createFaqItem } from "@/features/faq/mutate-faq-item";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

async function postAdminFaq(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createFaqItemSchema);
  const item = await createFaqItem(body);

  logger.info("admin.faq.created", { id: item.id });

  return jsonSuccess(item, { status: 201 });
}

export const POST = handleApiRoute(postAdminFaq);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
