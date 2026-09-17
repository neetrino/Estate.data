import { MAIN_NAV_LINKS, SERVICE_NAV_LINKS } from "@/shared/components/navbar/navConfig";
import { WEB_PAGES_PATH } from "@/shared/lib/routes";

const TOP_LEVEL_NON_SERVICES_HREFS = new Set(
  MAIN_NAV_LINKS.filter((link) => link.label !== "Services").map((link) => link.href),
);

/** Whether `href` matches the current route (navbar + mobile drawer). */
export function isNavbarActivePath(
  pathname: string,
  href: string,
  hash = "",
): boolean {
  if (href === WEB_PAGES_PATH) {
    return pathname === WEB_PAGES_PATH;
  }

  if (href.startsWith("/#")) {
    if (pathname !== "/") {
      return false;
    }
    const sectionId = href.slice(2);
    return hash.replace("#", "") === sectionId;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Services trigger is active for in-dropdown sections that are not also
 * their own top-level tab (e.g. Scan-to-BIM).
 */
export function isServicesMenuActive(pathname: string, hash: string): boolean {
  return SERVICE_NAV_LINKS.some((service) => {
    if (TOP_LEVEL_NON_SERVICES_HREFS.has(service.href)) {
      return false;
    }
    return isNavbarActivePath(pathname, service.href, hash);
  });
}
