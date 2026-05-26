import path from "node:path";
import { ASSET_CACHE_CONTROL, isAssetKey } from "@estate/db";
import { loadAsset } from "@estate/db/server";
import { NextResponse } from "next/server";

const WEB_PUBLIC_DIR = path.join(process.cwd(), "public");

type RouteContext = {
  params: Promise<{ key: string }>;
};

function assetNotFoundResponse(): NextResponse {
  return NextResponse.json(
    { error: { message: "Asset not found", code: "NOT_FOUND" } },
    { status: 404, headers: { "Cache-Control": "no-store" } },
  );
}

/** Mock-mode fallback when `NEXT_PUBLIC_USE_MOCK_API=true` (same-origin assets). */
export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  const { key: rawKey } = await context.params;
  const key = decodeURIComponent(rawKey);

  if (!isAssetKey(key)) {
    return assetNotFoundResponse();
  }

  const asset = await loadAsset(key, { publicDir: WEB_PUBLIC_DIR });

  if (!asset) {
    return assetNotFoundResponse();
  }

  return new NextResponse(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": asset.mimeType,
      "Cache-Control": ASSET_CACHE_CONTROL,
    },
  });
}
