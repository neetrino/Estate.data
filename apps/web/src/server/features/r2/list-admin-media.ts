import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getR2Config } from "@/server/lib/integrations-env";
import { getR2Client, isR2Configured, r2PublicUrl } from "@/server/lib/r2/client";

const MEDIA_PREFIX = "media/";

export type AdminMediaItemRow = {
  key: string;
  url: string;
  size: number;
  lastModified: string;
  contentType: string | null;
};

export type ListAdminMediaResult = {
  configured: boolean;
  items: AdminMediaItemRow[];
};

/** List R2 objects under `media/` when R2 is configured. */
export async function listAdminMedia(): Promise<ListAdminMediaResult> {
  if (!isR2Configured()) {
    return { configured: false, items: [] };
  }

  const config = getR2Config();
  if (!config) {
    return { configured: false, items: [] };
  }

  const client = getR2Client();
  const items: AdminMediaItemRow[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: config.R2_BUCKET_NAME,
        Prefix: MEDIA_PREFIX,
        ContinuationToken: continuationToken,
      }),
    );

    for (const object of response.Contents ?? []) {
      if (!object.Key) {
        continue;
      }

      items.push({
        key: object.Key,
        url: r2PublicUrl(object.Key),
        size: object.Size ?? 0,
        lastModified: (object.LastModified ?? new Date()).toISOString(),
        contentType: null,
      });
    }

    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);

  items.sort((a, b) => b.lastModified.localeCompare(a.lastModified));

  return { configured: true, items };
}
