import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_PAGE_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import type { WebPagesCopy } from "@/server/features/site-copy/site-copy.schema";
import Image from "next/image";

type WebPagesPageProps = {
  readonly copy: WebPagesCopy;
};

/** The one extra public route on the one-page site. */
export function WebPagesPage({ copy }: WebPagesPageProps) {
  return (
    <div className={STUDIO_PAGE_CLASS}>
      <main className={`${STUDIO_CONTAINER_CLASS} grid gap-12 py-28 lg:grid-cols-12 lg:gap-16`}>
        <div className="lg:col-span-6">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h1 className="studio-display-lg mt-6 max-w-[18ch] text-studio-fg">{copy.title}</h1>
          <p className="studio-body-lg mt-6 max-w-[50ch]">{copy.body}</p>
          <div className="mt-10">
            <p className="studio-label mb-4 text-studio-muted">{copy.includedLabel}</p>
            <StudioFeatureList items={copy.included} />
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-studio-bg">
            <Image
              src={STUDIO_MEDIA.landingPage}
              alt="Single-property real estate web page shown on a laptop and phone"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="mt-10">
            <StudioPricingRows rows={copy.pricing} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <StudioCta href={STUDIO_PAGE_COPY.contactHref}>{copy.ctaLabel}</StudioCta>
            <StudioStartingAt price={copy.startingPrice} />
          </div>
        </div>
      </main>
    </div>
  );
}
