import {
  STUDIO_PORTFOLIO_CATALOG,
  type StudioPortfolioCard,
} from "@/features/home/content/studioPortfolioCatalog";

export type RecentWorkProject = {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};

function toRecentWorkProject(card: StudioPortfolioCard): RecentWorkProject {
  return {
    id: card.id,
    imageSrc: card.imageSrc,
    imageAlt: card.imageAlt,
  };
}

export const HOME_RECENT_WORK_COPY = {
  eyebrow: "Recent work",
  title: "Selected LA projects",
  viewAllLabel: "View all",
  viewAllHref: "/portfolio",
  projects: STUDIO_PORTFOLIO_CATALOG.map(toRecentWorkProject),
} as const;
