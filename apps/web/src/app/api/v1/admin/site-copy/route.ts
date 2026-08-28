import {
  listAdminSiteCopy,
  replaceSiteCopy,
  updateSiteCopySchema,
} from "@/server/features/site-copy/admin-site-copy";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getCopy(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  return jsonSuccess(await listAdminSiteCopy());
}

async function putCopy(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const body = await parseJsonBody(request, updateSiteCopySchema);
  return jsonSuccess(await replaceSiteCopy(body.items));
}

export const GET = handleApiRoute(getCopy);
export const PUT = handleApiRoute(putCopy);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
