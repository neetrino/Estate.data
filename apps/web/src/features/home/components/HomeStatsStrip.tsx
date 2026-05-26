"use client";

import "@/features/home/landing/styles/hero-dashboard-enter.css";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  HOME_STATS_COPY,
  HOME_STATS_COUNT_UP_DURATION_MS,
} from "@/features/home/content/homeStatsCopy";
import { easeOutCubic, formatStatCountValue } from "@/features/home/lib/formatStatCountValue";
import { LandingModuleIcon } from "@/features/home/landing/components/LandingModuleIcon";
import { heroDashboardEnterClass } from "@/features/home/landing/lib/heroDashboardEnterStyles";
import {
  homeLandingAccentAt,
  HOME_STATS_CARD_CLASS,
  HOME_STATS_STRIP_GRID_CLASS,
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_WHITE_CLASS,
  landingIconSurfaceClass,
  landingMetricValueClass,
} from "@/features/home/landing/lib/landingStyles";

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
  const [hasEntered, setHasEntered] = useState(false);
  const progress = prefersReducedMotion ? 1 : animatedProgress;
  const hasStartedRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setHasEntered(true);
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
      setHasEntered(true);
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
      className={LANDING_SECTION_WHITE_CLASS}
      aria-label="Key metrics"
    >
      <div className={LANDING_CONTAINER_CLASS}>
        <ul className={HOME_STATS_STRIP_GRID_CLASS}>
          {stats.map((stat, index) => {
            const accent = homeLandingAccentAt(index);
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
                <article className={HOME_STATS_CARD_CLASS}>
                  <span className={landingIconSurfaceClass(accent)}>
                    <LandingModuleIcon accent={accent} variant={index} />
                  </span>
                  <p
                    className={`mt-3 tabular-nums ${landingMetricValueClass(accent)}`}
                    aria-label={`${finalValue} ${stat.label}`}
                  >
                    {displayValue}
                  </p>
                  <p className="mt-1 text-sm font-medium text-brand-navy/70">{stat.label}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
