import type { ReactNode } from "react";
import { getBrandCopy } from "@/server/features/site-copy/get-site-copy";
import { SiteChrome } from "@/shared/components/navbar/SiteChrome";

type SiteChromeGateProps = {
  readonly children: ReactNode;
};

/** Loads CMS brand copy for the public navbar. */
export async function SiteChromeGate({ children }: SiteChromeGateProps) {
  const brand = await getBrandCopy();
  return (
    <SiteChrome brandName={brand.name} brandKicker={brand.kicker}>
      {children}
    </SiteChrome>
  );
}
