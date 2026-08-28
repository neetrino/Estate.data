import { updateStudioService } from "@/server/features/studio/admin-studio-services";
import { updateStudioServiceSchema } from "@/server/features/studio/studio-service.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import type { ApiRouteContext } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchService(request: Request, context: ApiRouteContext): Promise<Response> {
  await requireAdminAuth(request);
  const { id } = await context.params;
  const body = await parseJsonBody(request, updateStudioServiceSchema);
  return jsonSuccess(await updateStudioService(id, body));
}

export const PATCH = handleApiRoute(patchService);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
