import { ASSET_KEYS, assetUrl } from "@estate/db";
import { DATA_BIM_PATH, PRICING_PATH } from "@/shared/lib/routes";

export const SITE_NAME = "ESTATEDATA";

/** Browser tab / SEO titles (spaced brand name). */
export const SITE_DISPLAY_NAME = "Estate Data";
export const SITE_LOGO_PATH = assetUrl(ASSET_KEYS.siteLogo);
export const SITE_LOGO_DARK_PATH = assetUrl(ASSET_KEYS.siteLogoDark);
export const SITE_LOGO_CACHE_VERSION = "20260519-removebg";
export const SITE_LOGO_DARK_CACHE_VERSION = "20260519-dark";
export const SITE_LOGO_ALT = "Estate Data";

export type NavLink = {
  label: string;
  href: string;
};

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Media", href: "/media" },
  { label: "Data & BIM", href: DATA_BIM_PATH },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: PRICING_PATH },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Mobile drawer — always visible links (matches primary nav pattern). */
export const MOBILE_NAV_PRIMARY_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Media", href: "/media" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Mobile drawer — expandable “More” section. */
export const MOBILE_NAV_MORE_LINKS: readonly NavLink[] = [
  { label: "Data & BIM", href: DATA_BIM_PATH },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: PRICING_PATH },
] as const;

export const NAV_CTA_LINKS = {
  bookShoot: { label: "Book a Shoot", href: "/contact" },
} as const;
