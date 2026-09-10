import type { StudioPortfolioCard } from "@/features/home/content/studioPortfolioCatalog";

export const PORTFOLIO_FILTER_ALL = "All";

export const PORTFOLIO_FILTERS = [
  PORTFOLIO_FILTER_ALL,
  "Luxury Homes",
  "Residential",
  "Commercial",
  "Architecture",
  "3D Tours",
  "Drone",
  "Video",
  "Scan-to-BIM",
] as const;

export type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number];

export function isPortfolioFilter(value: string): value is PortfolioFilter {
  return (PORTFOLIO_FILTERS as readonly string[]).includes(value);
}

export function filterPortfolioCards(
  cards: readonly StudioPortfolioCard[],
  filter: PortfolioFilter,
): readonly StudioPortfolioCard[] {
  if (filter === PORTFOLIO_FILTER_ALL) {
    return cards;
  }

  return cards.filter((card) => card.categories.includes(filter));
}
