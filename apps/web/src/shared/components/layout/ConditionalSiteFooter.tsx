"use client";

import { isSupersudoRoute } from "@/features/admin/lib/admin-paths";
import { SiteFooter } from "@/shared/components/footer";
import { usePathname } from "next/navigation";

/** Hide marketing footer on hidden admin routes. */
export function ConditionalSiteFooter() {
  const pathname = usePathname();

  if (isSupersudoRoute(pathname)) {
    return null;
  }

  return <SiteFooter />;
}
