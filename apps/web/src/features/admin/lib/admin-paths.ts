/** Hidden admin login route — not linked from public navigation. */
export const SUPERSUDO_PATH = "/supersudo";

/** Admin dashboard after successful login. */
export const SUPERSUDO_PANEL_PATH = "/supersudo/panel";

export const SUPERSUDO_PANEL_PORTFOLIO_PATH = "/supersudo/panel/portfolio";
export const SUPERSUDO_PANEL_PRICING_PATH = "/supersudo/panel/pricing";
export const SUPERSUDO_PANEL_ARTICLES_PATH = "/supersudo/panel/articles";
export const SUPERSUDO_PANEL_FAQ_PATH = "/supersudo/panel/faq";
export const SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH =
  "/supersudo/panel/contact-inquiries";
export const SUPERSUDO_PANEL_ASSETS_PATH = "/supersudo/panel/assets";
export const SUPERSUDO_PANEL_MEDIA_PATH = "/supersudo/panel/media";
export const SUPERSUDO_PANEL_PAYMENTS_PATH = "/supersudo/panel/payments";
export const SUPERSUDO_PANEL_SITE_CONTENT_PATH = "/supersudo/panel/site-content";

/** Whether the pathname belongs to the admin area. */
export function isSupersudoRoute(pathname: string): boolean {
  return (
    pathname === SUPERSUDO_PATH ||
    pathname.startsWith(`${SUPERSUDO_PATH}/`)
  );
}

const PAGE_TITLES: Readonly<Record<string, string>> = {
  [SUPERSUDO_PANEL_PATH]: "Dashboard",
  [SUPERSUDO_PANEL_PORTFOLIO_PATH]: "Portfolio",
  [SUPERSUDO_PANEL_PRICING_PATH]: "Pricing",
  [SUPERSUDO_PANEL_ARTICLES_PATH]: "Articles",
  [SUPERSUDO_PANEL_FAQ_PATH]: "FAQ",
  [SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH]: "Contact inquiries",
  [SUPERSUDO_PANEL_ASSETS_PATH]: "Assets",
  [SUPERSUDO_PANEL_MEDIA_PATH]: "Media",
  [SUPERSUDO_PANEL_PAYMENTS_PATH]: "Payments",
  [SUPERSUDO_PANEL_SITE_CONTENT_PATH]: "Site content",
};

/** Human-readable title for the current admin panel route. */
export function getAdminPanelPageTitle(pathname: string): string {
  return PAGE_TITLES[pathname] ?? "Admin";
}
