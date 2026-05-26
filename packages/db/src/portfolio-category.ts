/** Portfolio tile filter categories — shared by API and web. */
export const PORTFOLIO_MEDIA_CATEGORIES = [
  "photo",
  "video",
  "drone",
  "3d-tour",
] as const;

export type PortfolioMediaCategory = (typeof PORTFOLIO_MEDIA_CATEGORIES)[number];

export function isPortfolioMediaCategory(
  value: string,
): value is PortfolioMediaCategory {
  return (PORTFOLIO_MEDIA_CATEGORIES as readonly string[]).includes(value);
}
