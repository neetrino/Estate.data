"use client";

import { useState } from "react";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioExampleModal } from "@/features/home/sections/StudioExampleModal";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";
import { StudioViewExampleButton } from "@/features/home/sections/StudioViewExampleButton";

type StudioServiceActionsProps = {
  readonly service: StudioServiceContent;
  readonly className?: string;
};

/** Primary CTA plus the gallery link and its lightbox, shared by every service section. */
export function StudioServiceActions({ service, className = "" }: StudioServiceActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`.trim()}>
      <StudioCta href={service.primaryCtaHref}>{service.primaryCtaLabel}</StudioCta>
      <StudioViewExampleButton
        label={service.secondaryCtaLabel}
        onOpen={() => setOpen(true)}
      />
      {service.startingPrice ? (
        <StudioStartingAt price={service.startingPrice} unit={service.pricingUnit} />
      ) : null}
      {open ? (
        <StudioExampleModal service={service} onClose={() => setOpen(false)} />
      ) : null}
    </div>
  );
}
