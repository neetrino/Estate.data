import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { STUDIO_SCAN_TO_BIM } from "@/features/home/content/studioPageCopy";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioPricingRows } from "@/features/home/sections/StudioPricingRows";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioServiceActions } from "@/features/home/sections/StudioServiceActions";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

const CHAIN_STEP_CLASS =
  "border border-studio-border px-5 py-3 font-display text-xs uppercase tracking-[0.24em]";

const FACTOR_CLASS = "border border-studio-border px-3 py-1.5 text-xs text-studio-muted";

const MEDIA_DELAY_MS = 100;

const COLUMN_DELAY_STEP_MS = 80;

type StudioScanToBimSectionProps = {
  readonly service: StudioServiceContent;
};

function ChainDiagram() {
  const steps = STUDIO_SCAN_TO_BIM.chain;

  return (
    <StudioReveal className="mt-20 overflow-x-auto">
      <div className="flex min-w-max items-center gap-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-4">
            <span className={CHAIN_STEP_CLASS}>{step}</span>
            {index < steps.length - 1 ? (
              <span aria-hidden className="text-studio-accent">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </StudioReveal>
  );
}

/** Reality capture — process chain, deliverables and pricing factors. */
export function StudioScanToBimSection({ service }: StudioScanToBimSectionProps) {
  const copy = STUDIO_SCAN_TO_BIM;

  return (
    <section
      id={HOME_SECTION_IDS.scanToBim}
      className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={STUDIO_CONTAINER_CLASS}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <StudioReveal className="lg:col-span-5">
            <StudioSectionLabel>{service.eyebrow}</StudioSectionLabel>
            <h2 className="studio-display-lg mt-6 text-studio-fg">{service.title}</h2>
            <p className="studio-body-lg mt-6 max-w-[46ch]">{service.description}</p>
            <StudioServiceActions service={service} className="mt-10" />
          </StudioReveal>
          <StudioReveal className="lg:col-span-7" delay={MEDIA_DELAY_MS}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <PublicAssetImage
                src={service.imageUrl}
                alt={copy.imageAlt}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </StudioReveal>
        </div>

        <ChainDiagram />

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <StudioReveal className="lg:col-span-4">
            <p className="studio-label mb-6 text-studio-muted">{copy.workflowLabel}</p>
            <ol className="space-y-4">
              {copy.workflow.map((entry) => (
                <li
                  key={entry.step}
                  className="flex gap-5 border-b border-studio-border pb-4"
                >
                  <span className="font-display text-xs text-studio-accent">{entry.step}</span>
                  <span className="text-sm text-studio-fg">{entry.label}</span>
                </li>
              ))}
            </ol>
          </StudioReveal>

          <StudioReveal className="lg:col-span-4" delay={COLUMN_DELAY_STEP_MS}>
            <p className="studio-label mb-6 text-studio-muted">{copy.deliverablesLabel}</p>
            <StudioFeatureList items={copy.deliverables} columns={1} />
          </StudioReveal>

          <StudioReveal className="lg:col-span-4" delay={COLUMN_DELAY_STEP_MS * 2}>
            <p className="studio-label mb-6 text-studio-muted">{copy.pricingLabel}</p>
            <StudioPricingRows rows={service.pricing} />
            <p className="mt-8 text-xs uppercase tracking-[0.16em] text-studio-muted">
              {copy.pricingFactorsLabel}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {copy.pricingFactors.map((factor) => (
                <li key={factor} className={FACTOR_CLASS}>
                  {factor}
                </li>
              ))}
            </ul>
          </StudioReveal>
        </div>
      </div>
    </section>
  );
}
