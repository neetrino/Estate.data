"use client";

import "@/features/home/landing/styles/hero-dashboard-enter.css";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ClientVoiceCard } from "@/features/home/components/ClientVoiceCard";
import { heroDashboardEnterClass } from "@/features/home/landing/lib/heroDashboardEnterStyles";
import type { ClientVoice } from "@/features/home/content/clientVoicesCopy";

const CLIENT_VOICES_CARDS_INTERSECTION_THRESHOLD = 0.12;

function subscribePrefersReducedMotion(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getPrefersReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ClientVoicesCardsGridProps = {
  testimonials: readonly ClientVoice[];
};

export function ClientVoicesCardsGrid({ testimonials }: ClientVoicesCardsGridProps) {
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
      { threshold: CLIENT_VOICES_CARDS_INTERSECTION_THRESHOLD },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <ul ref={gridRef} className="home-client-voices__grid" role="list">
      {testimonials.map((voice, index) => (
        <li
          key={voice.id}
          className={
            hasEntered ? `flex min-w-0 ${heroDashboardEnterClass(index)}` : "flex min-w-0 opacity-0"
          }
        >
          <ClientVoiceCard voice={voice} />
        </li>
      ))}
    </ul>
  );
}
