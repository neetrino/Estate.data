import { getMarketingCopy } from "@/server/features/site-copy/get-site-copy";
import type {
  MarketingCopyBundle,
  UpdateSiteCopyInput,
} from "@/server/features/site-copy/site-copy.schema";
import { getPrisma } from "@/server/lib/db";

/** Upsert one marketing-copy key and return the full bundle. */
export async function updateSiteCopy(
  input: UpdateSiteCopyInput,
): Promise<MarketingCopyBundle> {
  const value = JSON.stringify(input.value);
  await getPrisma().siteCopy.upsert({
    where: { key: input.key },
    create: { key: input.key, value },
    update: { value },
  });
  return getMarketingCopy();
}
