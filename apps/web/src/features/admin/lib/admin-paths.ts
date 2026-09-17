/** Hidden admin login route — not linked from public navigation. */
export const SUPERSUDO_PATH = "/supersudo";

/** Admin dashboard after successful login. */
export const SUPERSUDO_PANEL_PATH = "/supersudo/panel";

export const SUPERSUDO_PANEL_PORTFOLIO_PATH = "/supersudo/panel/portfolio";
export const SUPERSUDO_PANEL_PRICING_PATH = "/supersudo/panel/pricing";
export const SUPERSUDO_PANEL_FAQ_PATH = "/supersudo/panel/faq";
export const SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH =
  "/supersudo/panel/contact-inquiries";
export const SUPERSUDO_PANEL_SITE_CONTENT_PATH = "/supersudo/panel/site-content";
export const SUPERSUDO_PANEL_HOME_HERO_PATH = "/supersudo/panel/site-content/home-hero";
export const SUPERSUDO_PANEL_HERO_SLIDES_PATH =
  "/supersudo/panel/site-content/hero-slides";
export const SUPERSUDO_PANEL_STUDIO_SERVICES_PATH =
  "/supersudo/panel/site-content/studio-services";

export function supersudoStudioServicePath(sectionKey: string): string {
  return `${SUPERSUDO_PANEL_STUDIO_SERVICES_PATH}/${encodeURIComponent(sectionKey)}`;
}
export const SUPERSUDO_PANEL_CONTACT_FIELDS_PATH =
  "/supersudo/panel/site-content/contact-fields";
export const SUPERSUDO_PANEL_MARKETING_COPY_PATH =
  "/supersudo/panel/site-content/marketing-copy";
export const SUPERSUDO_PANEL_HOMEPAGE_COPY_PATH =
  "/supersudo/panel/site-content/homepage-sections";
export const SUPERSUDO_PANEL_ANALYTICS_PATH = "/supersudo/panel/analytics";

const DEFAULT_GOOGLE_ANALYTICS_HREF = "https://analytics.google.com/";

/** Admin shortcut into Google Analytics — no in-app duplicate stats. */
export function googleAnalyticsHref(): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_URL?.trim();
  if (!raw || (!raw.startsWith("https://") && !raw.startsWith("http://"))) {
    return DEFAULT_GOOGLE_ANALYTICS_HREF;
  }
  return raw;
}

/** Whether the pathname belongs to the admin area. */
export function isSupersudoRoute(pathname: string): boolean {
  return (
    pathname === SUPERSUDO_PATH ||
    pathname.startsWith(`${SUPERSUDO_PATH}/`)
  );
}
