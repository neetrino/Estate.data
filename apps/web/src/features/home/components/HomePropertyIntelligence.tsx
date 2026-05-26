import { HomePropertyIntelligenceContentCard } from "@/features/home/components/HomePropertyIntelligenceContentCard";
import { HomePropertyIntelligenceVisual } from "@/features/home/components/HomePropertyIntelligenceVisual";
import { LandingSectionBlend } from "@/features/home/landing/components/LandingSectionBlend";
import { HOME_PROPERTY_INTELLIGENCE_BG_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import "@/features/home/styles/home-property-intelligence-section.css";
import { HOME_STATS_GRID_GAP_CLASS } from "@/shared/lib/constants";

const HOME_PROPERTY_INTELLIGENCE_SECTION_CLASS = [
  "home-property-intelligence relative isolate overflow-hidden",
  LANDING_SECTION_CLASS,
].join(" ");

export function HomePropertyIntelligence() {
  return (
    <section
      className={HOME_PROPERTY_INTELLIGENCE_SECTION_CLASS}
      aria-labelledby="property-intelligence-heading"
    >
      <HomePropertyIntelligenceBackground />

      <div className={`${LANDING_CONTAINER_CLASS} home-property-intelligence__content`}>
        <div
          className={`home-property-intelligence__grid grid grid-cols-1 items-stretch lg:grid-cols-2 lg:items-center ${HOME_STATS_GRID_GAP_CLASS} lg:gap-12`}
        >
          <div className="home-property-intelligence__visual-col">
            <HomePropertyIntelligenceVisual />
          </div>
          <div className="home-property-intelligence__content-col">
            <HomePropertyIntelligenceContentCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePropertyIntelligenceBackground() {
  return (
    <div
      className="home-property-intelligence-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <picture className="absolute inset-0 block size-full min-h-full" aria-hidden>
        <source
          media="(min-width: 1280px)"
          srcSet={HOME_PROPERTY_INTELLIGENCE_BG_SOURCES.desktop}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={HOME_PROPERTY_INTELLIGENCE_BG_SOURCES.tablet}
          type="image/webp"
        />
        <img
          src={HOME_PROPERTY_INTELLIGENCE_BG_SOURCES.mobile}
          alt=""
          width={2560}
          height={1440}
          decoding="async"
          className="home-property-intelligence-bg-image size-full min-h-full"
        />
      </picture>
      <LandingSectionBlend edge="top" tone="surface" />
      <LandingSectionBlend edge="bottom" tone="white" />
      <div className="home-property-intelligence-photo-scrim absolute inset-0" />
    </div>
  );
}
