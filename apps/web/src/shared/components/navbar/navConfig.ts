import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";
import { ASSET_KEYS } from "@estate/db";
import {
  HOME_SECTION_IDS,
  homeSectionHref,
} from "@/shared/lib/homeSectionIds";
import { WEB_PAGES_PATH } from "@/shared/lib/routes";
import { SERVICE_CATALOG } from "@/shared/lib/serviceCatalog";

export const SITE_NAME = "ESTATEDATA.CLOUD";

/** Short wordmark for logo UI (without domain suffix). */
export const SITE_BRAND_WORDMARK = "ESTATEDATA";

export const SITE_DISPLAY_NAME = "ESTATEDATA.CLOUD";
export const SITE_LOGO_PATH = resolveAssetUrl(ASSET_KEYS.siteLogo);
export const SITE_LOGO_DARK_PATH = resolveAssetUrl(ASSET_KEYS.siteLogoDark);
export const SITE_LOGO_CACHE_VERSION = "20260519-removebg";
export const SITE_LOGO_DARK_CACHE_VERSION = "20260519-dark";
export const SITE_LOGO_ALT = "ESTATEDATA";

export type NavLink = {
  label: string;
  href: string;
  hasServicesDropdown?: boolean;
};

export const MAIN_NAV_LINKS: readonly NavLink[] = [
  {
    label: "Services",
    href: homeSectionHref(HOME_SECTION_IDS.photography),
    hasServicesDropdown: true,
  },
  { label: "3D Tours", href: homeSectionHref(HOME_SECTION_IDS.tours) },
  { label: "Scan-to-BIM", href: homeSectionHref(HOME_SECTION_IDS.scanToBim) },
  { label: "Landing Pages", href: WEB_PAGES_PATH },
  { label: "Packages", href: homeSectionHref(HOME_SECTION_IDS.packages) },
  { label: "Portfolio", href: homeSectionHref(HOME_SECTION_IDS.portfolio) },
  { label: "Studio", href: homeSectionHref(HOME_SECTION_IDS.studio) },
  { label: "Contact", href: homeSectionHref(HOME_SECTION_IDS.contact) },
] as const;

export const MOBILE_NAV_PRIMARY_LINKS: readonly NavLink[] = [
  { label: "3D Tours", href: homeSectionHref(HOME_SECTION_IDS.tours) },
  { label: "Scan-to-BIM", href: homeSectionHref(HOME_SECTION_IDS.scanToBim) },
  { label: "Landing Pages", href: WEB_PAGES_PATH },
  { label: "Packages", href: homeSectionHref(HOME_SECTION_IDS.packages) },
  { label: "Portfolio", href: homeSectionHref(HOME_SECTION_IDS.portfolio) },
  { label: "Studio", href: homeSectionHref(HOME_SECTION_IDS.studio) },
  { label: "Contact", href: homeSectionHref(HOME_SECTION_IDS.contact) },
] as const;

export const MOBILE_NAV_MORE_LINKS: readonly NavLink[] = [] as const;

export const SERVICE_NAV_LINKS = SERVICE_CATALOG;

export const NAV_CTA_LINKS = {
  bookShoot: { label: "Book a Shoot", href: homeSectionHref(HOME_SECTION_IDS.contact) },
} as const;
