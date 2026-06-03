import { listAdminAssets } from "@/server/features/assets/list-admin-assets";
import { parseAssetUploadForm } from "@/server/features/assets/parse-asset-upload";
import { upsertAsset } from "@/server/features/assets/upsert-asset";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getAdminAssets(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const assets = await listAdminAssets();
  return jsonSuccess(assets);
}

async function postAdminAsset(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const upload = await parseAssetUploadForm(request);
  const asset = await upsertAsset(upload);

  logger.info("admin.asset.uploaded", {
    key: asset.key,
    byteSize: asset.byteSize,
  });

  return jsonSuccess(asset);
}

export const GET = handleApiRoute(getAdminAssets);
export const POST = handleApiRoute(postAdminAsset);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
