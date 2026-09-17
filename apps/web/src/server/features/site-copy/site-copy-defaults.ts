import { SITE_NAME } from "@/shared/components/navbar/navConfig";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import { HOME_SECTION_IDS, homeSectionHref } from "@/shared/lib/homeSectionIds";
import type { MarketingCopyBundle, WhatWeDoCopy } from "@/server/features/site-copy/site-copy.schema";

/** Maps the old Web Pages mockup poster to the villa still used on the public reel. */
export function withResolvedWhatWeDoMedia(copy: WhatWeDoCopy): WhatWeDoCopy {
  if (copy.reelPosterUrl !== STUDIO_MEDIA.landingPage) {
    return copy;
  }
  return { ...copy, reelPosterUrl: STUDIO_MEDIA.heroVilla };
}

/** Static fallbacks used when a SiteCopy key is missing or invalid. */
export function defaultMarketingCopy(): MarketingCopyBundle {
  const whatWeDo = STUDIO_PAGE_COPY.whatWeDo;
  const webPages = STUDIO_PAGE_COPY.webPages;
  const contact = STUDIO_PAGE_COPY.contact;
  const floorPlans = STUDIO_PAGE_COPY.floorPlans;

  return {
    whatWeDo: {
      eyebrow: whatWeDo.eyebrow,
      titleLines: [whatWeDo.titleLines[0], whatWeDo.titleLines[1], whatWeDo.titleLines[2]],
      body: whatWeDo.body,
      primaryCta: whatWeDo.primaryCta,
      primaryCtaHref: homeSectionHref(HOME_SECTION_IDS.quote),
      secondaryCta: whatWeDo.secondaryCta,
      secondaryCtaHref: homeSectionHref(HOME_SECTION_IDS.photography),
      reelLabel: whatWeDo.reelLabel,
      reelUrl: STUDIO_MEDIA.promo,
      reelPosterUrl: STUDIO_MEDIA.heroVilla,
    },
    webPages: {
      eyebrow: webPages.eyebrow,
      title: webPages.title,
      body: webPages.body,
      ctaLabel: webPages.ctaLabel,
      href: webPages.href,
      startingPrice: webPages.startingPrice,
      includedLabel: webPages.includedLabel,
      included: [...webPages.included],
      pricing: webPages.pricing.map((row) => ({ label: row.label, price: row.price })),
    },
    contact: {
      eyebrow: contact.eyebrow,
      title: contact.title,
      body: contact.body,
      phoneLabel: STUDIO_CONTACT.phone.label,
      phoneHref: STUDIO_CONTACT.phone.href,
      emailLabel: STUDIO_CONTACT.email.label,
      emailHref: STUDIO_CONTACT.email.href,
      hours: STUDIO_CONTACT.hours,
      address: STUDIO_CONTACT.address,
      social: STUDIO_CONTACT.social.map((item) => ({ label: item.label, href: item.href })),
    },
    stats: {
      items: STUDIO_PAGE_COPY.stats.map((item) => ({ value: item.value, label: item.label })),
    },
    offerings: {
      eyebrow: STUDIO_PAGE_COPY.offerings.eyebrow,
      title: STUDIO_PAGE_COPY.offerings.title,
      items: STUDIO_PAGE_COPY.offerings.items.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      })),
    },
    process: {
      eyebrow: STUDIO_PAGE_COPY.process.eyebrow,
      title: STUDIO_PAGE_COPY.process.title,
      steps: STUDIO_PAGE_COPY.process.steps.map((step) => ({
        title: step.title,
        body: step.body,
      })),
    },
    whyUs: {
      eyebrow: STUDIO_PAGE_COPY.whyUs.eyebrow,
      title: STUDIO_PAGE_COPY.whyUs.title,
      body: STUDIO_PAGE_COPY.whyUs.body,
      tags: [...STUDIO_PAGE_COPY.whyUs.tags],
      points: [...STUDIO_PAGE_COPY.whyUs.points],
    },
    studio: {
      eyebrow: STUDIO_PAGE_COPY.studio.eyebrow,
      title: STUDIO_PAGE_COPY.studio.title,
      body: STUDIO_PAGE_COPY.studio.body,
      imageUrl: STUDIO_MEDIA.team,
      imageAlt: `${SITE_NAME} production crew on location at a Los Angeles property shoot`,
      members: STUDIO_PAGE_COPY.team.map((member) => ({
        initials: member.initials,
        name: member.name,
        role: member.role,
        bio: member.bio,
      })),
    },
    serviceArea: {
      eyebrow: STUDIO_PAGE_COPY.serviceArea.eyebrow,
      title: STUDIO_PAGE_COPY.serviceArea.title,
      body: STUDIO_PAGE_COPY.serviceArea.body,
      cities: [...STUDIO_PAGE_COPY.serviceArea.cities],
      note: STUDIO_PAGE_COPY.serviceArea.note,
      cta: STUDIO_PAGE_COPY.serviceArea.cta,
      ctaHref: homeSectionHref(HOME_SECTION_IDS.quote),
    },
    beforeAfter: {
      eyebrow: STUDIO_PAGE_COPY.beforeAfter.eyebrow,
      title: STUDIO_PAGE_COPY.beforeAfter.title,
      body: STUDIO_PAGE_COPY.beforeAfter.body,
      sliderLabel: STUDIO_PAGE_COPY.beforeAfter.sliderLabel,
      beforeLabel: STUDIO_PAGE_COPY.beforeAfter.beforeLabel,
      afterLabel: STUDIO_PAGE_COPY.beforeAfter.afterLabel,
      items: STUDIO_PAGE_COPY.beforeAfter.items.map((item) => ({
        id: item.id,
        label: item.label,
        beforeSrc: item.beforeSrc,
        afterSrc: item.afterSrc,
        beforeAlt: item.beforeAlt,
        afterAlt: item.afterAlt,
      })),
    },
    packagesIntro: { ...STUDIO_PAGE_COPY.packages },
    portfolioIntro: {
      eyebrow: STUDIO_PAGE_COPY.portfolio.eyebrow,
      title: STUDIO_PAGE_COPY.portfolio.title,
      cta: STUDIO_PAGE_COPY.portfolio.cta,
      filtersAriaLabel: STUDIO_PAGE_COPY.portfolio.filtersAriaLabel,
    },
    faqIntro: { ...STUDIO_PAGE_COPY.faq },
    floorPlans: {
      eyebrow: floorPlans.eyebrow,
      title: floorPlans.title,
      body: floorPlans.body,
      included: [...floorPlans.included],
    },
  };
}
