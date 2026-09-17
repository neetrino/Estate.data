import { WEB_PAGES_PATH } from "@/shared/lib/routes";

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
