import {
  HOME_SECTION_IDS,
  homeSectionHref,
} from "@/shared/lib/homeSectionIds";
import { WEB_PAGES_PATH } from "@/shared/lib/routes";

export type ServiceCatalogItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly enabled: boolean;
  readonly comingSoon?: boolean;
};

/** Public service sections — footer links and in-page jumps. */
export const SERVICE_CATALOG = [
  {
    id: "photography",
    label: "Photography",
    href: homeSectionHref(HOME_SECTION_IDS.photography),
    enabled: true,
  },
  {
    id: "video-production",
    label: "Video Production",
    href: homeSectionHref(HOME_SECTION_IDS.video),
    enabled: true,
  },
  {
    id: "drone-services",
    label: "Drone Services",
    href: homeSectionHref(HOME_SECTION_IDS.drone),
    enabled: true,
  },
  {
    id: "floor-plans-2d-3d",
    label: "Floor Plans / 2D–3D",
    href: homeSectionHref(HOME_SECTION_IDS.floorPlans),
    enabled: true,
  },
  {
    id: "ai-media",
    label: "AI Media",
    href: homeSectionHref(HOME_SECTION_IDS.aiMedia),
    enabled: true,
  },
  {
    id: "laser-scanning-scan-to-bim",
    label: "Scan-to-BIM",
    href: homeSectionHref(HOME_SECTION_IDS.scanToBim),
    enabled: true,
  },
] as const satisfies readonly ServiceCatalogItem[];

export const WEB_PAGES_NAV_ITEM = {
  id: "property-landing-pages",
  label: "Web Pages",
  href: WEB_PAGES_PATH,
  enabled: true,
} as const satisfies ServiceCatalogItem;
