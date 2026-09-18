import { z } from "zod";
import { siteCopyTrimmed } from "@/server/features/site-copy/site-copy-fields";

export const brandCopySchema = z.object({
  name: siteCopyTrimmed(1, 40),
  kicker: siteCopyTrimmed(1, 80),
});

export type BrandCopy = z.infer<typeof brandCopySchema>;

export const servicesIntroCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
});

export type ServicesIntroCopy = z.infer<typeof servicesIntroCopySchema>;

export const packageCompareCopySchema = z
  .object({
    eyebrow: siteCopyTrimmed(1, 80),
    title: siteCopyTrimmed(1, 200),
    columns: z.array(siteCopyTrimmed(1, 40)).min(2).max(6),
    rows: z
      .array(
        z.object({
          service: siteCopyTrimmed(1, 80),
          values: z.array(siteCopyTrimmed(1, 24)).min(2).max(6),
        }),
      )
      .min(1)
      .max(16),
  })
  .superRefine((value, ctx) => {
    const width = value.columns.length;
    value.rows.forEach((row, index) => {
      if (row.values.length === width) {
        return;
      }
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Each row needs ${width} cells — one per package column.`,
        path: ["rows", index, "values"],
      });
    });
  });

export type PackageCompareCopy = z.infer<typeof packageCompareCopySchema>;

export const scanToBimCopySchema = z.object({
  imageAlt: siteCopyTrimmed(1, 200),
  workflowLabel: siteCopyTrimmed(1, 80),
  deliverablesLabel: siteCopyTrimmed(1, 80),
  pricingLabel: siteCopyTrimmed(1, 80),
  pricingFactorsLabel: siteCopyTrimmed(1, 80),
  chain: z.array(siteCopyTrimmed(1, 40)).min(2).max(8),
  workflow: z
    .array(
      z.object({
        step: siteCopyTrimmed(1, 8),
        label: siteCopyTrimmed(1, 120),
      }),
    )
    .min(1)
    .max(12),
  deliverables: z.array(siteCopyTrimmed(1, 80)).min(1).max(20),
  pricingFactors: z.array(siteCopyTrimmed(1, 80)).min(1).max(16),
});

export type ScanToBimCopy = z.infer<typeof scanToBimCopySchema>;
