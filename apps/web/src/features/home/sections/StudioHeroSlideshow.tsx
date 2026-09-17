"use client";

import { useEffect, useState } from "react";
import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";

export type StudioHeroSlide = {
  readonly id: string;
  readonly imageUrl: string;
  readonly thumbUrl: string;
  readonly alt: string;
};

/** Keep in sync with `.studio-hero-progress` duration in `globals.css`. */
export const HERO_SLIDE_INTERVAL_MS = 6000;

type StudioHeroSlideshowProps = {
  readonly slides: readonly StudioHeroSlide[];
};

function nextSlideIndex(current: number, length: number): number {
  if (length <= 0) {
    return 0;
  }
  return (current + 1) % length;
}

/** Crossfading hero images. After the last slide, playback continues from the first. */
export function StudioHeroSlideshow({ slides }: StudioHeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const length = slides.length;
  const activeIndex = length === 0 ? 0 : index % length;
  const active = slides[activeIndex];

  useEffect(() => {
    if (length < 2 || reduceMotion) {
      return;
    }

    const timerId = window.setInterval(() => {
      setIndex((current) => nextSlideIndex(current, length));
    }, HERO_SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [length, reduceMotion]);

  if (!active) {
    return null;
  }

  return (
    <div
      className="absolute inset-0"
      aria-roledescription="carousel"
      aria-label="Hero images"
      aria-live="polite"
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            slideIndex === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={slideIndex !== activeIndex}
        >
          <PublicAssetImage
            src={slide.imageUrl}
            alt={slide.alt}
            fill
            priority={slideIndex === 0}
            className="studio-kenburns object-cover"
            sizes="100vw"
          />
        </div>
      ))}
      <div className="studio-veil absolute inset-0" />
      <div className="absolute inset-0 bg-studio-bg/25" />
      {length > 1 && !reduceMotion ? (
        <div
          key={activeIndex}
          className="studio-hero-progress absolute bottom-0 left-0 h-0.5 w-full bg-studio-accent"
        />
      ) : null}
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    function sync(): void {
      setReduced(media.matches);
    }
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}
