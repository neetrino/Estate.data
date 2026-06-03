import { API_VERSION_PREFIX } from "@estate/db";
import { getPrisma } from "@/server/lib/db";

function assetPublicUrl(key: string): string {
  return `${API_VERSION_PREFIX}/assets/${encodeURIComponent(key)}`;
}

export type AdminAssetRow = {
  id: string;
  key: string;
  mimeType: string;
  fileName: string;
  byteSize: number;
  createdAt: string;
  updatedAt: string;
  publicUrl: string;
};

/** List DB assets for admin (no binary payload). */
export async function listAdminAssets(): Promise<AdminAssetRow[]> {
  const rows = await getPrisma().asset.findMany({
    orderBy: { key: "asc" },
    select: {
      id: true,
      key: true,
      mimeType: true,
      fileName: true,
      byteSize: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return rows.map((row) => ({
    id: row.id,
    key: row.key,
    mimeType: row.mimeType,
    fileName: row.fileName,
    byteSize: row.byteSize,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publicUrl: assetPublicUrl(row.key),
  }));
}
