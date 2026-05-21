import Image from "next/image";
import {
  HOME_PROPERTY_INTELLIGENCE_COPY,
  PROPERTY_INTELLIGENCE_IMAGE_ALT,
  PROPERTY_INTELLIGENCE_IMAGE_PATH,
} from "@/features/home/content/propertyIntelligenceCopy";
import {
  HOME_STATS_GRID_GAP_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  SECTION_VERTICAL_PADDING_CLASS,
  PROPERTY_INTELLIGENCE_CTA_CLASS,
  PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const PROPERTY_INTELLIGENCE_EYEBROW_CLASS =
  "text-lg font-semibold tracking-tight text-property-intelligence-accent sm:text-xl";

const PROPERTY_INTELLIGENCE_TITLE_CLASS =
  "mt-2 text-3xl font-bold tracking-tight text-property-intelligence-navy sm:text-4xl md:text-[2rem]";

const PROPERTY_INTELLIGENCE_DESCRIPTION_CLASS =
  "mt-4 text-base leading-relaxed text-property-intelligence-navy";

const PROPERTY_INTELLIGENCE_FEATURE_CLASS =
  "text-sm leading-relaxed text-property-intelligence-navy sm:text-base";

export function HomePropertyIntelligence() {
  const { eyebrow, title, description, features, ctaLabel, ctaHref } =
    HOME_PROPERTY_INTELLIGENCE_COPY;

  return (
    <section
      className={`bg-what-we-do-surface ${SECTION_VERTICAL_PADDING_CLASS}`}
      aria-labelledby="property-intelligence-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <div
          className={`grid grid-cols-1 items-center lg:grid-cols-2 ${HOME_STATS_GRID_GAP_CLASS} lg:gap-12`}
        >
          <div
            className={`relative w-full overflow-hidden rounded-2xl ${PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS}`}
          >
            <Image
              src={PROPERTY_INTELLIGENCE_IMAGE_PATH}
              alt={PROPERTY_INTELLIGENCE_IMAGE_ALT}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div>
            <p className={PROPERTY_INTELLIGENCE_EYEBROW_CLASS}>{eyebrow}</p>
            <h2
              id="property-intelligence-heading"
              className={PROPERTY_INTELLIGENCE_TITLE_CLASS}
            >
              {title}
            </h2>
            <p className={PROPERTY_INTELLIGENCE_DESCRIPTION_CLASS}>
              {description}
            </p>
            <ul className="mt-6 space-y-2.5">
              {features.map((feature) => (
                <li
                  key={feature}
                  className={`flex gap-3 ${PROPERTY_INTELLIGENCE_FEATURE_CLASS}`}
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-property-intelligence-accent"
                    aria-hidden
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-start">
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
