import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";
import { splitStudioServiceEyebrow } from "@/features/home/sections/studioServiceEyebrow";
import { STUDIO_SERVICE_BLOCK_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_SCROLL_MARGIN_CLASS } from "@/shared/lib/homeSectionIds";

const MEDIA_CLASS = "relative aspect-[4/3] overflow-hidden bg-studio-bg";

const IMAGE_CLASS = "object-cover transition-transform duration-[1200ms] hover:scale-105";

const BADGE_CLASS = [
  "absolute left-0 top-0 z-10 bg-studio-bg/80 px-4 py-2",
  "font-display text-xs tracking-[0.3em] backdrop-blur-sm",
].join(" ");

type StudioServiceBlockProps = {
  readonly service: StudioServiceContent;
  readonly imageOnRight?: boolean;
};

export function StudioServiceBlock({ service, imageOnRight = false }: StudioServiceBlockProps) {
  const { badge, name } = splitStudioServiceEyebrow(service.eyebrow);

  return (
    <StudioReveal
      as="article"
      className={`grid gap-10 lg:grid-cols-12 lg:gap-16 ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
    >
      <div className={imageOnRight ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
        <div className={MEDIA_CLASS}>
          <PublicAssetImage
            src={service.imageUrl}
            alt={service.title}
            fill
            className={IMAGE_CLASS}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {badge ? <span className={BADGE_CLASS}>{badge}</span> : null}
        </div>
      </div>

      <div
        id={service.sectionKey}
        className={`${imageOnRight ? "lg:order-1 lg:col-span-6" : "lg:col-span-6"} ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
      >
        <p className="studio-label text-studio-accent">{name}</p>
        <h3 className="studio-display-md mt-5 max-w-[18ch] text-studio-fg">{service.title}</h3>
        <p className="studio-body-lg mt-5 max-w-[52ch]">{service.description}</p>

        <div className="mt-8">
          <p className="studio-label mb-4 text-studio-muted">
            {STUDIO_SERVICE_BLOCK_COPY.includedLabel}
          </p>
          <StudioFeatureList items={service.included} />
        </div>

        <div className="mt-10">
          <p className="studio-label mb-4 text-studio-muted">
            {STUDIO_SERVICE_BLOCK_COPY.pricingLabel}
          </p>
          <StudioPricingRows rows={service.pricing} />
        </div>

        {service.footnote ? (
          <p className="mt-8 max-w-[52ch] border-l border-studio-accent/50 pl-4 text-xs leading-relaxed text-studio-muted">
            {service.footnote}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <StudioCta href={service.primaryCtaHref}>{service.primaryCtaLabel}</StudioCta>
          {service.startingPrice ? (
            <StudioStartingAt price={service.startingPrice} unit={service.pricingUnit} />
          ) : null}
        </div>
      </div>
    </StudioReveal>
  );
}
