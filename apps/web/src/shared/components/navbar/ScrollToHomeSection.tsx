"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { isHomeSectionId } from "@/shared/lib/homeSectionIds";
import { scrollToHomeSection } from "@/shared/lib/scrollToHomeSection";

const SECTION_QUERY = "section";

function readTargetSectionId(searchParams: { get: (key: string) => string | null }): string | null {
  const fromQuery = searchParams.get(SECTION_QUERY);
  if (fromQuery) {
    return fromQuery;
  }

  const fromHash = window.location.hash.replace("#", "");
  return fromHash || null;
}

/** On `/`, scroll to `?section=` or the URL hash after the section is in the DOM. */
export function ScrollToHomeSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionId = readTargetSectionId(searchParams);
    if (sectionId && isHomeSectionId(sectionId)) {
      scrollToHomeSection(sectionId);
    }

    function onHashChange(): void {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && isHomeSectionId(hashId)) {
        scrollToHomeSection(hashId);
      }
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname, searchParams]);

  return null;
}
