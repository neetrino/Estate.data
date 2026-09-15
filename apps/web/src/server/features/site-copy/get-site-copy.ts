import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import {
  HOME_SECTION_IDS,
  homeSectionHref,
} from "@/shared/lib/homeSectionIds";
import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";
import {
  SITE_COPY_KEYS,
  contactMarketingCopySchema,
  webPagesCopySchema,
  whatWeDoCopySchema,
  type ContactMarketingCopy,
  type MarketingCopyBundle,
  type WebPagesCopy,
  type WhatWeDoCopy,
} from "@/server/features/site-copy/site-copy.schema";
import type { ZodType } from "zod";

function defaultWhatWeDoCopy(): WhatWeDoCopy {
  const copy = STUDIO_PAGE_COPY.whatWeDo;
  return {
    eyebrow: copy.eyebrow,
    titleLines: [copy.titleLines[0], copy.titleLines[1], copy.titleLines[2]],
    body: copy.body,
    primaryCta: copy.primaryCta,
    primaryCtaHref: homeSectionHref(HOME_SECTION_IDS.quote),
    secondaryCta: copy.secondaryCta,
    secondaryCtaHref: homeSectionHref(HOME_SECTION_IDS.photography),
    reelLabel: copy.reelLabel,
  };
}

function defaultWebPagesCopy(): WebPagesCopy {
  const copy = STUDIO_PAGE_COPY.webPages;
  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    body: copy.body,
    ctaLabel: copy.ctaLabel,
    href: copy.href,
    startingPrice: copy.startingPrice,
    includedLabel: copy.includedLabel,
    included: [...copy.included],
    pricing: copy.pricing.map((row) => ({ label: row.label, price: row.price })),
  };
}

function defaultContactCopy(): ContactMarketingCopy {
  const copy = STUDIO_PAGE_COPY.contact;
  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    body: copy.body,
    phoneLabel: STUDIO_CONTACT.phone.label,
    phoneHref: STUDIO_CONTACT.phone.href,
    emailLabel: STUDIO_CONTACT.email.label,
    emailHref: STUDIO_CONTACT.email.href,
    hours: STUDIO_CONTACT.hours,
    address: STUDIO_CONTACT.address,
    social: STUDIO_CONTACT.social.map((item) => ({ label: item.label, href: item.href })),
  };
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function readCopy<T>(
  key: string,
  schema: ZodType<T>,
  fallback: T,
): Promise<T> {
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

/** Marketing copy for What We Do, Web Pages, and Contact — CMS with static fallbacks. */
export async function getMarketingCopy(): Promise<MarketingCopyBundle> {
  const [whatWeDo, webPages, contact] = await Promise.all([
    readCopy(SITE_COPY_KEYS.whatWeDo, whatWeDoCopySchema, defaultWhatWeDoCopy()),
    readCopy(SITE_COPY_KEYS.webPages, webPagesCopySchema, defaultWebPagesCopy()),
    readCopy(SITE_COPY_KEYS.contact, contactMarketingCopySchema, defaultContactCopy()),
  ]);

  return { whatWeDo, webPages, contact };
}
