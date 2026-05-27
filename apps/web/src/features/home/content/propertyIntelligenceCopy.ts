import { ASSET_KEYS } from "@estate/db";
import { HOME_PROPERTY_INTELLIGENCE_VISUAL_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";
import { DATA_BIM_PATH } from "@/shared/lib/routes";

export const PROPERTY_INTELLIGENCE_IMAGE_PATH = resolveAssetUrl(
  ASSET_KEYS.propertyIntelligenceHero,
);

/** Home landing — Scan to BIM visual (reserved; glass card section uses decor only). */
export const HOME_PROPERTY_INTELLIGENCE_VISUAL_PATH =
  HOME_PROPERTY_INTELLIGENCE_VISUAL_SOURCES.default;

export const HOME_PROPERTY_INTELLIGENCE_VISUAL_ALT =
  "Glowing cyan BIM wireframe of a modern building on a digital grid with LiDAR and data overlays";

export const PROPERTY_INTELLIGENCE_IMAGE_ALT =
  "Wireframe 3D BIM model of a classical building on a digital grid";

export const PROPERTY_INTELLIGENCE_SCENE_ALT =
  "3D volumetric building LiDAR scan animation for Scan to BIM";

export type HomePropertyIntelligenceFeature = {
  readonly title: string;
  readonly description: string;
};

export const HOME_PROPERTY_INTELLIGENCE_COPY = {
  titleLine1: "Scan to BIM.",
  titleLine2: "Data to decisions.",
  description:
    "Pair your media package with LiDAR scanning, Revit-ready BIM, and live market dashboards. We integrate with HubSpot, Follow Up Boss, and your IDX feed—so your data works harder for you.",
  features: [
    {
      title: "Sub-centimeter LiDAR capture",
      description: "High-density point clouds with unmatched accuracy.",
    },
    {
      title: "Revit / IFC BIM deliverables",
      description: "Coordination-ready models for design, ops & facilities.",
    },
    {
      title: "Custom analytics dashboards",
      description: "Visualize performance, utilization & opportunities.",
    },
    {
      title: "MLS / IDX & CRM integrations",
      description: "Seamless data flow across your ecosystem.",
    },
  ] as const satisfies readonly HomePropertyIntelligenceFeature[],
  ctaLabel: "Explore data services",
  ctaHref: DATA_BIM_PATH,
} as const;
