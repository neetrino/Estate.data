import {
  HOME_PROPERTY_INTELLIGENCE_COPY,
} from "@/features/home/content/propertyIntelligenceCopy";
import { ScanToBimBuildingAnimation } from "@/features/home/components/ScanToBimBuildingAnimation";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_EYEBROW_CLASS,
  LANDING_GLASS_CARD_CLASS,
  LANDING_SECTION_MUTED_CLASS,
  LANDING_SECTION_SUBTITLE_CLASS,
  LANDING_SECTION_TITLE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  HOME_STATS_GRID_GAP_CLASS,
  PROPERTY_INTELLIGENCE_CTA_CLASS,
  PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const FEATURE_BULLET_CLASS = "mt-2 size-1.5 shrink-0 rounded-full bg-brand-cyan";

export function HomePropertyIntelligence() {
  const { eyebrow, title, description, features, ctaLabel, ctaHref } =
    HOME_PROPERTY_INTELLIGENCE_COPY;

  return (
    <section className={LANDING_SECTION_MUTED_CLASS} aria-labelledby="property-intelligence-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <div
          className={`grid grid-cols-1 items-stretch lg:grid-cols-2 ${HOME_STATS_GRID_GAP_CLASS} lg:gap-12`}
        >
          <div className={`${LANDING_GLASS_CARD_CLASS} ${PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS}`}>
            <ScanToBimBuildingAnimation />
          </div>

          <div className="flex min-h-full flex-col">
            <p className={LANDING_EYEBROW_CLASS}>{eyebrow}</p>
            <h2 id="property-intelligence-heading" className={`mt-3 ${LANDING_SECTION_TITLE_CLASS}`}>
              {title}
            </h2>
            <p className={LANDING_SECTION_SUBTITLE_CLASS}>{description}</p>
            <ul className="mt-6 space-y-2.5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm leading-relaxed text-brand-navy sm:text-base"
                >
                  <span className={FEATURE_BULLET_CLASS} aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 lg:mt-auto lg:pt-6">
              <EstatePillButtonLink href={ctaHref} className={PROPERTY_INTELLIGENCE_CTA_CLASS}>
                {ctaLabel}
              </EstatePillButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
