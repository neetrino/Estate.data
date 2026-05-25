import { ASSET_KEYS } from "@estate/db";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";
import { DATA_BIM_PATH } from "@/shared/lib/routes";

export const PROPERTY_INTELLIGENCE_IMAGE_PATH = resolveAssetUrl(
  ASSET_KEYS.propertyIntelligenceHero,
);

export const PROPERTY_INTELLIGENCE_IMAGE_ALT =
  "Wireframe 3D BIM model of a classical building on a digital grid";

export const PROPERTY_INTELLIGENCE_SCENE_ALT =
  "3D volumetric building LiDAR scan animation for Scan to BIM";

export const HOME_PROPERTY_INTELLIGENCE_COPY = {
  eyebrow: "Property intelligence",
  title: "Scan to BIM. Data to decisions.",
  description:
    "Pair your media package with LiDAR scanning, Revit-ready BIM, and live market dashboards. We integrate with HubSpot, Follow Up Boss, and your IDX feed.",
  features: [
    "Sub-centimeter LiDAR captures",
    "Revit / IFC BIM deliverables",
    "Custom analytics dashboards",
    "MLS / IDX & CRM integrations",
  ],
  ctaLabel: "Explore data services",
  ctaHref: DATA_BIM_PATH,
} as const;
