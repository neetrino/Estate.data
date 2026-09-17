import { SUPERSUDO_PANEL_PATH } from "@/features/admin/lib/admin-paths";

function pathMatchesNavHref(pathname: string, href: string): boolean {
  if (href === SUPERSUDO_PANEL_PATH) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Exactly one sidebar item is current: longest matching href wins.
 * `/site-content/home-hero` must not also light up Site content.
 */
export function isAdminNavItemActive(
  pathname: string,
  href: string,
  allHrefs: readonly string[],
): boolean {
  const matching = allHrefs.filter((item) => pathMatchesNavHref(pathname, item));
  const longest = matching.reduce(
    (best, item) => (item.length > best.length ? item : best),
    "",
  );
  return longest === href;
}
