"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/shared/components/footer/SiteFooter";
import { isSupersudoRoute } from "@/shared/lib/routes";

/** Marketing footer — hidden on admin (`/supersudo`) routes. */
export function SiteFooterGate() {
  const pathname = usePathname();

  if (isSupersudoRoute(pathname)) {
    return null;
  }

  return <SiteFooter />;
}
