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
export const SUPERSUDO_PANEL_HOME_HERO_PATH = "/supersudo/panel/site-content/home-hero";
export const SUPERSUDO_PANEL_HERO_SLIDES_PATH =
  "/supersudo/panel/site-content/hero-slides";
export const SUPERSUDO_PANEL_STUDIO_SERVICES_PATH =
  "/supersudo/panel/site-content/studio-services";
export const SUPERSUDO_PANEL_CONTACT_FIELDS_PATH =
  "/supersudo/panel/site-content/contact-fields";
export const SUPERSUDO_PANEL_SITE_COPY_PATH = "/supersudo/panel/site-content/copy";
export const SUPERSUDO_PANEL_ANALYTICS_PATH = "/supersudo/panel/analytics";

/** Whether the pathname belongs to the admin area. */
export function isSupersudoRoute(pathname: string): boolean {
  return (
    pathname === SUPERSUDO_PATH ||
    pathname.startsWith(`${SUPERSUDO_PATH}/`)
  );
}
