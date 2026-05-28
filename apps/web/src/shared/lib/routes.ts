/** Admin sign-in and panel — no marketing navbar/footer. */
export const SUPERSUDO_PATH = "/supersudo";

/** Contact page — forms, studio details, “Book a Shoot” CTAs. */
export const CONTACT_PATH = "/contact";

/** Pricing page — navbar + “View Pricing” CTAs. */
export const PRICING_PATH = "/pricing";

/** Canonical Data & BIM services route (navbar + CTAs). */
export const DATA_BIM_PATH = "/data-bim";

/** Legacy URL — kept for redirects and navbar active matching. */
export const DATA_BIM_LEGACY_PATH = "/services/data";

/** Whether `pathname` is the Data & BIM section (canonical or legacy). */
export function isDataBimRoute(pathname: string): boolean {
  return (
    pathname === DATA_BIM_PATH ||
    pathname === DATA_BIM_LEGACY_PATH ||
    pathname.startsWith(`${DATA_BIM_PATH}/`) ||
    pathname.startsWith(`${DATA_BIM_LEGACY_PATH}/`)
  );
}

/** Whether `pathname` is the admin (supersudo) area. */
export function isSupersudoRoute(pathname: string): boolean {
  return pathname === SUPERSUDO_PATH || pathname.startsWith(`${SUPERSUDO_PATH}/`);
}

/** Home + /services + /data-bim — soft footer top blend after photo / gradient sections. */
export function shouldFooterSmoothTopEntry(pathname: string): boolean {
  return pathname === "/" || pathname === "/services" || pathname === DATA_BIM_PATH;
}
