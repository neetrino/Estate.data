import { HeroActions } from "@/features/home/landing/components/hero/HeroActions";
import { HeroCopy } from "@/features/home/landing/components/hero/HeroCopy";
import { HeroFeatures } from "@/features/home/landing/components/hero/HeroFeatures";
import { HeroDashboard } from "@/features/home/landing/components/hero/dashboard/HeroDashboard";
import { TrustedLogos } from "@/features/home/landing/components/hero/TrustedLogos";
import { HeroTrustBridgeBackground } from "@/features/home/landing/components/hero/HeroTrustBridgeBackground";
import { LandingSectionBlend } from "@/features/home/landing/components/LandingSectionBlend";
import { HERO_LANDING_BG_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";
import {
  HOME_LANDING_HERO_CONTAINER_CLASS,
  HOME_LANDING_HERO_COPY_COLUMN_CLASS,
  HOME_LANDING_HERO_COPY_TOP_CLASS,
  HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS,
  HOME_LANDING_HERO_GRID_CLASS,
  HOME_LANDING_HERO_INNER_CLASS,
  HOME_LANDING_HERO_TOP_PADDING_CLASS,
  HOME_LANDING_HERO_VIEWPORT_CLASS,
  HOME_LANDING_TRUST_BELOW_HERO_CLASS,
  HOME_LANDING_TRUST_BRIDGE_CLASS,
  LANDING_CONTAINER_CLASS,
} from "@/features/home/landing/lib/landingStyles";

export function HeroSection() {
  return (
    <>
      <section
        className={`home-landing-hero-shell relative flex flex-col overflow-x-clip bg-landing-surface ${HOME_LANDING_HERO_VIEWPORT_CLASS} ${HOME_LANDING_HERO_TOP_PADDING_CLASS}`}
      >
        <HeroBackgroundPicture />
        <div className="home-landing-hero-photo-scrim pointer-events-none absolute inset-0" aria-hidden />
        <div className="hidden md:block">
          <LandingSectionBlend edge="bottom" tone="surface" />
        </div>

        <div className={`home-landing-hero-inner ${HOME_LANDING_HERO_CONTAINER_CLASS} ${HOME_LANDING_HERO_INNER_CLASS}`}>
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

      <div className={HOME_LANDING_TRUST_BRIDGE_CLASS}>
        <HeroTrustBridgeBackground />
        <div className={`home-landing-trust-below-hero-shell ${LANDING_CONTAINER_CLASS} ${HOME_LANDING_TRUST_BELOW_HERO_CLASS}`}>
          <TrustedLogos />
        </div>
      </div>
    </>
  );
}

function HeroBackgroundPicture() {
  return (
    <div className="pointer-events-none absolute inset-0 size-full" aria-hidden>
      <picture className="block size-full">
        <source media="(min-width: 1280px)" srcSet={HERO_LANDING_BG_SOURCES.desktop} type="image/webp" />
        <source media="(min-width: 768px)" srcSet={HERO_LANDING_BG_SOURCES.tablet} type="image/webp" />
        <img
          src={HERO_LANDING_BG_SOURCES.mobile}
          alt=""
          width={2560}
          height={1440}
          decoding="async"
          fetchPriority="high"
          className="home-landing-hero-background-image size-full object-cover object-center"
        />
      </picture>
    </div>
  );
}
