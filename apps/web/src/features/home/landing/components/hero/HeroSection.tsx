"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "@/features/home/styles/home-figma-hero.css";
import type { HomeHeroContentFields } from "@/features/home/content/heroCopy";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import {
  HOME_LANDING_HERO_TOP_PADDING_CLASS,
  LANDING_CONTAINER_CLASS,
} from "@/features/home/landing/lib/landingStyles";

type HeroSectionProps = {
  readonly hero: HomeHeroContentFields;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialRenderAnimating, setIsInitialRenderAnimating] = useState(true);
  const [transitionDirection, setTransitionDirection] = useState<"next" | "prev">("next");
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeCarouselImage =
    LA_CAROUSEL_IMAGES[activeImageIndex] ?? LA_CAROUSEL_IMAGES[0];
  const previousCarouselImage =
    previousImageIndex === null ? null : (LA_CAROUSEL_IMAGES[previousImageIndex] ?? null);

  useEffect(() => {
    initialAnimationTimeoutRef.current = setTimeout(() => {
      setIsInitialRenderAnimating(false);
    }, 260);

    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
      if (initialAnimationTimeoutRef.current) {
        clearTimeout(initialAnimationTimeoutRef.current);
      }
    };
  }, []);

  const changeImage = (nextIndex: number) => {
    if (nextIndex === activeImageIndex || isTransitioning) {
      return;
    }

    setTransitionDirection(nextIndex > activeImageIndex ? "next" : "prev");
    setPreviousImageIndex(activeImageIndex);
    setActiveImageIndex(nextIndex);
    setIsTransitioning(true);

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPreviousImageIndex(null);
    }, 850);
  };

  const showPreviousImage = () => {
    const nextIndex =
      activeImageIndex === 0 ? LA_CAROUSEL_IMAGES.length - 1 : activeImageIndex - 1;
    changeImage(nextIndex);
  };

  const showNextImage = () => {
    const nextIndex =
      activeImageIndex === LA_CAROUSEL_IMAGES.length - 1 ? 0 : activeImageIndex + 1;
    changeImage(nextIndex);
  };

  return (
    <section
      className={[
        "la-hero la-hero--compact-top",
        HOME_LANDING_HERO_TOP_PADDING_CLASS,
        isTransitioning ? "la-hero--image-transitioning" : "",
        isInitialRenderAnimating ? "la-hero--initial-enter" : "",
        transitionDirection === "next" ? "la-hero--dir-next" : "la-hero--dir-prev",
      ].join(" ")}
    >
      <div className="la-hero__bg" aria-hidden>
        <div className="la-hero__bg-image-stack">
          {previousCarouselImage ? (
            <Image
              src={previousCarouselImage.heroSrc}
              alt=""
              fill
              sizes="100vw"
              className="la-hero__bg-image la-hero__bg-image--previous"
            />
          ) : null}
          <Image
            src={activeCarouselImage.heroSrc}
            alt=""
            fill
            sizes="100vw"
            className="la-hero__bg-image la-hero__bg-image--active"
          />
        </div>
      </div>

      <div className={`${LANDING_CONTAINER_CLASS} la-hero__container`}>
        <div className="la-hero__columns">
          <div className="la-hero__copy">
            <p className="la-hero__eyebrow">
              <Image
                src={LA_FIGMA_ASSETS.locationIcon}
                alt=""
                width={16}
                height={16}
                className="la-hero__eyebrow-icon"
              />
              SERVING GREATER LOS ANGELES
            </p>

            <h1 className="la-hero__title">
              Cinematic media.
              <span className="la-hero__title-accent">Intelligent</span>
              <span className="la-hero__title-accent">property</span>
              storytelling.
              <br />
              Close faster in LA.
            </h1>

            <p className="la-hero__description">
              LumenLA creates cinematic real estate media and property intelligence that helps
              brokers, developers, and investors present beautifully and sell with confidence.
            </p>

            <div className="la-hero__actions">
              <Link href={hero.primaryButtonHref} className="la-hero__button la-hero__button--primary">
                <Image
                  src={LA_FIGMA_ASSETS.cameraIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="la-hero__button-icon"
                />
                BOOK A SHOOT
              </Link>
              <Link href={hero.secondaryButtonHref} className="la-hero__button la-hero__button--secondary">
                <Image
                  src={LA_FIGMA_ASSETS.chartIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="la-hero__button-icon"
                />
                EXPLORE PORTFOLIO
              </Link>
            </div>

            <ul className="la-hero__feature-grid">
              {LA_HERO_FEATURES.map((feature) => (
                <li key={feature.id} className="la-hero__feature-item">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={24}
                    height={24}
                    className="la-hero__feature-icon"
                  />
                  <p className="la-hero__feature-title">{feature.title}</p>
                  <p className="la-hero__feature-copy">{feature.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="la-hero__right">
            <article className="la-hero__property-card">
              <div className="la-hero__property-copy">
                <p className="la-hero__property-kicker">FEATURED PROPERTY</p>
                <h2 className="la-hero__property-title">BIRD STREETS ESTATE</h2>
                <p className="la-hero__property-location">Los Angeles, CA</p>
                <a href="#featured-showcase" className="la-hero__watch-link">
                  <span className="la-hero__watch-pill">
                    <Image
                      src={LA_FIGMA_ASSETS.playIcon}
                      alt=""
                      width={12}
                      height={12}
                      className="la-hero__watch-icon"
                    />
                  </span>
                  WATCH SHOWCASE
                </a>
              </div>
              <div className="la-hero__property-media">
                <div className="la-hero__property-media-stack">
                  {previousCarouselImage ? (
                    <Image
                      src={previousCarouselImage.heroSrc}
                      alt={previousCarouselImage.alt}
                      fill
                      sizes="192px"
                      className="la-hero__property-media-image la-hero__property-media-image--previous"
                    />
                  ) : null}
                  <Image
                    src={activeCarouselImage.heroSrc}
                    alt={activeCarouselImage.alt}
                    fill
                    sizes="192px"
                    className="la-hero__property-media-image la-hero__property-media-image--active"
                  />
                </div>
              </div>
            </article>

            <div className="la-hero__carousel" aria-label="Featured property carousel">
              <button
                type="button"
                className="la-hero__carousel-button"
                aria-label="Previous property"
                onClick={showPreviousImage}
              >
                <Image
                  src={LA_FIGMA_ASSETS.arrowLeftIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="la-hero__carousel-arrow"
                />
              </button>
              <div className="la-hero__carousel-track">
                {LA_CAROUSEL_IMAGES.map((image, index) => (
                  <button
                    key={`thumb-${index + 1}`}
                    type="button"
                    className={[
                      "la-hero__carousel-thumb-button",
                      index === activeImageIndex ? "la-hero__carousel-thumb-button--active" : "",
                    ].join(" ")}
                    onClick={() => changeImage(index)}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={index === activeImageIndex}
                  >
                    <Image
                      src={image.thumbSrc}
                      alt={image.alt}
                      width={79}
                      height={49}
                      className="la-hero__carousel-thumb"
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="la-hero__carousel-button"
                aria-label="Next property"
                onClick={showNextImage}
              >
                <Image
                  src={LA_FIGMA_ASSETS.arrowRightIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="la-hero__carousel-arrow"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="la-hero__trusted">
        <div className={`${LANDING_CONTAINER_CLASS} la-hero__trusted-inner`}>
          <p className="la-hero__trusted-label">TRUSTED BY LA&apos;S TOP BROKERAGES &amp; DEVELOPERS</p>
          <ul className="la-hero__trusted-logos" aria-label="Trusted brokerages and developers">
            {LA_TRUSTED_BRANDS.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const LA_FIGMA_ASSETS = {
  locationIcon: "/images/hero/la-figma/icon-location.svg",
  cameraIcon: "/images/hero/la-figma/icon-camera.svg",
  chartIcon: "/images/hero/la-figma/icon-chart.svg",
  playIcon: "/images/hero/la-figma/icon-play.svg",
  arrowLeftIcon: "/images/hero/la-figma/icon-arrow-left.svg",
  arrowRightIcon: "/images/hero/la-figma/icon-arrow-right.svg",
} as const;

const LA_HERO_FEATURES = [
  {
    id: "cinematic-production",
    icon: "/images/hero/la-figma/icon-feature-camera.svg",
    title: "CINEMATIC PRODUCTION",
    description: "Film-grade visuals that capture every detail.",
  },
  {
    id: "property-intelligence",
    icon: "/images/hero/la-figma/icon-feature-map.svg",
    title: "PROPERTY INTELLIGENCE",
    description: "Market-ready insights that position your edge.",
  },
  {
    id: "strategic-storytelling",
    icon: "/images/hero/la-figma/icon-feature-megaphone.svg",
    title: "STRATEGIC STORYTELLING",
    description: "Stories that connect and convert buyers.",
  },
] as const;

const LA_TRUSTED_BRANDS = [
  "COMPASS",
  "Sotheby's International Realty",
  "THE AGENCY",
  "DOUGLAS ELLIMAN",
  "COLDWELL BANKER",
  "HILTON & HYLAND",
] as const;

const LA_CAROUSEL_IMAGES = [
  {
    heroSrc: STUDIO_MEDIA.heroVilla,
    thumbSrc: STUDIO_MEDIA.heroVilla,
    alt: "Luxury Los Angeles hillside residence photographed at dusk",
  },
  {
    heroSrc: STUDIO_MEDIA.photography,
    thumbSrc: STUDIO_MEDIA.photography,
    alt: "Bright modern Los Angeles living room captured for MLS photography",
  },
  {
    heroSrc: STUDIO_MEDIA.drone,
    thumbSrc: STUDIO_MEDIA.drone,
    alt: "Aerial drone photograph of a Malibu cliffside estate at golden hour",
  },
  {
    heroSrc: STUDIO_MEDIA.portfolio1,
    thumbSrc: STUDIO_MEDIA.portfolio1,
    alt: "Modern Beverly Hills Residence",
  },
  {
    heroSrc: STUDIO_MEDIA.matterport,
    thumbSrc: STUDIO_MEDIA.matterport,
    alt: "Dollhouse view of a scanned property rendered as a 3D digital twin",
  },
] as const;
