"use client";

import { useEffect } from "react";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import {
  isHomeSectionHashSyncLocked,
  syncSectionHash,
} from "@/shared/lib/scrollToHomeSection";

const HOME_SECTION_HASH_OFFSET_PX = 96;

const TRACKED_SECTION_IDS = Object.values(HOME_SECTION_IDS);

function sectionIdAtOffset(): string | null {
  let active: string | null = null;

  for (const id of TRACKED_SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) {
      continue;
    }
    if (element.getBoundingClientRect().top <= HOME_SECTION_HASH_OFFSET_PX) {
      active = id;
    }
  }

  return active;
}

/**
 * Keeps `location.hash` aligned with the home section nearest the navbar
 * so header tabs stay correct during scroll, not only after a click.
 */
export function useHomeSectionHashSync(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frame = 0;

    function publish(): void {
      if (isHomeSectionHashSyncLocked()) {
        return;
      }
      const sectionId = sectionIdAtOffset();
      if (sectionId) {
        syncSectionHash(sectionId);
      }
    }

    function onScroll(): void {
      if (frame !== 0) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        publish();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    publish();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [enabled]);
}
