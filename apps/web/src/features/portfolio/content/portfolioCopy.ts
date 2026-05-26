import { ASSET_KEYS, type PortfolioMediaCategory } from "@estate/db";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";

export const PORTFOLIO_FILTER_IDS = [
  "all",
  "photo",
  "video",
  "drone",
  "3d-tour",
] as const;

export type PortfolioFilterId = (typeof PORTFOLIO_FILTER_IDS)[number];

export type { PortfolioMediaCategory };

export type PortfolioProject = {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly category: PortfolioMediaCategory;
};

/** Placeholder until admin supplies portfolio assets. */
const PORTFOLIO_PLACEHOLDER_IMAGE = resolveAssetUrl(ASSET_KEYS.recentWorkPlaceholder);

const PORTFOLIO_PLACEHOLDER_ALT =
  "Luxury Los Angeles property — portfolio placeholder";

export const PORTFOLIO_PAGE_COPY = {
  eyebrow: "PORTFOLIO",
  title: "Selected work across Los Angeles",
  subtitle:
    "From Malibu cliffsides to Silver Lake remodels — projects that moved the needle.",
  filters: [
    { id: "all", label: "All" },
    { id: "photo", label: "Photo" },
    { id: "video", label: "Video" },
    { id: "drone", label: "Drone" },
    { id: "3d-tour", label: "3D Tour" },
  ] as const satisfies readonly { id: PortfolioFilterId; label: string }[],
  /** Static mock data when `NEXT_PUBLIC_USE_MOCK_API=true`. */
  projects: [
    {
      id: "portfolio-1",
      imageSrc: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: "photo",
    },
    {
      id: "portfolio-2",
      imageSrc: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: "photo",
    },
    {
      id: "portfolio-3",
      imageSrc: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: "video",
    },
    {
      id: "portfolio-4",
      imageSrc: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: "video",
    },
    {
      id: "portfolio-5",
      imageSrc: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: "drone",
    },
    {
      id: "portfolio-6",
      imageSrc: PORTFOLIO_PLACEHOLDER_IMAGE,
      imageAlt: PORTFOLIO_PLACEHOLDER_ALT,
      category: "3d-tour",
    },
  ] as const satisfies readonly PortfolioProject[],
} as const;
