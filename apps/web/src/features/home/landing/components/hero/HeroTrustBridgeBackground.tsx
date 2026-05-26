import { LandingSectionBlend } from "@/features/home/landing/components/LandingSectionBlend";
import {
  HERO_LANDING_BG_SOURCES,
  WHAT_WE_DO_BG_SOURCES,
} from "@/features/home/landing/lib/heroLandingAssets";
import "@/features/home/styles/hero-trust-bridge.css";

/** Visual bridge: hero photo tones → What we do photo tones. */
export function HeroTrustBridgeBackground() {
  return (
    <div className="home-landing-trust-bridge__layer" aria-hidden>
      <HeroBridgePhoto />
      <WhatWeDoBridgePhoto />
      <div className="home-landing-trust-bridge__layer home-landing-trust-bridge__mesh" />
      <div className="home-landing-trust-bridge__layer home-landing-trust-bridge__top-fade" />
      <div className="home-landing-trust-bridge__layer home-landing-trust-bridge__bottom-fade" />
      <LandingSectionBlend edge="bottom" tone="soft" />
    </div>
  );
}

function HeroBridgePhoto() {
  return (
    <picture className="home-landing-trust-bridge__layer home-landing-trust-bridge__hero-photo block size-full">
      <source media="(min-width: 1280px)" srcSet={HERO_LANDING_BG_SOURCES.desktop} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={HERO_LANDING_BG_SOURCES.tablet} type="image/webp" />
      <img
        src={HERO_LANDING_BG_SOURCES.mobile}
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        className="home-landing-trust-bridge__hero-photo-image size-full"
      />
    </picture>
  );
}

function WhatWeDoBridgePhoto() {
  return (
    <picture className="home-landing-trust-bridge__layer home-landing-trust-bridge__what-we-do-photo block size-full">
      <source media="(min-width: 1280px)" srcSet={WHAT_WE_DO_BG_SOURCES.desktop} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={WHAT_WE_DO_BG_SOURCES.tablet} type="image/webp" />
      <img
        src={WHAT_WE_DO_BG_SOURCES.mobile}
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        className="home-landing-trust-bridge__what-we-do-photo-image size-full"
      />
    </picture>
  );
}
