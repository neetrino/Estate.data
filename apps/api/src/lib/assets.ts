import path from "node:path";
import { ASSET_CACHE_CONTROL, isAssetKey } from "@estate/db";
import { NextResponse } from "next/server";
import { loadAsset } from "@/lib/db";
import { binaryResponse, jsonError } from "@/lib/http";

export const WEB_PUBLIC_DIR = path.resolve(process.cwd(), "../web/public");

/**
 * Serve a site asset by stable key (DB first, then web `public/` fallback).
 * @param rawKey URL path segment — may be percent-encoded.
 */
export async function serveAssetByKey(rawKey: string): Promise<NextResponse> {
  const key = decodeURIComponent(rawKey);

  if (!isAssetKey(key)) {
    return jsonError("Asset not found", 404, "NOT_FOUND");
  }

  const asset = await loadAsset(key, {
    publicDir: WEB_PUBLIC_DIR,
    preferDatabase: true,
  });

  if (!asset) {
    return jsonError("Asset not found", 404, "NOT_FOUND");
  }

  return binaryResponse(asset.data, asset.mimeType, ASSET_CACHE_CONTROL);
}
