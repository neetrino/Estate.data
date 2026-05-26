"use client";

import "@/features/home/landing/styles/hero-dashboard-enter.css";
import "@/features/home/styles/home-stats-strip.css";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HomeStatsKpiCard } from "@/features/home/components/HomeStatsKpiCard";
import {
  HOME_STATS_COPY,
  HOME_STATS_COUNT_UP_DURATION_MS,
} from "@/features/home/content/homeStatsCopy";
import { easeOutCubic, formatStatCountValue } from "@/features/home/lib/formatStatCountValue";
import { LandingSectionBlend } from "@/features/home/landing/components/LandingSectionBlend";
import { heroDashboardEnterClass } from "@/features/home/landing/lib/heroDashboardEnterStyles";
import { HOME_STATS_BG_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
} from "@/features/home/landing/lib/landingStyles";

const HOME_STATS_STRIP_SECTION_CLASS = [
  "home-stats-strip relative isolate overflow-hidden",
  LANDING_SECTION_CLASS,
].join(" ");

const STATS_INTERSECTION_THRESHOLD = 0;

function subscribePrefersReducedMotion(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getPrefersReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HomeStatsStrip() {
  const { stats } = HOME_STATS_COPY;
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    () => false,
  );
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [animatedHasEntered, setAnimatedHasEntered] = useState(false);
  const hasEntered = prefersReducedMotion || animatedHasEntered;
  const progress = prefersReducedMotion ? 1 : animatedProgress;
  const hasStartedRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const section = sectionRef.current;
    if (!section) {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const startCountUp = () => {
      if (hasStartedRef.current) {
        return;
      }
      hasStartedRef.current = true;
      setAnimatedHasEntered(true);
      observer?.disconnect();

      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / HOME_STATS_COUNT_UP_DURATION_MS, 1);
        setAnimatedProgress(easeOutCubic(t));
        if (t < 1) {
          frameRef.current = requestAnimationFrame(tick);
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    const isSectionVisible = () => {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      if (viewHeight <= 0) {
        return false;
      }
      const visibleHeight =
        Math.min(rect.bottom, viewHeight) - Math.max(rect.top, 0);
      return visibleHeight > 0 && rect.top < viewHeight * 0.92;
    };

    const tryStartFromScroll = () => {
      if (!isSectionVisible()) {
        return;
      }
      startCountUp();
    };

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasStartedRef.current) {
          return;
        }
        startCountUp();
      },
      { threshold: STATS_INTERSECTION_THRESHOLD },
    );

    observer.observe(section);
    tryStartFromScroll();
    window.addEventListener("scroll", tryStartFromScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", tryStartFromScroll);
      cancelAnimationFrame(frameRef.current);
      hasStartedRef.current = false;
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={HOME_STATS_STRIP_SECTION_CLASS}
      aria-label="Key metrics"
    >
      <HomeStatsStripBackground />

      <div className={`${LANDING_CONTAINER_CLASS} home-stats-strip__content`}>
        <ul className="home-stats-kpi-grid">
          {stats.map((stat, index) => {
            const displayValue = formatStatCountValue(progress, stat.count);
            const finalValue = formatStatCountValue(1, stat.count);

            return (
              <li
                key={stat.id}
                className={
                  hasEntered
                    ? `h-full min-h-0 ${heroDashboardEnterClass(index)}`
                    : "h-full min-h-0 opacity-0"
                }
              >
                <HomeStatsKpiCard
                  stat={stat}
                  displayValue={displayValue}
                  ariaValue={finalValue}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function HomeStatsStripBackground() {
  return (
    <div
      className="home-stats-strip-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <picture className="absolute inset-0 block size-full min-h-full">
        <source
          media="(min-width: 1280px)"
          srcSet={HOME_STATS_BG_SOURCES.desktop}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={HOME_STATS_BG_SOURCES.tablet}
          type="image/webp"
        />
        <img
          src={HOME_STATS_BG_SOURCES.mobile}
          alt=""
          width={2560}
          height={853}
          decoding="async"
          className="home-stats-strip-bg-image size-full min-h-full"
        />
      </picture>
      <LandingSectionBlend edge="top" tone="surface" />
      <LandingSectionBlend edge="bottom" tone="surface" />
      <div className="home-stats-strip-photo-scrim absolute inset-0" />
    </div>
  );
}
