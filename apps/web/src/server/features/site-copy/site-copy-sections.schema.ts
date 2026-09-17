import { z } from "zod";
import {
  siteCopyAssetUrlSchema,
  siteCopyButtonHrefSchema,
  siteCopyTrimmed,
} from "@/server/features/site-copy/site-copy-fields";

export const statsCopySchema = z.object({
  items: z
    .array(
      z.object({
        value: siteCopyTrimmed(1, 24),
        label: siteCopyTrimmed(1, 80),
      }),
    )
    .min(1)
    .max(8),
});

export type StatsCopy = z.infer<typeof statsCopySchema>;

export const offeringsCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  items: z
    .array(
      z.object({
        id: siteCopyTrimmed(1, 8),
        title: siteCopyTrimmed(1, 80),
        body: siteCopyTrimmed(1, 400),
      }),
    )
    .min(1)
    .max(8),
});

export type OfferingsCopy = z.infer<typeof offeringsCopySchema>;

export const processCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  steps: z
    .array(
      z.object({
        title: siteCopyTrimmed(1, 80),
        body: siteCopyTrimmed(1, 300),
      }),
    )
    .min(1)
    .max(8),
});

export type ProcessCopy = z.infer<typeof processCopySchema>;

export const whyUsCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  tags: z.array(siteCopyTrimmed(1, 80)).min(1).max(16),
  points: z.array(siteCopyTrimmed(1, 200)).min(1).max(12),
});

export type WhyUsCopy = z.infer<typeof whyUsCopySchema>;

export const studioCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  imageUrl: siteCopyAssetUrlSchema,
  imageAlt: siteCopyTrimmed(1, 200),
  members: z
    .array(
      z.object({
        initials: siteCopyTrimmed(1, 8),
        name: siteCopyTrimmed(1, 80),
        role: siteCopyTrimmed(1, 80),
        bio: siteCopyTrimmed(1, 400),
      }),
    )
    .min(1)
    .max(16),
});

export type StudioCopy = z.infer<typeof studioCopySchema>;

export const serviceAreaCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  cities: z.array(siteCopyTrimmed(1, 80)).min(1).max(24),
  note: siteCopyTrimmed(1, 300),
  cta: siteCopyTrimmed(1, 80),
  ctaHref: siteCopyButtonHrefSchema,
});

export type ServiceAreaCopy = z.infer<typeof serviceAreaCopySchema>;

export const beforeAfterCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  sliderLabel: siteCopyTrimmed(1, 120),
  beforeLabel: siteCopyTrimmed(1, 40),
  afterLabel: siteCopyTrimmed(1, 40),
  items: z
    .array(
      z.object({
        id: siteCopyTrimmed(1, 40),
        label: siteCopyTrimmed(1, 120),
        beforeSrc: siteCopyAssetUrlSchema,
        afterSrc: siteCopyAssetUrlSchema,
        beforeAlt: siteCopyTrimmed(1, 200),
        afterAlt: siteCopyTrimmed(1, 200),
      }),
    )
    .min(1)
    .max(6),
});

export type BeforeAfterCopy = z.infer<typeof beforeAfterCopySchema>;

export const packagesIntroCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  startingAt: siteCopyTrimmed(1, 80),
  builtForLabel: siteCopyTrimmed(1, 80),
  customDescription: siteCopyTrimmed(1, 400),
});

export type PackagesIntroCopy = z.infer<typeof packagesIntroCopySchema>;

export const portfolioIntroCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  cta: siteCopyTrimmed(1, 80),
  filtersAriaLabel: siteCopyTrimmed(1, 80),
});

export type PortfolioIntroCopy = z.infer<typeof portfolioIntroCopySchema>;

export const faqIntroCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
});

export type FaqIntroCopy = z.infer<typeof faqIntroCopySchema>;

export const floorPlansCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  included: z.array(siteCopyTrimmed(1, 120)).min(1).max(12),
});

export type FloorPlansCopy = z.infer<typeof floorPlansCopySchema>;
