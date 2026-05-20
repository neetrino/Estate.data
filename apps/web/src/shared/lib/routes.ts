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
