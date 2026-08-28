import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { getPrisma } from "@/server/lib/db";

async function getAnalytics(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const fromEnv = process.env.GOOGLE_ANALYTICS_URL?.trim() ?? "";
  const fromCopy = await getPrisma()
    .siteCopy.findUnique({
      where: { key: "analytics.url" },
      select: { value: true },
    })
    .catch(() => null);
  const url = fromEnv || fromCopy?.value?.trim() || null;
  return jsonSuccess({ url });
}

export const GET = handleApiRoute(getAnalytics);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
