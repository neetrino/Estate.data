import { serveAssetByKey } from "@/lib/assets";
import { emptyOptionsResponse } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";

async function getAsset(
  _request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  const { key } = await context.params;
  return serveAssetByKey(key);
}

export const GET = handleApiRoute(getAsset);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
