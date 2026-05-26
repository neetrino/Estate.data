import { getPrisma } from "@estate/db/server";
import type { AssetKey } from "@estate/db";

export type UpsertedAsset = {
  id: string;
  key: AssetKey;
  byteSize: number;
  updatedAt: string;
};

type UpsertAssetInput = {
  key: AssetKey;
  mimeType: string;
  fileName: string;
  data: Buffer;
};

/** Create or replace asset bytes in PostgreSQL. */
export async function upsertAsset(input: UpsertAssetInput): Promise<UpsertedAsset> {
  const byteSize = input.data.length;
  const data = Uint8Array.from(input.data);

  const asset = await getPrisma().asset.upsert({
    where: { key: input.key },
    create: {
      key: input.key,
      mimeType: input.mimeType,
      fileName: input.fileName,
      data,
      byteSize,
    },
    update: {
      mimeType: input.mimeType,
      fileName: input.fileName,
      data,
      byteSize,
    },
  });

  return {
    id: asset.id,
    key: asset.key as AssetKey,
    byteSize: asset.byteSize,
    updatedAt: asset.updatedAt.toISOString(),
  };
}
