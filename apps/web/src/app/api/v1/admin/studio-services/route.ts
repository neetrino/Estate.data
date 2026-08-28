import { listAdminStudioServices } from "@/server/features/studio/admin-studio-services";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getServices(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  return jsonSuccess(await listAdminStudioServices());
}

export const GET = handleApiRoute(getServices);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
