/** Admin sign-in and panel — no marketing navbar/footer. */
export const SUPERSUDO_PATH = "/supersudo";

/** Separate Web Pages marketing route (property websites). */
export const WEB_PAGES_PATH = "/web-pages";

/** Whether `pathname` is the admin (supersudo) area. */
export function isSupersudoRoute(pathname: string): boolean {
  return pathname === SUPERSUDO_PATH || pathname.startsWith(`${SUPERSUDO_PATH}/`);
}

/** Home + /web-pages — soft footer top blend after photo / gradient sections. */
export function shouldFooterSmoothTopEntry(pathname: string): boolean {
  return pathname === "/" || pathname === WEB_PAGES_PATH;
}
