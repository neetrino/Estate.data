import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import Image from "next/image";

const CARD_DELAY_STEP_MS = 80;

const MEDIA_DELAY_MS = 120;

export function StudioOfferings() {
  const copy = STUDIO_PAGE_COPY.offerings;

  return (
    <section className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[18ch] text-studio-fg">{copy.title}</h2>
        </StudioReveal>
        <ul className="mt-16 grid gap-px bg-studio-border md:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item, index) => (
            <StudioReveal
              key={item.id}
              as="li"
              delay={index * CARD_DELAY_STEP_MS}
              className="bg-studio-bg p-8 lg:p-10"
            >
              <span className="studio-label text-studio-muted">{item.id}</span>
              <h3 className="studio-display-md mt-8 text-studio-fg">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-studio-muted">{item.body}</p>
            </StudioReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StudioWebPagesTeaser() {
  const copy = STUDIO_PAGE_COPY.webPages;

  return (
    <section
      id={HOME_SECTION_IDS.webPagesTeaser}
      className={`${STUDIO_MUTED_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-6">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[18ch] text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[50ch]">{copy.body}</p>
          <div className="mt-10">
            <p className="studio-label mb-4 text-studio-muted">{copy.includedLabel}</p>
            <StudioFeatureList items={copy.included} />
          </div>
        </StudioReveal>
        <StudioReveal className="lg:col-span-6" delay={MEDIA_DELAY_MS}>
          <div className="relative aspect-[4/3] overflow-hidden bg-studio-bg">
            <Image
              src={STUDIO_MEDIA.landingPage}
              alt="Single-property real estate landing page shown on a laptop and phone"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="mt-10">
            <StudioPricingRows rows={copy.pricing} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <StudioCta href={copy.href}>{copy.ctaLabel}</StudioCta>
            <StudioStartingAt price={copy.startingPrice} />
          </div>
        </StudioReveal>
      </div>
    </section>
  );
}
