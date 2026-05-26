import Image from "next/image";
import {
  HOME_PROPERTY_INTELLIGENCE_COPY,
  PROPERTY_INTELLIGENCE_IMAGE_ALT,
  PROPERTY_INTELLIGENCE_IMAGE_PATH,
} from "@/features/home/content/propertyIntelligenceCopy";
import {
  HOME_MOBILE_LEFT_PILL_CLASS,
  LANDING_CONTAINER_CLASS,
  LANDING_GLASS_CARD_CLASS,
  LANDING_SECTION_ENTER_FROM_SURFACE_CLASS,
  LANDING_SECTION_MUTED_CLASS,
  LANDING_SECTION_SUBTITLE_CLASS,
  LANDING_SECTION_TITLE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  HOME_STATS_GRID_GAP_CLASS,
  PROPERTY_INTELLIGENCE_CTA_CLASS,
  PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const FEATURE_BULLET_CLASS = "mt-2 size-1.5 shrink-0 rounded-full bg-brand-cyan";

export function HomePropertyIntelligence() {
  const { eyebrow, title, description, features, ctaLabel, ctaHref } =
    HOME_PROPERTY_INTELLIGENCE_COPY;

  return (
    <section
      className={`${LANDING_SECTION_MUTED_CLASS} ${LANDING_SECTION_ENTER_FROM_SURFACE_CLASS}`}
      aria-labelledby="property-intelligence-heading"
    >
      <div className={LANDING_CONTAINER_CLASS}>
        <div
          className={`grid grid-cols-1 items-stretch lg:grid-cols-2 ${HOME_STATS_GRID_GAP_CLASS} lg:gap-12`}
        >
          <div className={`${LANDING_GLASS_CARD_CLASS} ${PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS}`}>
            <Image
              src={PROPERTY_INTELLIGENCE_IMAGE_PATH}
              alt={PROPERTY_INTELLIGENCE_IMAGE_ALT}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex min-h-full flex-col">
            <p className={PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
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
              <EstatePillButtonLink
                href={ctaHref}
                fullWidth
                className={`${PROPERTY_INTELLIGENCE_CTA_CLASS} ${HOME_MOBILE_LEFT_PILL_CLASS}`}
              >
                {ctaLabel}
              </EstatePillButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
