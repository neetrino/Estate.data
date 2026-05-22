/** Portfolio grid page size on lg+ (2×3). */
export const PORTFOLIO_ITEMS_PER_PAGE_DESKTOP = 6;

/** Portfolio grid page size below lg (e.g. 2×2 on sm, 4 rows on xs). */
export const PORTFOLIO_ITEMS_PER_PAGE_MOBILE = 4;

/** @deprecated Use PORTFOLIO_ITEMS_PER_PAGE_DESKTOP — kept for callers expecting a single constant. */
export const PORTFOLIO_ITEMS_PER_PAGE = PORTFOLIO_ITEMS_PER_PAGE_DESKTOP;

/** 1-based page count for a list length (0 when empty). */
export function getPortfolioPageCount(totalItems: number, itemsPerPage: number): number {
  if (totalItems <= 0 || itemsPerPage <= 0) {
    return 0;
  }
  return Math.ceil(totalItems / itemsPerPage);
}

/** Show pagination only when there is more than one page. */
export function shouldShowPortfolioPagination(totalItems: number, itemsPerPage: number): boolean {
  return getPortfolioPageCount(totalItems, itemsPerPage) > 1;
}

/** Clamp page into [1, totalPages]. */
export function clampPortfolioPage(page: number, totalPages: number): number {
  if (totalPages <= 0) {
    return 1;
  }
  return Math.min(Math.max(page, 1), totalPages);
}

/** Slice items for a 1-based page index. */
export function slicePortfolioPage<T>(
  items: readonly T[],
  page: number,
  itemsPerPage: number,
): readonly T[] {
  const start = (page - 1) * itemsPerPage;
  return items.slice(start, start + itemsPerPage);
}
