import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HOME_SECTION_IDS, homeSectionHref } from "@/shared/lib/homeSectionIds";

const GRID_DELAY_MS = 120;

const EXAMPLE_LINK_CLASS = [
  "group inline-flex items-center gap-3 border-b border-studio-accent/50 pb-1",
  "text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-studio-accent",
  "transition-colors hover:border-studio-accent hover:text-studio-fg",
].join(" ");

const EXAMPLE_ARROW_CLASS =
  "inline-block transition-transform duration-500 group-hover:translate-x-1";

type StudioAiMediaSectionProps = {
  readonly service: StudioServiceContent;
};

function featureNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

function AiFeatureGrid({ items }: { readonly items: readonly string[] }) {
  return (
    <div className="grid gap-px bg-studio-border sm:grid-cols-2">
      {items.map((feature, index) => (
        <div key={feature} className="bg-studio-bg p-6">
          <span className="studio-label text-studio-accent">{featureNumber(index)}</span>
          <p className="mt-4 text-sm text-studio-fg">{feature}</p>
        </div>
      ))}
    </div>
  );
}

/** Generative production — copy and numbered capability grid, no photo. */
export function StudioAiMediaSection({ service }: StudioAiMediaSectionProps) {
  return (
    <section
      id={HOME_SECTION_IDS.aiMedia}
      className={`${STUDIO_LIGHT_SECTION_CLASS} overflow-hidden border-t border-studio-border`}
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-5">
          <StudioSectionLabel>{service.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{service.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[48ch]">{service.description}</p>
          <div className="mt-10">
            <StudioPricingRows rows={service.pricing} />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <StudioCta href={service.primaryCtaHref}>{service.primaryCtaLabel}</StudioCta>
            <HomeSectionLink
              href={homeSectionHref(HOME_SECTION_IDS.portfolio)}
              className={EXAMPLE_LINK_CLASS}
            >
              {service.secondaryCtaLabel}
              <span aria-hidden className={EXAMPLE_ARROW_CLASS}>
                ↗
              </span>
            </HomeSectionLink>
          </div>
          {service.footnote ? (
            <p className="mt-8 max-w-[52ch] border-l border-studio-accent/50 pl-4 text-xs leading-relaxed text-studio-muted">
              {service.footnote}
            </p>
          ) : null}
        </StudioReveal>

        <StudioReveal className="lg:col-span-7" delay={GRID_DELAY_MS}>
          <AiFeatureGrid items={service.included} />
        </StudioReveal>
      </div>
    </section>
  );
}
