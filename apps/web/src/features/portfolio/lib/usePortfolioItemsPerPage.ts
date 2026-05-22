"use client";

import { useEffect, useState } from "react";
import {
  PORTFOLIO_ITEMS_PER_PAGE_DESKTOP,
  PORTFOLIO_ITEMS_PER_PAGE_MOBILE,
} from "@/features/portfolio/lib/portfolioPagination";

/** Matches Tailwind `lg` — same breakpoint as the 3-column portfolio grid. */
const PORTFOLIO_DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function readPortfolioItemsPerPage(): number {
  if (typeof window === "undefined") {
    return PORTFOLIO_ITEMS_PER_PAGE_DESKTOP;
  }
  return window.matchMedia(PORTFOLIO_DESKTOP_MEDIA_QUERY).matches
    ? PORTFOLIO_ITEMS_PER_PAGE_DESKTOP
    : PORTFOLIO_ITEMS_PER_PAGE_MOBILE;
}

/** Desktop: 6 per page; below lg: 4 per page. */
export function usePortfolioItemsPerPage(): number {
  const [itemsPerPage, setItemsPerPage] = useState(readPortfolioItemsPerPage);

  useEffect(() => {
    const mediaQuery = window.matchMedia(PORTFOLIO_DESKTOP_MEDIA_QUERY);

    const syncItemsPerPage = () => {
      setItemsPerPage(
        mediaQuery.matches
          ? PORTFOLIO_ITEMS_PER_PAGE_DESKTOP
          : PORTFOLIO_ITEMS_PER_PAGE_MOBILE,
      );
    };

    syncItemsPerPage();
    mediaQuery.addEventListener("change", syncItemsPerPage);
    return () => mediaQuery.removeEventListener("change", syncItemsPerPage);
  }, []);

  return itemsPerPage;
}
