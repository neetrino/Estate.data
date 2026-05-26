import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import { HOME_WHAT_WE_DO_COPY } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceCard } from "@/features/home/components/WhatWeDoServiceCard";
import {
  HOME_MOBILE_OUTLINE_BUTTON_CLASS,
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import { LandingOutlineButtonLink } from "@/shared/ui/button";

const WHAT_WE_DO_BG_SOURCES = {
  mobile: "/images/what-we-do-bg-1024.webp",
  tablet: "/images/what-we-do-bg-1920.webp",
  desktop: "/images/what-we-do-bg-2560.webp",
} as const;

const WHAT_WE_DO_SECTION_CLASS = `relative overflow-hidden bg-landing-surface ${LANDING_SECTION_CLASS}`;

const WHAT_WE_DO_TITLE_CLASS =
  "text-3xl font-bold tracking-tight text-what-we-do-title sm:text-4xl md:text-5xl lg:text-[3rem]";

const WHAT_WE_DO_SUBTITLE_CLASS =
  "mt-4 max-w-3xl text-lg leading-relaxed text-what-we-do-subtitle sm:text-xl";

export function HomeWhatWeDo() {
  const { title, subtitleLines, services } = HOME_WHAT_WE_DO_COPY;
  const { secondaryCta } = HOME_HERO_COPY;

  return (
    <section
      className={WHAT_WE_DO_SECTION_CLASS}
      aria-labelledby="what-we-do-heading"
    >
      <WhatWeDoBackgroundPicture />
      <div className="home-what-we-do-photo-scrim pointer-events-none absolute inset-0" aria-hidden />

      <div className={`${LANDING_CONTAINER_CLASS} relative z-10`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] lg:items-start lg:gap-14">
          <header className="self-start lg:sticky lg:top-28">
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
            <LandingOutlineButtonLink
              href={secondaryCta.href}
              fullWidth
              gradient
              className={`mt-8 ${HOME_MOBILE_OUTLINE_BUTTON_CLASS}`}
              showArrow={false}
            >
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

function WhatWeDoBackgroundPicture() {
  return (
    <picture className="pointer-events-none absolute inset-0 block size-full" aria-hidden>
      <source media="(min-width: 1280px)" srcSet={WHAT_WE_DO_BG_SOURCES.desktop} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={WHAT_WE_DO_BG_SOURCES.tablet} type="image/webp" />
      <img
        src={WHAT_WE_DO_BG_SOURCES.mobile}
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        className="size-full object-cover object-left object-bottom"
      />
    </picture>
  );
}
