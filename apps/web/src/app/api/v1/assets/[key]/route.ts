import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPrisma } from "@estate/db/server";
import { NextResponse } from "next/server";
import {
  ASSET_FALLBACK_BY_KEY,
  isAssetKey,
} from "@/shared/assets/asset-fallback";

const CACHE_CONTROL = "public, max-age=31536000, immutable";

type RouteContext = {
  params: Promise<{ key: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  const { key: rawKey } = await context.params;
  const key = decodeURIComponent(rawKey);

  if (!isAssetKey(key)) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  const fromPublic = await loadAssetFromPublic(key);
  if (fromPublic) {
    return fromPublic;
  }

  const fromDatabase = await loadAssetFromDatabase(key);
  if (fromDatabase) {
    return fromDatabase;
  }

  return NextResponse.json({ error: "Asset not found" }, { status: 404 });
}

async function loadAssetFromDatabase(
  key: string,
): Promise<NextResponse | null> {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const asset = await getPrisma().asset.findUnique({ where: { key } });
    if (!asset) {
      return null;
    }

    return new NextResponse(Buffer.from(asset.data), {
      headers: {
        "Content-Type": asset.mimeType,
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch {
    return null;
  }
}

async function loadAssetFromPublic(key: string): Promise<NextResponse | null> {
  if (!isAssetKey(key)) {
    return null;
  }

  const fallback = ASSET_FALLBACK_BY_KEY[key];
  const filePath = path.join(process.cwd(), "public", fallback.publicPath);

  try {
    const data = await readFile(filePath);
    return new NextResponse(data, {
      headers: {
        "Content-Type": fallback.mimeType,
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch {
    return null;
  }
}
