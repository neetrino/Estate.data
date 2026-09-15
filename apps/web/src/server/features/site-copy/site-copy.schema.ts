import { z } from "zod";

export const SITE_COPY_KEYS = {
  whatWeDo: "what-we-do",
  webPages: "web-pages",
  contact: "contact",
} as const;

export type SiteCopyKey = (typeof SITE_COPY_KEYS)[keyof typeof SITE_COPY_KEYS];

const trimmed = (min: number, max: number) => z.string().trim().min(min).max(max);

const buttonHrefSchema = trimmed(1, 300).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://"),
  { message: "Must be an internal path (/) or http(s) URL" },
);

const contactHrefSchema = trimmed(1, 300).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("tel:") ||
    value.startsWith("mailto:"),
  { message: "Must be a path, http(s), tel:, or mailto:" },
);

export const whatWeDoCopySchema = z.object({
  eyebrow: trimmed(1, 80),
  titleLines: z.tuple([trimmed(1, 80), trimmed(1, 80), trimmed(1, 80)]),
  body: trimmed(1, 2000),
  primaryCta: trimmed(1, 120),
  primaryCtaHref: buttonHrefSchema,
  secondaryCta: trimmed(1, 120),
  secondaryCtaHref: buttonHrefSchema,
  reelLabel: trimmed(1, 80),
});

export type WhatWeDoCopy = z.infer<typeof whatWeDoCopySchema>;

const pricingRowSchema = z.object({
  label: trimmed(1, 120),
  price: trimmed(1, 80),
});

export const webPagesCopySchema = z.object({
  eyebrow: trimmed(1, 80),
  title: trimmed(1, 200),
  body: trimmed(1, 2000),
  ctaLabel: trimmed(1, 120),
  href: buttonHrefSchema,
  startingPrice: trimmed(1, 40),
  includedLabel: trimmed(1, 80),
  included: z.array(trimmed(1, 200)).min(1).max(20),
  pricing: z.array(pricingRowSchema).min(1).max(12),
});

export type WebPagesCopy = z.infer<typeof webPagesCopySchema>;

const socialLinkSchema = z.object({
  label: trimmed(1, 80),
  href: buttonHrefSchema,
});

export const contactMarketingCopySchema = z.object({
  eyebrow: trimmed(1, 80),
  title: trimmed(1, 200),
  body: trimmed(1, 2000),
  phoneLabel: trimmed(1, 80),
  phoneHref: contactHrefSchema,
  emailLabel: trimmed(1, 80),
  emailHref: contactHrefSchema,
  hours: trimmed(1, 120),
  address: trimmed(1, 200),
  social: z.array(socialLinkSchema).max(8),
});

export type ContactMarketingCopy = z.infer<typeof contactMarketingCopySchema>;

export const marketingCopyBundleSchema = z.object({
  whatWeDo: whatWeDoCopySchema,
  webPages: webPagesCopySchema,
  contact: contactMarketingCopySchema,
});

export type MarketingCopyBundle = z.infer<typeof marketingCopyBundleSchema>;

export const updateSiteCopySchema = z.discriminatedUnion("key", [
  z.object({ key: z.literal(SITE_COPY_KEYS.whatWeDo), value: whatWeDoCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.webPages), value: webPagesCopySchema }),
  z.object({ key: z.literal(SITE_COPY_KEYS.contact), value: contactMarketingCopySchema }),
]);

export type UpdateSiteCopyInput = z.infer<typeof updateSiteCopySchema>;
