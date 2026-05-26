"use client";

import "@/features/home/landing/styles/hero-dashboard-enter.css";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { WhatWeDoServiceCard } from "@/features/home/components/WhatWeDoServiceCard";
import { heroDashboardEnterClass } from "@/features/home/landing/lib/heroDashboardEnterStyles";
import type { WhatWeDoService } from "@/features/home/content/whatWeDoCopy";

const WHAT_WE_DO_CARDS_INTERSECTION_THRESHOLD = 0.1;

const WHAT_WE_DO_CARDS_GRID_CLASS = "relative z-10 grid gap-4 sm:grid-cols-2";

function subscribePrefersReducedMotion(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getPrefersReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type WhatWeDoServiceCardsGridProps = {
  services: readonly WhatWeDoService[];
};

export function WhatWeDoServiceCardsGrid({ services }: WhatWeDoServiceCardsGridProps) {
  const gridRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    () => false,
  );
  const [hasIntersected, setHasIntersected] = useState(false);
  const hasEntered = prefersReducedMotion || hasIntersected;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const grid = gridRef.current;
    if (!grid) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }
        setHasIntersected(true);
        observer.disconnect();
      },
      { threshold: WHAT_WE_DO_CARDS_INTERSECTION_THRESHOLD },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <ul ref={gridRef} className={WHAT_WE_DO_CARDS_GRID_CLASS}>
      {services.map((service, index) => (
        <li
          key={service.id}
          className={
            hasEntered
              ? `min-w-0 ${heroDashboardEnterClass(index)}`
              : "min-w-0 opacity-0"
          }
        >
          <WhatWeDoServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
}
