import { CONTACT_PATH, DATA_BIM_PATH, PRICING_PATH } from "@/shared/lib/routes";

export const NOT_FOUND_PAGE_COPY = {
  eyebrow: "404 — Page not found",
  title: "This page isn't on the map",
  subtitle:
    "The link may be outdated, or the page may have moved. Head home or contact us — we'll point you in the right direction.",
  primaryCta: { label: "Back to home", href: "/" },
  secondaryCta: { label: "Contact us", href: CONTACT_PATH },
  quickLinksHeading: "Popular destinations",
  quickLinks: [
    { label: "Media", href: "/media" },
    { label: "Data & BIM", href: DATA_BIM_PATH },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: PRICING_PATH },
  ],
} as const;
