export const SOLUTIONS_ROLE_ICON_IDS = [
  "brokers",
  "developers",
  "property-managers",
  "lenders",
  "investors",
] as const;

export type SolutionsRoleIconId = (typeof SOLUTIONS_ROLE_ICON_IDS)[number];

export const SOLUTIONS_DELIVERABLE_ICON_IDS = [
  "photo",
  "drone",
  "tour-3d",
  "listing-website",
  "comps-brief",
  "site-captures",
  "bim",
  "project-microsite",
  "market-study",
  "volume-photo",
  "virtual-tours",
  "performance-dashboard",
  "lidar-bim",
  "valuation",
  "risk-dashboard",
  "market-reports",
  "comps",
  "due-diligence-shoot",
] as const;

export type SolutionsDeliverableIconId = (typeof SOLUTIONS_DELIVERABLE_ICON_IDS)[number];

export type SolutionsDeliverable = {
  readonly icon: SolutionsDeliverableIconId;
  readonly label: string;
};

export type SolutionsRole = {
  readonly id: string;
  readonly title: string;
  readonly icon: SolutionsRoleIconId;
  readonly description: string;
  readonly deliverablesLabel: string;
  readonly deliverables: readonly SolutionsDeliverable[];
  readonly priceLabel: string;
  readonly price: string;
};

export const SOLUTIONS_PAGE_CTA = {
  label: "Plan my package",
  href: "/contact",
} as const;

export const SOLUTIONS_ROLES: readonly SolutionsRole[] = [
  {
    id: "brokers",
    title: "For Brokers",
    icon: "brokers",
    description: "Win listings with cinematic media + comp-backed pricing decks.",
    deliverablesLabel: "Sample deliverables",
    deliverables: [
      { icon: "photo", label: "Photo" },
      { icon: "drone", label: "Drone" },
      { icon: "tour-3d", label: "3D Tour" },
      { icon: "listing-website", label: "Listing Website" },
      { icon: "comps-brief", label: "Comps Brief" },
    ],
    priceLabel: "Starting at",
    price: "$1,200",
  },
  {
    id: "developers",
    title: "For Developers",
    icon: "developers",
    description: "Pre-sell phases with renderings, BIM models, and absorption data.",
    deliverablesLabel: "Sample deliverables",
    deliverables: [
      { icon: "site-captures", label: "Site Captures" },
      { icon: "bim", label: "BIM" },
      { icon: "project-microsite", label: "Project Microsite" },
      { icon: "market-study", label: "Market Study" },
    ],
    priceLabel: "Starting at",
    price: "$6,500",
  },
  {
    id: "property-managers",
    title: "For Property Managers",
    icon: "property-managers",
    description: "Lease faster with portfolio-wide media + occupancy dashboards.",
    deliverablesLabel: "Sample deliverables",
    deliverables: [
      { icon: "volume-photo", label: "Volume Photo" },
      { icon: "virtual-tours", label: "Virtual Tours" },
      { icon: "performance-dashboard", label: "Performance Dashboard" },
    ],
    priceLabel: "Starting at",
    price: "$2,400/mo",
  },
  {
    id: "lenders",
    title: "For Lenders",
    icon: "lenders",
    description: "Underwrite with confidence using BIM, AVMs, and condition reports.",
    deliverablesLabel: "Sample deliverables",
    deliverables: [
      { icon: "lidar-bim", label: "LiDAR + BIM" },
      { icon: "valuation", label: "Valuation" },
      { icon: "risk-dashboard", label: "Risk Dashboard" },
    ],
    priceLabel: "Starting at",
    price: "$3,800",
  },
  {
    id: "investors",
    title: "For Investors",
    icon: "investors",
    description: "Source and diligence assets with off-market intel and pro media.",
    deliverablesLabel: "Sample deliverables",
    deliverables: [
      { icon: "market-reports", label: "Market Reports" },
      { icon: "comps", label: "Comps" },
      { icon: "due-diligence-shoot", label: "Due-Diligence Shoot" },
    ],
    priceLabel: "Starting at",
    price: "$1,900",
  },
] as const;
