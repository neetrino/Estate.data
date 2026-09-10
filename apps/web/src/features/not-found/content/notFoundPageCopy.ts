import { HOME_SECTION_IDS, homeSectionHref } from "@/shared/lib/homeSectionIds";
import { WEB_PAGES_PATH } from "@/shared/lib/routes";

export const NOT_FOUND_PAGE_COPY = {
  eyebrow: "404 — Page not found",
  title: "This page isn't on the map",
  subtitle:
    "The link may be outdated, or the page may have moved. Head home or contact us — we'll point you in the right direction.",
  primaryCta: { label: "Back to home", href: "/" },
  secondaryCta: {
    label: "Contact us",
    href: homeSectionHref(HOME_SECTION_IDS.quote),
  },
  quickLinksHeading: "Popular destinations",
  quickLinks: [
    { label: "Services", href: homeSectionHref(HOME_SECTION_IDS.whatWeDo) },
    { label: "Scan-to-BIM", href: homeSectionHref(HOME_SECTION_IDS.scanToBim) },
    { label: "Portfolio", href: homeSectionHref(HOME_SECTION_IDS.portfolio) },
    { label: "Packages", href: homeSectionHref(HOME_SECTION_IDS.packages) },
    { label: "Landing Pages", href: WEB_PAGES_PATH },
  ],
} as const;
