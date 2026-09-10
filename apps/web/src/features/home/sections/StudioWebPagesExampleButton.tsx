"use client";

import { useState } from "react";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioExampleModal } from "@/features/home/sections/StudioExampleModal";
import { StudioViewExampleButton } from "@/features/home/sections/StudioViewExampleButton";
import { HOME_SECTION_IDS, homeSectionHref } from "@/shared/lib/homeSectionIds";

const WEB_PAGES_EXAMPLE_SERVICE = {
  sectionKey: HOME_SECTION_IDS.webPagesTeaser,
  eyebrow: "Property websites",
  title: STUDIO_PAGE_COPY.webPages.title,
  description: STUDIO_PAGE_COPY.webPages.body,
  imageUrl: STUDIO_MEDIA.landingPage,
  included: STUDIO_PAGE_COPY.webPages.included,
  primaryCtaHref: homeSectionHref(HOME_SECTION_IDS.quote),
} as const;

/** View Example control for the landing-pages teaser — opens the shared example dialog. */
export function StudioWebPagesExampleButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StudioViewExampleButton label="View Example" onOpen={() => setOpen(true)} />
      {open ? (
        <StudioExampleModal
          service={WEB_PAGES_EXAMPLE_SERVICE}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
