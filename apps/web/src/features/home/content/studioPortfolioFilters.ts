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

const VIDEO_MEDIA_CATEGORY = "video";
const VIDEO_FILTER = "Video";

function isVideoOnly(card: StudioPortfolioCard): boolean {
  if (card.mediaCategory !== VIDEO_MEDIA_CATEGORY) {
    return false;
  }
  return card.categories.every((category) => category === VIDEO_FILTER);
}

export function filterPortfolioCards(
  cards: readonly StudioPortfolioCard[],
  filter: PortfolioFilter,
): readonly StudioPortfolioCard[] {
  if (filter === PORTFOLIO_FILTER_ALL) {
    return cards.filter((card) => !isVideoOnly(card));
  }

  return cards.filter((card) => card.categories.includes(filter));
}
