"use client";

import { useState } from "react";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { MediaLightbox } from "@/shared/components/media/MediaLightbox";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioViewExampleButton } from "@/features/home/sections/StudioViewExampleButton";

type StudioServiceActionsProps = {
  readonly service: StudioServiceContent;
  readonly className?: string;
};

/** Primary CTA plus the gallery link and its lightbox, shared by every service section. */
export function StudioServiceActions({ service, className = "" }: StudioServiceActionsProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className={`flex flex-wrap items-center gap-6 ${className}`.trim()}>
      <StudioCta href={service.primaryCtaHref}>{service.primaryCtaLabel}</StudioCta>
      <StudioViewExampleButton
        label={service.secondaryCtaLabel}
        onOpen={() => {
          setIndex(0);
          setOpen(true);
        }}
      />
      {open ? (
        <MediaLightbox
          images={service.galleryUrls}
          alt={service.title}
          activeIndex={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
