import { z } from "zod";
import {
  siteCopyAssetUrlSchema,
  siteCopyButtonHrefSchema,
  siteCopyContactHrefSchema,
  siteCopyTrimmed,
} from "@/server/features/site-copy/site-copy-fields";
import {
  brandCopySchema,
  packageCompareCopySchema,
  scanToBimCopySchema,
  servicesIntroCopySchema,
} from "@/server/features/site-copy/site-copy-extra.schema";
import {
  beforeAfterCopySchema,
  faqIntroCopySchema,
  floorPlansCopySchema,
  offeringsCopySchema,
  packagesIntroCopySchema,
  portfolioIntroCopySchema,
  processCopySchema,
  serviceAreaCopySchema,
  statsCopySchema,
  studioCopySchema,
  whyUsCopySchema,
} from "@/server/features/site-copy/site-copy-sections.schema";

export const SITE_COPY_KEYS = {
  whatWeDo: "what-we-do",
  webPages: "web-pages",
  contact: "contact",
  stats: "stats",
  offerings: "offerings",
  process: "process",
  whyUs: "why-us",
  studio: "studio",
  serviceArea: "service-area",
  beforeAfter: "before-after",
  packagesIntro: "packages-intro",
  portfolioIntro: "portfolio-intro",
  faqIntro: "faq-intro",
  floorPlans: "floor-plans",
  brand: "brand",
  servicesIntro: "services-intro",
  packageCompare: "package-compare",
  scanToBim: "scan-to-bim",
} as const;

export type SiteCopyKey = (typeof SITE_COPY_KEYS)[keyof typeof SITE_COPY_KEYS];

export const whatWeDoCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  titleLines: z.tuple([siteCopyTrimmed(1, 80), siteCopyTrimmed(1, 80), siteCopyTrimmed(1, 80)]),
  body: siteCopyTrimmed(1, 2000),
  primaryCta: siteCopyTrimmed(1, 120),
  primaryCtaHref: siteCopyButtonHrefSchema,
  secondaryCta: siteCopyTrimmed(1, 120),
  secondaryCtaHref: siteCopyButtonHrefSchema,
  reelLabel: siteCopyTrimmed(1, 80),
  reelUrl: siteCopyAssetUrlSchema,
  reelPosterUrl: siteCopyAssetUrlSchema,
});

export type WhatWeDoCopy = z.infer<typeof whatWeDoCopySchema>;

const pricingRowSchema = z.object({
  label: siteCopyTrimmed(1, 120),
  price: siteCopyTrimmed(1, 80),
});

export const webPagesCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  ctaLabel: siteCopyTrimmed(1, 120),
  href: siteCopyButtonHrefSchema,
  startingPrice: siteCopyTrimmed(1, 40),
  includedLabel: siteCopyTrimmed(1, 80),
  included: z.array(siteCopyTrimmed(1, 200)).min(1).max(20),
  pricing: z.array(pricingRowSchema).min(1).max(12),
});

export type WebPagesCopy = z.infer<typeof webPagesCopySchema>;

export const contactMarketingCopySchema = z.object({
  eyebrow: siteCopyTrimmed(1, 80),
  title: siteCopyTrimmed(1, 200),
  body: siteCopyTrimmed(1, 2000),
  phoneLabel: siteCopyTrimmed(1, 80),
  phoneHref: siteCopyContactHrefSchema,
  emailLabel: siteCopyTrimmed(1, 80),
  emailHref: siteCopyContactHrefSchema,
  hours: siteCopyTrimmed(1, 120),
  address: siteCopyTrimmed(1, 200),
  social: z
    .array(z.object({ label: siteCopyTrimmed(1, 80), href: siteCopyButtonHrefSchema }))
    .max(8),
});

export type ContactMarketingCopy = z.infer<typeof contactMarketingCopySchema>;

export const marketingCopyBundleSchema = z.object({
  whatWeDo: whatWeDoCopySchema,
  webPages: webPagesCopySchema,
  contact: contactMarketingCopySchema,
  stats: statsCopySchema,
  offerings: offeringsCopySchema,
  process: processCopySchema,
  whyUs: whyUsCopySchema,
  studio: studioCopySchema,
  serviceArea: serviceAreaCopySchema,
  beforeAfter: beforeAfterCopySchema,
  packagesIntro: packagesIntroCopySchema,
  portfolioIntro: portfolioIntroCopySchema,
  faqIntro: faqIntroCopySchema,
  floorPlans: floorPlansCopySchema,
  brand: brandCopySchema,
  servicesIntro: servicesIntroCopySchema,
  packageCompare: packageCompareCopySchema,
  scanToBim: scanToBimCopySchema,
});

export type MarketingCopyBundle = z.infer<typeof marketingCopyBundleSchema>;

export const updateSiteCopySchema = z.discriminatedUnion("key", [
  z.object({ key: z.literal(SITE_COPY_KEYS.whatWeDo), value: whatWeDoCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.webPages), value: webPagesCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.contact), value: contactMarketingCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.stats), value: statsCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.offerings), value: offeringsCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.process), value: processCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.whyUs), value: whyUsCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.studio), value: studioCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.serviceArea), value: serviceAreaCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.beforeAfter), value: beforeAfterCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.packagesIntro), value: packagesIntroCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.portfolioIntro), value: portfolioIntroCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.faqIntro), value: faqIntroCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.floorPlans), value: floorPlansCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.brand), value: brandCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.servicesIntro), value: servicesIntroCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.packageCompare), value: packageCompareCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.scanToBim), value: scanToBimCopySchema }),
]);

export type UpdateSiteCopyInput = z.infer<typeof updateSiteCopySchema>;

export {
  brandCopySchema,
  packageCompareCopySchema,
  scanToBimCopySchema,
  servicesIntroCopySchema,
} from "@/server/features/site-copy/site-copy-extra.schema";
export {
  beforeAfterCopySchema,
  faqIntroCopySchema,
  floorPlansCopySchema,
  offeringsCopySchema,
  packagesIntroCopySchema,
  portfolioIntroCopySchema,
  processCopySchema,
  serviceAreaCopySchema,
  statsCopySchema,
  studioCopySchema,
  whyUsCopySchema,
} from "@/server/features/site-copy/site-copy-sections.schema";

export type {
  BrandCopy,
  PackageCompareCopy,
  ScanToBimCopy,
  ServicesIntroCopy,
} from "@/server/features/site-copy/site-copy-extra.schema";
export type {
  BeforeAfterCopy,
  FaqIntroCopy,
  FloorPlansCopy,
  OfferingsCopy,
  PackagesIntroCopy,
  PortfolioIntroCopy,
  ProcessCopy,
  ServiceAreaCopy,
  StatsCopy,
  StudioCopy,
  WhyUsCopy,
} from "@/server/features/site-copy/site-copy-sections.schema";
