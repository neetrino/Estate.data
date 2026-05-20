export const SOLUTIONS_ROLE_ICON_IDS = [
  "brokers",
  "developers",
  "property-managers",
  "lenders",
  "investors",
] as const;

export type SolutionsRoleIconId = (typeof SOLUTIONS_ROLE_ICON_IDS)[number];

export type SolutionsRole = {
  readonly id: string;
  readonly title: string;
  readonly icon: SolutionsRoleIconId;
  readonly description: string;
  readonly deliverablesLabel: string;
  readonly deliverables: string;
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
    deliverables: "Photo, drone, 3D tour, listing website, comps brief",
    priceLabel: "Starting at",
    price: "$1,200",
  },
  {
    id: "developers",
    title: "For Developers",
    icon: "developers",
    description: "Pre-sell phases with renderings, BIM models, and absorption data.",
    deliverablesLabel: "Sample deliverables",
    deliverables: "Site captures, BIM, project microsite, market study",
    priceLabel: "Starting at",
    price: "$6,500",
  },
  {
    id: "property-managers",
    title: "For Property Managers",
    icon: "property-managers",
    description: "Lease faster with portfolio-wide media + occupancy dashboards.",
    deliverablesLabel: "Sample deliverables",
    deliverables: "Volume photo, virtual tours, performance dashboard",
    priceLabel: "Starting at",
    price: "$2,400/mo",
  },
  {
    id: "lenders",
    title: "For Lenders",
    icon: "lenders",
    description: "Underwrite with confidence using BIM, AVMs, and condition reports.",
    deliverablesLabel: "Sample deliverables",
    deliverables: "LiDAR + BIM, valuation, risk dashboard",
    priceLabel: "Starting at",
    price: "$3,800",
  },
  {
    id: "investors",
    title: "For Investors",
    icon: "investors",
    description: "Source and diligence assets with off-market intel and pro media.",
    deliverablesLabel: "Sample deliverables",
    deliverables: "Market reports, comps, due-diligence shoot",
    priceLabel: "Starting at",
    price: "$1,900",
  },
] as const;
