import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import { HOME_WHAT_WE_DO_COPY } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceCardsGrid } from "@/features/home/components/WhatWeDoServiceCardsGrid";
import { LandingSectionBlend } from "@/features/home/landing/components/LandingSectionBlend";
import {
  HOME_MOBILE_BOOK_SHOOT_PILL_CLASS,
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
  WHAT_WE_DO_CTA_ICON_DISC_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const WHAT_WE_DO_BG_SOURCES = {
  mobile: "/images/what-we-do-bg-1024.webp",
  tablet: "/images/what-we-do-bg-1920.webp",
  desktop: "/images/what-we-do-bg-2560.webp",
} as const;

const WHAT_WE_DO_SECTION_CLASS = `relative isolate z-30 ${LANDING_SECTION_CLASS}`;

const WHAT_WE_DO_STICKY_HEADER_CLASS = "relative z-20 self-start lg:sticky lg:top-28";

const WHAT_WE_DO_TITLE_CLASS =
  "hero-headline-gradient text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[3rem]";

const WHAT_WE_DO_SUBTITLE_CLASS =
  "mt-4 max-w-3xl text-lg leading-relaxed text-brand-navy sm:text-xl";

export function HomeWhatWeDo() {
  const { title, subtitleLines, services } = HOME_WHAT_WE_DO_COPY;
  const { secondaryCta } = HOME_HERO_COPY;

  return (
    <section
      className={WHAT_WE_DO_SECTION_CLASS}
      aria-labelledby="what-we-do-heading"
    >
      <WhatWeDoBackgroundLayer />

      <div className={`${LANDING_CONTAINER_CLASS} relative z-10`}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_1.15fr] lg:items-start lg:gap-14">
          <header className={WHAT_WE_DO_STICKY_HEADER_CLASS}>
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
            <EstatePillButtonLink
              href={secondaryCta.href}
              fullWidth
              className={[
                "mt-8",
                HOME_MOBILE_BOOK_SHOOT_PILL_CLASS,
                LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
                LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
                WHAT_WE_DO_CTA_ICON_DISC_CLASS,
              ].join(" ")}
            >
              {secondaryCta.label}
            </EstatePillButtonLink>
          </header>

          <WhatWeDoServiceCardsGrid services={services} />
        </div>
      </div>
    </section>
  );
}

function WhatWeDoBackgroundLayer() {
  return (
    <div
      className="home-what-we-do-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <WhatWeDoBackgroundPicture />
      <LandingSectionBlend edge="top" tone="soft" />
      <LandingSectionBlend edge="bottom" tone="soft" />
      <div className="home-what-we-do-photo-scrim absolute inset-0" />
    </div>
  );
}

function WhatWeDoBackgroundPicture() {
  return (
    <picture className="absolute inset-0 block size-full min-h-full">
      <source media="(min-width: 1280px)" srcSet={WHAT_WE_DO_BG_SOURCES.desktop} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={WHAT_WE_DO_BG_SOURCES.tablet} type="image/webp" />
      <img
        src={WHAT_WE_DO_BG_SOURCES.mobile}
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        className="home-what-we-do-bg-image size-full min-h-full"
      />
    </picture>
  );
}
