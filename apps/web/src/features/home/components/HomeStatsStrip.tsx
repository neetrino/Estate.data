"use client";

import { useEffect, useRef, useState } from "react";
import {
  HOME_STATS_COPY,
  HOME_STATS_COUNT_UP_DURATION_MS,
} from "@/features/home/content/homeStatsCopy";
import { easeOutCubic, formatStatCountValue } from "@/features/home/lib/formatStatCountValue";
import { LandingModuleIcon } from "@/features/home/landing/components/LandingModuleIcon";
import {
  homeLandingAccentAt,
  LANDING_CONTAINER_CLASS,
  LANDING_GLASS_CARD_CLASS,
  LANDING_SECTION_WHITE_CLASS,
  landingIconSurfaceClass,
  landingMetricValueClass,
} from "@/features/home/landing/lib/landingStyles";

const STATS_INTERSECTION_THRESHOLD = 0.2;

export function HomeStatsStrip() {
  const { stats } = HOME_STATS_COPY;
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const hasStartedRef = useRef(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStartedRef.current) {
          return;
        }
        hasStartedRef.current = true;
        observer.disconnect();

        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / HOME_STATS_COUNT_UP_DURATION_MS, 1);
          setProgress(easeOutCubic(t));
          if (t < 1) {
            frameRef.current = requestAnimationFrame(tick);
          }
        };

        frameRef.current = requestAnimationFrame(tick);
      },
      { threshold: STATS_INTERSECTION_THRESHOLD },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={LANDING_SECTION_WHITE_CLASS}
      aria-label="Key metrics"
    >
      <div className={LANDING_CONTAINER_CLASS}>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {stats.map((stat, index) => {
            const accent = homeLandingAccentAt(index);
            const displayValue = formatStatCountValue(progress, stat.count);
            const finalValue = formatStatCountValue(1, stat.count);

            return (
              <li key={stat.id}>
                <article
                  className={`${LANDING_GLASS_CARD_CLASS} flex flex-col items-center px-4 py-5 text-center sm:px-5 sm:py-6`}
                >
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
