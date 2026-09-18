import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";
import { defaultMarketingCopy, withResolvedWhatWeDoMedia } from "@/server/features/site-copy/site-copy-defaults";
import {
  SITE_COPY_KEYS,
  beforeAfterCopySchema,
  brandCopySchema,
  contactMarketingCopySchema,
  faqIntroCopySchema,
  floorPlansCopySchema,
  offeringsCopySchema,
  packageCompareCopySchema,
  packagesIntroCopySchema,
  portfolioIntroCopySchema,
  processCopySchema,
  scanToBimCopySchema,
  serviceAreaCopySchema,
  servicesIntroCopySchema,
  statsCopySchema,
  studioCopySchema,
  webPagesCopySchema,
  whatWeDoCopySchema,
  whyUsCopySchema,
  type BrandCopy,
  type MarketingCopyBundle,
} from "@/server/features/site-copy/site-copy.schema";
import type { ZodType } from "zod";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function readCopy<T>(key: string, schema: ZodType<T>, fallback: T): Promise<T> {
  try {
    const row = await getPrisma().siteCopy.findUnique({ where: { key } });
    if (!row) {
      return fallback;
    }
    const raw: unknown = JSON.parse(row.value);
    const merged = isPlainObject(raw) ? { ...fallback, ...raw } : fallback;
    const parsed = schema.safeParse(merged);
    return parsed.success ? parsed.data : fallback;
  } catch (error) {
    logger.warn("site_copy.read.fallback_default", {
      key,
      reason: error instanceof Error ? error.message : "Unknown site copy read failure",
    });
    return fallback;
  }
}

/** Navbar wordmark and kicker — one SiteCopy key, static fallback. */
export async function getBrandCopy(): Promise<BrandCopy> {
  return readCopy(SITE_COPY_KEYS.brand, brandCopySchema, defaultMarketingCopy().brand);
}

async function readMarketingCopyBundle(
  defaults: MarketingCopyBundle,
): Promise<MarketingCopyBundle> {
  const [
    whatWeDo,
    webPages,
    contact,
    stats,
    offerings,
    process,
    whyUs,
    studio,
    serviceArea,
    beforeAfter,
    packagesIntro,
    portfolioIntro,
    faqIntro,
    floorPlans,
    brand,
    servicesIntro,
    packageCompare,
    scanToBim,
  ] = await Promise.all([
    readCopy(SITE_COPY_KEYS.whatWeDo, whatWeDoCopySchema, defaults.whatWeDo).then(
      withResolvedWhatWeDoMedia,
    ),
    readCopy(SITE_COPY_KEYS.webPages, webPagesCopySchema, defaults.webPages),
    readCopy(SITE_COPY_KEYS.contact, contactMarketingCopySchema, defaults.contact),
    readCopy(SITE_COPY_KEYS.stats, statsCopySchema, defaults.stats),
    readCopy(SITE_COPY_KEYS.offerings, offeringsCopySchema, defaults.offerings),
    readCopy(SITE_COPY_KEYS.process, processCopySchema, defaults.process),
    readCopy(SITE_COPY_KEYS.whyUs, whyUsCopySchema, defaults.whyUs),
    readCopy(SITE_COPY_KEYS.studio, studioCopySchema, defaults.studio),
    readCopy(SITE_COPY_KEYS.serviceArea, serviceAreaCopySchema, defaults.serviceArea),
    readCopy(SITE_COPY_KEYS.beforeAfter, beforeAfterCopySchema, defaults.beforeAfter),
    readCopy(SITE_COPY_KEYS.packagesIntro, packagesIntroCopySchema, defaults.packagesIntro),
    readCopy(SITE_COPY_KEYS.portfolioIntro, portfolioIntroCopySchema, defaults.portfolioIntro),
    readCopy(SITE_COPY_KEYS.faqIntro, faqIntroCopySchema, defaults.faqIntro),
    readCopy(SITE_COPY_KEYS.floorPlans, floorPlansCopySchema, defaults.floorPlans),
    readCopy(SITE_COPY_KEYS.brand, brandCopySchema, defaults.brand),
    readCopy(SITE_COPY_KEYS.servicesIntro, servicesIntroCopySchema, defaults.servicesIntro),
    readCopy(SITE_COPY_KEYS.packageCompare, packageCompareCopySchema, defaults.packageCompare),
    readCopy(SITE_COPY_KEYS.scanToBim, scanToBimCopySchema, defaults.scanToBim),
  ]);

  return {
    whatWeDo,
    webPages,
    contact,
    stats,
    offerings,
    process,
    whyUs,
    studio,
    serviceArea,
    beforeAfter,
    packagesIntro,
    portfolioIntro,
    faqIntro,
    floorPlans,
    brand,
    servicesIntro,
    packageCompare,
    scanToBim,
  };
}

/** Homepage and marketing copy — CMS rows with static fallbacks. */
export async function getMarketingCopy(): Promise<MarketingCopyBundle> {
  return readMarketingCopyBundle(defaultMarketingCopy());
}
