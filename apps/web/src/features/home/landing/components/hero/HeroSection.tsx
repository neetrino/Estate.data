import { HeroActions } from "@/features/home/landing/components/hero/HeroActions";
import { HeroCopy } from "@/features/home/landing/components/hero/HeroCopy";
import { HeroFeatures } from "@/features/home/landing/components/hero/HeroFeatures";
import { HeroDashboard } from "@/features/home/landing/components/hero/dashboard/HeroDashboard";
import { TrustedLogos } from "@/features/home/landing/components/hero/TrustedLogos";
import {
  HOME_LANDING_HERO_COPY_COLUMN_CLASS,
  HOME_LANDING_HERO_COPY_TOP_CLASS,
  HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS,
  HOME_LANDING_HERO_GRID_CLASS,
  HOME_LANDING_HERO_INNER_CLASS,
  HOME_LANDING_HERO_TOP_PADDING_CLASS,
  HOME_LANDING_HERO_VIEWPORT_CLASS,
  HOME_LANDING_TRUST_BELOW_HERO_CLASS,
  LANDING_CONTAINER_CLASS,
} from "@/features/home/landing/lib/landingStyles";

const HERO_BG_SOURCES = {
  mobile: "/images/hero-landing-bg-1024.webp",
  tablet: "/images/hero-landing-bg-1920.webp",
  desktop: "/images/hero-landing-bg-2560.webp",
} as const;

export function HeroSection() {
  return (
    <>
      <section
        className={`relative flex flex-col overflow-x-clip bg-landing-surface ${HOME_LANDING_HERO_VIEWPORT_CLASS} ${HOME_LANDING_HERO_TOP_PADDING_CLASS}`}
      >
        <HeroBackgroundPicture />
        <div className="home-landing-hero-photo-scrim pointer-events-none absolute inset-0" aria-hidden />

        <div className={`${LANDING_CONTAINER_CLASS} ${HOME_LANDING_HERO_INNER_CLASS}`}>
          <div className={HOME_LANDING_HERO_GRID_CLASS}>
            <div className={HOME_LANDING_HERO_COPY_COLUMN_CLASS}>
              <div className={HOME_LANDING_HERO_COPY_TOP_CLASS}>
                <HeroCopy />
                <HeroActions />
              </div>
              <HeroFeatures />
            </div>

            <div className={HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS}>
              <HeroDashboard />
            </div>
          </div>
        </div>
      </section>

      <div className={`${LANDING_CONTAINER_CLASS} ${HOME_LANDING_TRUST_BELOW_HERO_CLASS}`}>
        <TrustedLogos />
      </div>
    </>
  );
}

function HeroBackgroundPicture() {
  return (
    <picture className="pointer-events-none absolute inset-0 block size-full">
      <source media="(min-width: 1280px)" srcSet={HERO_BG_SOURCES.desktop} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={HERO_BG_SOURCES.tablet} type="image/webp" />
      <img
        src={HERO_BG_SOURCES.mobile}
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        fetchPriority="high"
        className="size-full object-cover object-center"
      />
    </picture>
  );
}
