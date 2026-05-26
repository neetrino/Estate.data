"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/shared/components/navbar/Navbar";

type SiteChromeProps = {
  children: ReactNode;
};

/** Global landing pill navbar + page content. */
export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();

  return (
    <>
      <Navbar overlay={pathname === "/"} landingPill />
      {children}
    </>
  );
}
