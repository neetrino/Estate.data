import { ASSET_KEYS, assetUrl } from "@estate/db";

export const PROPERTY_INTELLIGENCE_IMAGE_PATH = assetUrl(
  ASSET_KEYS.propertyIntelligenceHero,
);

export const PROPERTY_INTELLIGENCE_IMAGE_ALT =
  "Wireframe 3D BIM model of a classical building on a digital grid";

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
  ctaHref: "/services/data",
} as const;
