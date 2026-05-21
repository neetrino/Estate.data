import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import { HOME_WHAT_WE_DO_COPY } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceCard } from "@/features/home/components/WhatWeDoServiceCard";
import {
  homeLandingAccentAt,
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_SUBTITLE_CLASS,
  LANDING_SECTION_TITLE_CLASS,
  LANDING_SECTION_WHITE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import { LandingOutlineButtonLink } from "@/shared/ui/button";

export function HomeWhatWeDo() {
  const { title, subtitleLines, services } = HOME_WHAT_WE_DO_COPY;
  const { secondaryCta } = HOME_HERO_COPY;

  return (
    <section className={LANDING_SECTION_WHITE_CLASS} aria-labelledby="what-we-do-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] lg:items-start lg:gap-14">
          <header className="lg:sticky lg:top-28">
            <h2 id="what-we-do-heading" className={LANDING_SECTION_TITLE_CLASS}>
              {title}
            </h2>
            <p className={LANDING_SECTION_SUBTITLE_CLASS}>
              {subtitleLines.map((line, index) => (
                <span key={line} className={index === 0 ? "font-semibold text-brand-navy" : undefined}>
                  {line}
                  {index < subtitleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
            <LandingOutlineButtonLink href={secondaryCta.href} className="mt-8" showArrow={false}>
              {secondaryCta.label}
            </LandingOutlineButtonLink>
          </header>

          <ul className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.id} className="min-w-0">
                <WhatWeDoServiceCard service={service} accent={homeLandingAccentAt(index)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
