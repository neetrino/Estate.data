import { readFile } from "node:fs/promises";
import path from "node:path";
import { ASSET_FALLBACK_BY_KEY, isAssetKey } from "./asset-fallback";
import type { AssetKey } from "./asset-keys";
import { tryGetPrisma } from "./client";

export type LoadedAsset = {
  data: Buffer;
  mimeType: string;
};

export type LoadAssetOptions = {
  /** Absolute path to a Next.js `public/` directory for filesystem fallback. */
  publicDir?: string;
  /** API default — PostgreSQL before filesystem when DATABASE_URL is set. */
  preferDatabase?: boolean;
};

/**
 * Load a site asset from PostgreSQL and/or public files.
 * @param rawKey URL segment (may be encoded).
 */
export async function loadAsset(
  rawKey: string,
  options: LoadAssetOptions = {},
): Promise<LoadedAsset | null> {
  const key = decodeURIComponent(rawKey);
  if (!isAssetKey(key)) {
    return null;
  }

  const preferDatabase = options.preferDatabase ?? false;

  if (preferDatabase) {
    const fromDatabase = await loadFromDatabase(key);
    if (fromDatabase) {
      return fromDatabase;
    }

    if (options.publicDir) {
      return loadFromPublic(key, options.publicDir);
    }

    return null;
  }

  if (options.publicDir) {
    const fromPublic = await loadFromPublic(key, options.publicDir);
    if (fromPublic) {
      return fromPublic;
    }
  }

  return loadFromDatabase(key);
}

async function loadFromPublic(
  key: AssetKey,
  publicDir: string,
): Promise<LoadedAsset | null> {
  const fallback = ASSET_FALLBACK_BY_KEY[key];
  const filePath = path.join(publicDir, fallback.publicPath);

  try {
    const data = await readFile(filePath);
    return { data, mimeType: fallback.mimeType };
  } catch {
    return null;
  }
}

async function loadFromDatabase(key: string): Promise<LoadedAsset | null> {
  const prisma = tryGetPrisma();
  if (!prisma) {
    return null;
  }

  try {
    const asset = await prisma.asset.findUnique({ where: { key } });
    if (!asset) {
      return null;
    }

    return {
      data: Buffer.from(asset.data),
      mimeType: asset.mimeType,
    };
  } catch {
    return null;
  }
}
