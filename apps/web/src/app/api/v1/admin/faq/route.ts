import { listAdminFaqItems } from "@/server/features/faq/list-admin-faq-items";
import { createFaqItemSchema } from "@/server/features/faq/faq.schema";
import { createFaqItem } from "@/server/features/faq/mutate-faq-item";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getAdminFaq(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const items = await listAdminFaqItems();
  return jsonSuccess(items);
}

async function postAdminFaq(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createFaqItemSchema);
  const item = await createFaqItem(body);

  logger.info("admin.faq.created", { id: item.id });

  return jsonSuccess(item, { status: 201 });
}

export const GET = handleApiRoute(getAdminFaq);
export const POST = handleApiRoute(postAdminFaq);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
