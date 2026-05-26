import { parseAssetUploadForm } from "@/features/assets/parse-asset-upload";
import { upsertAsset } from "@/features/assets/upsert-asset";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";

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

export const POST = handleApiRoute(postAdminAsset);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
