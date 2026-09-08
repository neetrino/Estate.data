import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { STUDIO_MATTERPORT_DEMO } from "@/features/home/content/studioPageCopy";
import { splitLeadParagraph } from "@/features/home/content/splitLeadParagraph";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioServiceActions } from "@/features/home/sections/StudioServiceActions";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

const MEDIA_DELAY_MS = 120;

type StudioMatterportSectionProps = {
  readonly service: StudioServiceContent;
};

/** Digital twins — copy and specs beside the dollhouse render, demo tour below. */
export function StudioMatterportSection({ service }: StudioMatterportSectionProps) {
  const { lead, rest } = splitLeadParagraph(service.description);

  return (
    <section id={HOME_SECTION_IDS.tours} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <StudioReveal className="lg:col-span-6">
            <StudioSectionLabel>{service.eyebrow}</StudioSectionLabel>
            <h2 className="studio-display-lg mt-6 text-studio-fg">{service.title}</h2>
            <p className="studio-body-lg mt-6 max-w-[50ch]">{lead}</p>
            {rest ? (
              <p className="mt-5 max-w-[50ch] text-sm leading-relaxed text-studio-muted">{rest}</p>
            ) : null}
            <div className="mt-10">
              <StudioFeatureList items={service.included} />
            </div>
          </StudioReveal>

          <StudioReveal className="lg:col-span-6" delay={MEDIA_DELAY_MS}>
            <div className="relative aspect-[4/3] overflow-hidden bg-studio-bg">
              <PublicAssetImage
                src={service.imageUrl}
                alt={STUDIO_MATTERPORT_DEMO.imageAlt}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="mt-10">
              <StudioPricingRows rows={service.pricing} />
            </div>
            <StudioServiceActions service={service} className="mt-8" />
          </StudioReveal>
        </div>

        <StudioReveal className="mt-20">
          <p className="studio-label mb-5 text-studio-muted">{STUDIO_MATTERPORT_DEMO.label}</p>
          <div className="aspect-video w-full overflow-hidden border border-studio-border bg-studio-bg">
            <iframe
              title={STUDIO_MATTERPORT_DEMO.title}
              src={STUDIO_MATTERPORT_DEMO.embedUrl}
              loading="lazy"
              allow="xr-spatial-tracking; fullscreen"
              allowFullScreen
              className="size-full border-0"
            />
          </div>
        </StudioReveal>
      </div>
    </section>
  );
}
