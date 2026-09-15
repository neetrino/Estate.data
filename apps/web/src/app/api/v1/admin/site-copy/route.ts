import { getMarketingCopy } from "@/server/features/site-copy/get-site-copy";
import { updateSiteCopySchema } from "@/server/features/site-copy/site-copy.schema";
import { updateSiteCopy } from "@/server/features/site-copy/update-site-copy";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getAdminSiteCopy(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const copy = await getMarketingCopy();
  return jsonSuccess(copy);
}

async function patchAdminSiteCopy(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const body = await parseJsonBody(request, updateSiteCopySchema);
  const copy = await updateSiteCopy(body);
  logger.info("admin.site-copy.updated", { key: body.key });
  return jsonSuccess(copy);
}

export const GET = handleApiRoute(getAdminSiteCopy);
export const PATCH = handleApiRoute(patchAdminSiteCopy);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
