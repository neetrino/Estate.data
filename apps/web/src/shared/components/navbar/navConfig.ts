import { ASSET_KEYS } from "@estate/db";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";
import { PRICING_PATH } from "@/shared/lib/routes";
import { SERVICE_CATALOG } from "@/shared/lib/serviceCatalog";

export const SITE_NAME = "EstateData.cloud";

/** Browser tab / SEO titles (spaced brand name). */
export const SITE_DISPLAY_NAME = "EstateData.cloud";
export const SITE_LOGO_PATH = resolveAssetUrl(ASSET_KEYS.siteLogo);
export const SITE_LOGO_DARK_PATH = resolveAssetUrl(ASSET_KEYS.siteLogoDark);
export const SITE_LOGO_CACHE_VERSION = "20260519-removebg";
export const SITE_LOGO_DARK_CACHE_VERSION = "20260519-dark";
export const SITE_LOGO_ALT = "EstateData.cloud";

export type NavLink = {
  label: string;
  href: string;
};

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: PRICING_PATH },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Mobile drawer — always visible links (matches primary nav pattern). */
export const MOBILE_NAV_PRIMARY_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Mobile drawer — expandable “More” section. */
export const MOBILE_NAV_MORE_LINKS: readonly NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: PRICING_PATH },
] as const;

export const SERVICE_NAV_LINKS = SERVICE_CATALOG;

export const NAV_CTA_LINKS = {
  bookShoot: { label: "Book Now", href: "/contact" },
} as const;
