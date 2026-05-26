/** Hidden admin login route — not linked from public navigation. */
export const SUPERSUDO_PATH = "/supersudo";

/** Admin dashboard after successful login. */
export const SUPERSUDO_PANEL_PATH = "/supersudo/panel";

/** Whether the pathname belongs to the admin area. */
export function isSupersudoRoute(pathname: string): boolean {
  return (
    pathname === SUPERSUDO_PATH ||
    pathname.startsWith(`${SUPERSUDO_PATH}/`)
  );
}
