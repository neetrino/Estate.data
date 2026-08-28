import { isHomeSectionId } from "@/shared/lib/homeSectionIds";

const HASH_PREFIX = "/#";
const SECTION_QUERY = "section";
const SECTION_SCROLL_RETRY_MS = 50;
const SECTION_SCROLL_MAX_ATTEMPTS = 24;
const SECTION_SCROLL_AFTER_MENU_MS = 120;

function sectionIdFromHref(href: string): string | null {
  if (href.startsWith("#") && href.length > 1) {
    return href.slice(1);
  }

  if (href.startsWith(HASH_PREFIX)) {
    return href.slice(HASH_PREFIX.length) || null;
  }

  try {
    const url = new URL(href, "http://local.invalid");
    return url.searchParams.get(SECTION_QUERY);
  } catch {
    return null;
  }
}

/** Resolve a home section id from a nav href, query, or hash. */
export function resolveHomeSectionId(href: string): string | null {
  const sectionId = sectionIdFromHref(href);
  if (!sectionId || !isHomeSectionId(sectionId)) {
    return null;
  }
  return sectionId;
}

/** In-page hash when already on home. */
export function homeHashHref(sectionId: string): string {
  return `#${sectionId}`;
}

/** Cross-page href that Next.js will keep (hash-only URLs are dropped). */
export function homeSectionSearchHref(sectionId: string): string {
  return `/?section=${sectionId}`;
}

function syncSectionHash(sectionId: string): void {
  const nextHash = `#${sectionId}`;
  if (window.location.hash === nextHash) {
    return;
  }

  // Keep the current path+search. Next.js App Router throws if replaceState
  // is called with `null` state or a mismatched `/#id` URL.
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  try {
    window.history.replaceState(window.history.state ?? {}, "", nextUrl);
  } catch {
    window.location.hash = sectionId;
  }
}

function attemptScrollToSection(sectionId: string, attempt: number): void {
  const element = document.getElementById(sectionId);
  if (!element) {
    if (attempt < SECTION_SCROLL_MAX_ATTEMPTS) {
      window.setTimeout(() => {
        attemptScrollToSection(sectionId, attempt + 1);
      }, SECTION_SCROLL_RETRY_MS);
    }
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  syncSectionHash(sectionId);
}

/** Smooth-scroll to a home section. Retries until the node exists. */
export function scrollToHomeSection(sectionId: string): void {
  attemptScrollToSection(sectionId, 0);
}

/** Scroll after the mobile menu unlocks `body` (that cleanup resets window scroll). */
export function scrollToHomeSectionAfterMenu(sectionId: string): void {
  window.setTimeout(() => {
    scrollToHomeSection(sectionId);
  }, SECTION_SCROLL_AFTER_MENU_MS);
}
