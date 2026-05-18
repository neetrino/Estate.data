export const SITE_NAME = "LumenLA";
export const LOGO_MARK = "L";
export const LOGO_WORDMARK = "LumenLA";

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
