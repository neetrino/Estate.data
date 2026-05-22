import { DATA_BIM_PATH, isDataBimRoute } from "@/shared/lib/routes";

/** Whether `href` matches the current route (navbar + mobile drawer). */
export function isNavbarActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === DATA_BIM_PATH) {
    return isDataBimRoute(pathname);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
