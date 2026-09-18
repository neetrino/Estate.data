import { z } from "zod";
import { siteCopyAssetUrlSchema, siteCopyTrimmed } from "@/server/features/site-copy/site-copy-fields";

const optionalEmbedUrlSchema = z
  .union([siteCopyAssetUrlSchema, z.literal("")])
  .optional()
  .transform((value): string | undefined => (value ? value : undefined));

export const serviceExampleSchema = z.object({
  label: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  summary: siteCopyTrimmed(1, 2000),
  imageUrl: siteCopyAssetUrlSchema,
  highlights: z.array(siteCopyTrimmed(1, 80)).min(1).max(12),
  embedUrl: optionalEmbedUrlSchema,
});

export type ServiceExampleCopy = z.infer<typeof serviceExampleSchema>;
