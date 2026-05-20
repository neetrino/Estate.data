import { ASSET_KEYS, assetUrl } from "@estate/db";

export const DATA_SERVICES_PAGE_COPY = {
  eyebrow: "Services",
  title: "Scan to BIM. Data that drives decisions.",
  subtitle:
    "From LiDAR captures to live dashboards — the data layer behind every confident deal in Los Angeles.",
} as const;

export const DATA_SERVICES_FEATURE_IMAGE_PATH = assetUrl(
  ASSET_KEYS.propertyIntelligenceHero,
);

export const DATA_SERVICES_FEATURE_IMAGE_ALT =
  "Wireframe 3D BIM model of a classical building on a digital grid";

export const DATA_SERVICES_OFFERING_ICON_IDS = [
  "lidar-scanning",
  "bim-modeling",
  "listings-valuations",
  "analytics-dashboards",
] as const;

export type DataServicesOfferingIconId =
  (typeof DATA_SERVICES_OFFERING_ICON_IDS)[number];

export type DataServicesOffering = {
  id: string;
  title: string;
  description: string;
  icon: DataServicesOfferingIconId;
};

export const DATA_SERVICES_OFFERINGS: readonly DataServicesOffering[] = [
  {
    id: "lidar-scanning",
    title: "LiDAR Scanning",
    description:
      "Precision point-cloud captures for existing structures and sites.",
    icon: "lidar-scanning",
  },
  {
    id: "bim-modeling",
    title: "BIM Modeling",
    description: "Revit, Navisworks, and IFC-ready BIM models from scan data.",
    icon: "bim-modeling",
  },
  {
    id: "listings-valuations",
    title: "Listings & Valuations",
    description:
      "AR-ready listing analytics, comps, and pricing intelligence.",
    icon: "listings-valuations",
  },
  {
    id: "analytics-dashboards",
    title: "Analytics Dashboards",
    description: "Live KPI dashboards tailored to your portfolio.",
    icon: "analytics-dashboards",
  },
] as const;

export const DATA_SERVICES_INTEGRATIONS_COPY = {
  title: "Integrations",
  items: [
    "HubSpot",
    "Salesforce",
    "Mapbox",
    "Stripe",
    "Follow Up Boss",
    "MLS / IDX",
    "Google Maps",
    "Calendly",
  ],
} as const;

export const DATA_SERVICES_REPORT_CTA_COPY = {
  title: "Request a free LA market report",
  description:
    "Get a tailored snapshot of your micro-market — comparable sales, days on market, and buyer demand signals.",
  buttonLabel: "Request report",
  buttonHref: "/contact",
} as const;
