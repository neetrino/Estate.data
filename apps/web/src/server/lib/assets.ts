import path from "node:path";
import { ASSET_CACHE_CONTROL, isAssetKey } from "@estate/db";
import { NextResponse } from "next/server";
import { loadAsset } from "@/server/lib/db";
import { binaryResponse, jsonError } from "@/server/lib/http";

const APPS_API_SEGMENT = `${path.sep}apps${path.sep}api`;
const APPS_WEB_SEGMENT = `${path.sep}apps${path.sep}web`;

/**
 * Resolve the web `public/` directory for asset fallback (DB miss).
 * Pre-merge: `apps/api` → `../web/public`. Post-merge: `apps/web` → `./public`.
 * Override with `WEB_PUBLIC_DIR` (relative or absolute).
 */
export function resolveWebPublicDir(): string {
  const envDir = process.env.WEB_PUBLIC_DIR?.trim();
  if (envDir) {
    return path.resolve(envDir);
  }

  const cwd = process.cwd();

  if (cwd.includes(APPS_API_SEGMENT)) {
    return path.resolve(cwd, "../web/public");
  }

  if (cwd.includes(APPS_WEB_SEGMENT)) {
    return path.resolve(cwd, "public");
  }

  return path.resolve(cwd, "../web/public");
}

export const WEB_PUBLIC_DIR = resolveWebPublicDir();

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
