"use client";

import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { Navbar } from "@/shared/components/navbar/Navbar";
import { ScrollToHomeSection } from "@/shared/components/navbar/ScrollToHomeSection";
import { isSupersudoRoute } from "@/shared/lib/routes";

type SiteChromeProps = {
  children: ReactNode;
  brandName?: string;
  brandKicker?: string;
};

/** Global landing pill navbar + page content. */
export function SiteChrome({ children, brandName, brandKicker }: SiteChromeProps) {
  const pathname = usePathname();

  if (isSupersudoRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar overlay={pathname === "/"} brandName={brandName} brandKicker={brandKicker} />
      <Suspense fallback={null}>
        <ScrollToHomeSection />
      </Suspense>
      {children}
    </>
  );
}
