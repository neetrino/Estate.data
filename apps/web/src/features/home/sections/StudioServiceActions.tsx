"use client";

import { useState } from "react";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioExampleModal } from "@/features/home/sections/StudioExampleModal";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";
import { StudioViewExampleButton } from "@/features/home/sections/StudioViewExampleButton";
import { trackStudioEvent } from "@/shared/analytics/trackStudioEvent";

type StudioServiceActionsProps = {
  readonly service: StudioServiceContent;
  readonly className?: string;
};

/** Primary CTA plus View Example popup, shared by every service section. */
export function StudioServiceActions({ service, className = "" }: StudioServiceActionsProps) {
  const [open, setOpen] = useState(false);

  function openExample() {
    trackStudioEvent("service_click", { service: service.sectionKey, action: "gallery" });
    setOpen(true);
  }

  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`.trim()}>
      <StudioCta
        href={service.primaryCtaHref}
        onNavigate={() =>
          trackStudioEvent("service_click", { service: service.sectionKey, action: "primary" })
        }
      >
        {service.primaryCtaLabel}
      </StudioCta>
      <StudioViewExampleButton label={service.secondaryCtaLabel} onOpen={openExample} />
      {service.startingPrice ? (
        <StudioStartingAt price={service.startingPrice} unit={service.pricingUnit} />
      ) : null}
      {open ? <StudioExampleModal service={service} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
