import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

export type StudioPortfolioCard = {
  readonly id: string;
  readonly title: string;
  readonly location: string;
  readonly services: readonly string[];
  readonly categories: readonly string[];
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly hasVideo: boolean;
  readonly has3D: boolean;
};

type StudioPortfolioCatalogEntry = Omit<StudioPortfolioCard, "imageAlt">;

const SERVICE_ALT_SEPARATOR = ", ";

/** Alt string used by `parseRecentWorkAlt` and CMS seed rows. */
export function formatPortfolioAlt(entry: {
  readonly title: string;
  readonly location: string;
  readonly services: readonly string[];
}): string {
  return `${entry.title} in ${entry.location} — ${entry.services.join(SERVICE_ALT_SEPARATOR)}`;
}

function withAlt(entry: StudioPortfolioCatalogEntry): StudioPortfolioCard {
  return { ...entry, imageAlt: formatPortfolioAlt(entry) };
}

/** Selected-work tiles from https://la-capture-studio.lovable.app/#portfolio */
export const STUDIO_PORTFOLIO_CATALOG: readonly StudioPortfolioCard[] = [
  withAlt({
    id: "portfolio-1",
    title: "Modern Beverly Hills Residence",
    location: "Beverly Hills, CA",
    categories: ["Luxury Homes", "Residential", "3D Tours", "Drone", "Video"],
    services: ["Photography", "Cinematic Video", "Drone", "Matterport"],
    imageSrc: STUDIO_MEDIA.portfolio1,
    hasVideo: true,
    has3D: true,
  }),
  withAlt({
    id: "portfolio-2",
    title: "Wilshire Corporate Lobby",
    location: "Downtown Los Angeles, CA",
    categories: ["Commercial", "Architecture", "Scan-to-BIM"],
    services: ["Architectural Photography", "3D Laser Scanning", "Scan-to-BIM"],
    imageSrc: STUDIO_MEDIA.portfolio2,
    hasVideo: false,
    has3D: false,
  }),
  withAlt({
    id: "portfolio-3",
    title: "Venice Architectural Loft",
    location: "Venice, CA",
    categories: ["Architecture", "Residential", "Video"],
    services: ["Photography", "Cinematic Video", "Virtual Staging"],
    imageSrc: STUDIO_MEDIA.portfolio3,
    hasVideo: true,
    has3D: false,
  }),
  withAlt({
    id: "portfolio-4",
    title: "Point Dume Cliffside Estate",
    location: "Malibu, CA",
    categories: ["Luxury Homes", "Drone", "3D Tours"],
    services: ["Drone Photo + Video", "Photography", "Matterport"],
    imageSrc: STUDIO_MEDIA.drone,
    hasVideo: true,
    has3D: true,
  }),
  withAlt({
    id: "portfolio-5",
    title: "Sunset Plaza Glass House",
    location: "West Hollywood, CA",
    categories: ["Luxury Homes", "Video", "Drone"],
    services: ["Cinematic Film", "Twilight Photography", "Drone"],
    imageSrc: STUDIO_MEDIA.heroVilla,
    hasVideo: true,
    has3D: false,
  }),
  withAlt({
    id: "portfolio-6",
    title: "Vernon Industrial As-Built",
    location: "Vernon, CA",
    categories: ["Scan-to-BIM", "Commercial", "Architecture"],
    services: ["3D Laser Scanning", "Point Cloud", "Revit LOD 300"],
    imageSrc: STUDIO_MEDIA.scanBim,
    hasVideo: false,
    has3D: false,
  }),
];
