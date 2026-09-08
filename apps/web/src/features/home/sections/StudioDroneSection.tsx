import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioServiceActions } from "@/features/home/sections/StudioServiceActions";
import { HOME_SECTION_IDS, HOME_SECTION_SCROLL_MARGIN_CLASS } from "@/shared/lib/homeSectionIds";

const CONTAINER_CLASS =
  "relative mx-auto w-full max-w-[1400px] px-6 py-28 md:px-10 md:py-36 lg:px-16";

const PRICING_DELAY_MS = 120;

type StudioDroneSectionProps = {
  readonly service: StudioServiceContent;
};

/** Full-bleed aerial section — the artwork is the background, not a side image. */
export function StudioDroneSection({ service }: StudioDroneSectionProps) {
  return (
    <section
      id={HOME_SECTION_IDS.drone}
      className={`relative overflow-hidden ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
    >
      <div className="absolute inset-0">
        <PublicAssetImage
          src={service.imageUrl}
          alt={service.title}
          fill
          loading="lazy"
          className="studio-kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-studio-bg/70" />
      </div>

      <div className={CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{service.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[20ch] text-studio-fg">{service.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[52ch] text-studio-fg/80">
            {service.description}
          </p>
        </StudioReveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <StudioReveal className="lg:col-span-6">
            <StudioFeatureList items={service.included} />
          </StudioReveal>
          <StudioReveal className="lg:col-span-6" delay={PRICING_DELAY_MS}>
            <StudioPricingRows rows={service.pricing} />
            <StudioServiceActions service={service} className="mt-8" />
          </StudioReveal>
        </div>

        {service.footnote ? (
          <p className="mt-14 max-w-[60ch] text-xs leading-relaxed text-studio-muted">
            {service.footnote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
