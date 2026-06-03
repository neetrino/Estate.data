import { deleteContactInquiry } from "@/server/features/contact/delete-contact-inquiry";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";

async function deleteAdminContactInquiry(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  await deleteContactInquiry(id);

  logger.info("admin.contact_inquiry.deleted", { id });

  return jsonSuccess({ deleted: true });
}

export const DELETE = handleApiRoute(deleteAdminContactInquiry);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
