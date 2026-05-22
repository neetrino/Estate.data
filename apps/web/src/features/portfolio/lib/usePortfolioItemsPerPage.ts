"use client";

import { useSyncExternalStore } from "react";
import {
  PORTFOLIO_ITEMS_PER_PAGE_DESKTOP,
  PORTFOLIO_ITEMS_PER_PAGE_MOBILE,
} from "@/features/portfolio/lib/portfolioPagination";

/** Matches Tailwind `lg` — same breakpoint as the 3-column portfolio grid. */
const PORTFOLIO_DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function subscribePortfolioItemsPerPage(onStoreChange: () => void): () => void {
  const mediaQuery = window.matchMedia(PORTFOLIO_DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getPortfolioItemsPerPageSnapshot(): number {
  return window.matchMedia(PORTFOLIO_DESKTOP_MEDIA_QUERY).matches
    ? PORTFOLIO_ITEMS_PER_PAGE_DESKTOP
    : PORTFOLIO_ITEMS_PER_PAGE_MOBILE;
}

/** SSR + hydration — always desktop page size so markup matches before resize. */
function getPortfolioItemsPerPageServerSnapshot(): number {
  return PORTFOLIO_ITEMS_PER_PAGE_DESKTOP;
}

/** Desktop: 6 per page; below lg: 4 per page. */
export function usePortfolioItemsPerPage(): number {
  return useSyncExternalStore(
    subscribePortfolioItemsPerPage,
    getPortfolioItemsPerPageSnapshot,
    getPortfolioItemsPerPageServerSnapshot,
  );
}
