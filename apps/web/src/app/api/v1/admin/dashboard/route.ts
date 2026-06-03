import { getAdminDashboard } from "@/server/features/admin/get-admin-dashboard";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getAdminDashboardRoute(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const summary = await getAdminDashboard();
  return jsonSuccess(summary);
}

export const GET = handleApiRoute(getAdminDashboardRoute);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
