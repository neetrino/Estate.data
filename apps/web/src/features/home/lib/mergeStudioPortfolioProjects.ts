import { parseRecentWorkAlt } from "@/features/home/content/parseRecentWorkAlt";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import {
  formatPortfolioAlt,
  STUDIO_PORTFOLIO_CATALOG,
  type StudioPortfolioCard,
} from "@/features/home/content/studioPortfolioCatalog";

const VIDEO_PATTERN = /video|film|cinematic/iu;
const TOUR_PATTERN = /matterport|3d tour/iu;

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
  const hasVideo = VIDEO_PATTERN.test(haystack);
  const has3D = TOUR_PATTERN.test(haystack);

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

function overlayCatalogCard(
  entry: StudioPortfolioCard,
  cmsById: Map<string, RecentWorkProject>,
  cmsByTitle: Map<string, RecentWorkProject>,
): StudioPortfolioCard {
  const cms = cmsById.get(entry.id) ?? cmsByTitle.get(entry.title);
  if (!cms) {
    return entry;
  }

  return {
    ...entry,
    imageSrc: cms.imageSrc,
    imageAlt: cms.imageAlt || formatPortfolioAlt(entry),
  };
}

/**
 * Always show the master selected-work set, overlaying CMS images when ids
 * or titles match. Extra published CMS tiles are appended.
 */
export function mergeStudioPortfolioProjects(
  projects: readonly RecentWorkProject[],
): StudioPortfolioCard[] {
  const cmsById = new Map(projects.map((project) => [project.id, project]));
  const cmsByTitle = new Map(
    projects.map((project) => [parseRecentWorkAlt(project.imageAlt).title, project]),
  );
  const catalogIds = new Set(STUDIO_PORTFOLIO_CATALOG.map((entry) => entry.id));
  const catalogTitles = new Set(STUDIO_PORTFOLIO_CATALOG.map((entry) => entry.title));

  const cards = STUDIO_PORTFOLIO_CATALOG.map((entry) =>
    overlayCatalogCard(entry, cmsById, cmsByTitle),
  );

  for (const project of projects) {
    const title = parseRecentWorkAlt(project.imageAlt).title;
    if (catalogIds.has(project.id) || catalogTitles.has(title)) {
      continue;
    }
    cards.push(derivePortfolioCard(project));
  }

  return cards;
}
