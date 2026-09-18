import { z } from "zod";
import { serviceExampleSchema } from "@/server/features/studio/service-example.schema";

const hrefSchema = z
  .string()
  .trim()
  .min(1)
  .max(300)
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("#") ||
      value.startsWith("http://") ||
      value.startsWith("https://"),
    { message: "Must be a path, hash, or http(s) URL" },
  );

export const updateStudioServiceSchema = z.object({
  eyebrow: z.string().trim().min(1).max(120).optional(),
  title: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().min(1).max(4000).optional(),
  imageUrl: z.string().trim().min(1).max(2048).optional(),
  included: z.array(z.string().trim().min(1).max(200)).max(40).optional(),
  pricing: z
    .array(
      z.object({
        label: z.string().trim().min(1).max(120),
        price: z.string().trim().min(1).max(80),
      }),
    )
    .max(20)
    .optional(),
  primaryCtaLabel: z.string().trim().min(1).max(80).optional(),
  primaryCtaHref: hrefSchema.optional(),
  secondaryCtaLabel: z.string().trim().min(1).max(80).optional(),
  secondaryCtaHref: hrefSchema.optional(),
  startingPrice: z.string().trim().max(40).nullable().optional(),
  pricingUnit: z.string().trim().max(40).nullable().optional(),
  footnote: z.string().trim().max(2000).nullable().optional(),
  demoLabel: z.string().trim().max(80).nullable().optional(),
  demoSpaceId: z.string().trim().max(64).nullable().optional(),
  example: serviceExampleSchema.optional(),
  sortOrder: z.number().int().min(0).max(999).optional(),
  published: z.boolean().optional(),
});

export type UpdateStudioServiceInput = z.infer<typeof updateStudioServiceSchema>;
