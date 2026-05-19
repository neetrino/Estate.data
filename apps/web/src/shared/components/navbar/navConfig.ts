export const SITE_NAME = "LumenLA";
export const SITE_LOGO_PATH = "/images/logo-estatedata.png";
export const SITE_LOGO_DARK_PATH = "/images/logo-estatedata-dark.png";
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
  { label: "Data & BIM", href: "/data-bim" },
  { label: "Solutions", href: "/solutions" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
] as const;

export const NAV_CTA_LINKS = {
  phone: { label: "(323) 555-0142", href: "tel:+13235550142" },
  bookShoot: { label: "Book a Shoot", href: "/book" },
} as const;
