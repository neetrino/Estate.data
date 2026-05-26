"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/shared/components/navbar/Navbar";
import { isSupersudoRoute } from "@/shared/lib/routes";

type SiteChromeProps = {
  children: ReactNode;
};

/** Global landing pill navbar + page content. */
export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  if (isSupersudoRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar overlay={pathname === "/"} landingPill />
      {children}
    </>
  );
}
