import {
  parseRecentWorkAlt,
  portfolioHas3D,
  portfolioHasVideo,
} from "@/features/home/content/parseRecentWorkAlt";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import {
  STUDIO_PORTFOLIO_CATALOG,
  type StudioPortfolioCard,
} from "@/features/home/content/studioPortfolioCatalog";

const CATEGORY_KEYWORDS: readonly { filter: string; pattern: RegExp }[] = [
  { filter: "Luxury Homes", pattern: /luxury|estate|beverly|malibu|glass house/iu },
  { filter: "Residential", pattern: /residence|residential|house|loft|villa|condo/iu },
  { filter: "Commercial", pattern: /commercial|corporate|industrial|office|warehouse/iu },
  { filter: "Architecture", pattern: /architect/iu },
  { filter: "3D Tours", pattern: /matterport|3d tour/iu },
  { filter: "Drone", pattern: /drone/iu },
  { filter: "Video", pattern: /video|film|cinematic/iu },
  { filter: "Scan-to-BIM", pattern: /scan-to-bim|revit|point cloud/iu },
];

function inferCategories(haystack: string): string[] {
  return CATEGORY_KEYWORDS.filter((entry) => entry.pattern.test(haystack)).map(
    (entry) => entry.filter,
  );
}

function derivePortfolioCard(project: RecentWorkProject): StudioPortfolioCard {
  const parsed = parseRecentWorkAlt(project.imageAlt);
  const haystack = project.imageAlt;
  const hasVideo = portfolioHasVideo(haystack);
  const has3D = portfolioHas3D(haystack);

  return {
    id: project.id,
    title: parsed.title,
    location: parsed.location ?? "",
    services: parsed.services,
    categories: inferCategories(haystack),
    imageSrc: project.imageSrc,
    imageAlt: project.imageAlt,
    hasVideo,
    has3D,
  };
}

const CATALOG_BY_ID = new Map(
  STUDIO_PORTFOLIO_CATALOG.map((entry) => [entry.id, entry]),
);

function withCatalogCategories(card: StudioPortfolioCard): StudioPortfolioCard {
  if (card.categories.length > 0) {
    return card;
  }
  const catalog = CATALOG_BY_ID.get(card.id);
  if (!catalog) {
    return card;
  }
  return { ...card, categories: catalog.categories };
}

/**
 * Published CMS rows are the portfolio. Titles come from the saved alt text.
 * The static catalog only fills filter categories when the alt has none.
 */
export function mergeStudioPortfolioProjects(
  projects: readonly RecentWorkProject[],
): StudioPortfolioCard[] {
  return projects.map((project) => withCatalogCategories(derivePortfolioCard(project)));
}
