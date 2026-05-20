/** Portfolio grid page size (2×3 on lg). */
export const PORTFOLIO_ITEMS_PER_PAGE = 6;

/** 1-based page count for a list length (0 when empty). */
export function getPortfolioPageCount(totalItems: number): number {
  if (totalItems <= 0) {
    return 0;
  }
  return Math.ceil(totalItems / PORTFOLIO_ITEMS_PER_PAGE);
}

/** Show pagination only when there is more than one page. */
export function shouldShowPortfolioPagination(totalItems: number): boolean {
  return getPortfolioPageCount(totalItems) > 1;
}

/** Clamp page into [1, totalPages]. */
export function clampPortfolioPage(page: number, totalPages: number): number {
  if (totalPages <= 0) {
    return 1;
  }
  return Math.min(Math.max(page, 1), totalPages);
}

/** Slice items for a 1-based page index. */
export function slicePortfolioPage<T>(items: readonly T[], page: number): readonly T[] {
  const start = (page - 1) * PORTFOLIO_ITEMS_PER_PAGE;
  return items.slice(start, start + PORTFOLIO_ITEMS_PER_PAGE);
}
