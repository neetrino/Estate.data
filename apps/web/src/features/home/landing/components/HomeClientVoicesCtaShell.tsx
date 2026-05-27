import "@/features/home/landing/styles/home-client-voices-cta-shell.css";

import type { ReactNode } from "react";

type HomeClientVoicesCtaShellProps = {
  clientVoices: ReactNode;
  listingCta: ReactNode;
};

export function HomeClientVoicesCtaShell({
  clientVoices,
  listingCta,
}: HomeClientVoicesCtaShellProps) {
  return (
    <div className="home-client-voices-cta-shell">
      {clientVoices}
      <div className="home-client-voices-cta-shell__listing">{listingCta}</div>
    </div>
  );
}
