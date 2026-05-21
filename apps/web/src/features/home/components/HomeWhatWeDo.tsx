import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import { HOME_WHAT_WE_DO_COPY } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceCard } from "@/features/home/components/WhatWeDoServiceCard";
import { LANDING_CONTAINER_CLASS } from "@/features/home/landing/lib/landingStyles";
import { WHAT_WE_DO_SECTION_SURFACE_CLASS } from "@/shared/lib/constants";
import { LandingOutlineButtonLink } from "@/shared/ui/button";

const WHAT_WE_DO_TITLE_CLASS =
  "text-3xl font-bold tracking-tight text-what-we-do-title sm:text-4xl md:text-5xl lg:text-[3rem]";

const WHAT_WE_DO_SUBTITLE_CLASS =
  "mt-4 max-w-3xl text-lg leading-relaxed text-what-we-do-subtitle sm:text-xl";

export function HomeWhatWeDo() {
  const { title, subtitleLines, services } = HOME_WHAT_WE_DO_COPY;
  const { secondaryCta } = HOME_HERO_COPY;

  return (
    <section
      className={WHAT_WE_DO_SECTION_SURFACE_CLASS}
      aria-labelledby="what-we-do-heading"
    >
      <div className={LANDING_CONTAINER_CLASS}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] lg:items-start lg:gap-14">
          <header className="lg:sticky lg:top-28">
            <h2 id="what-we-do-heading" className={WHAT_WE_DO_TITLE_CLASS}>
              {title}
            </h2>
            <p className={WHAT_WE_DO_SUBTITLE_CLASS}>
              {subtitleLines.map((line, index) => (
                <span key={line} className={index === 0 ? "font-bold" : undefined}>
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
            {services.map((service) => (
              <li key={service.id} className="min-w-0">
                <WhatWeDoServiceCard service={service} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
