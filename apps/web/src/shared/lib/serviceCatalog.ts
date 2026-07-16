export type ServiceCatalogItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly enabled: boolean;
  readonly comingSoon?: boolean;
};

export const SERVICE_CATALOG = [
  {
    id: "photography",
    label: "Photography",
    href: "/services/photography",
    enabled: true,
  },
  {
    id: "video-production",
    label: "Video Production",
    href: "/services/video-production",
    enabled: true,
  },
  {
    id: "drone-services",
    label: "Drone Services",
    href: "/services/drone-services",
    enabled: true,
  },
  {
    id: "3d-tours-visualization",
    label: "3D Tours & Visualization",
    href: "/services/3d-tours-visualization",
    enabled: true,
  },
  {
    id: "floor-plans-2d-3d",
    label: "Floor Plans / 2D-3D",
    href: "/services/floor-plans-2d-3d",
    enabled: true,
  },
  {
    id: "ai-media",
    label: "AI Media",
    href: "/services/ai-media",
    enabled: true,
  },
  {
    id: "laser-scanning-scan-to-bim",
    label: "Laser Scanning & Scan to BIM",
    href: "/services/laser-scanning-scan-to-bim",
    enabled: true,
  },
  {
    id: "mls-solutions",
    label: "MLS Solutions",
    href: "/services/mls-solutions",
    enabled: false,
    comingSoon: true,
  },
  {
    id: "property-landing-pages",
    label: "Property Landing Pages",
    href: "/services/property-landing-pages",
    enabled: true,
  },
] as const satisfies readonly ServiceCatalogItem[];
