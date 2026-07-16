import { ASSET_KEYS } from "@estate/db";
import { HOME_PROPERTY_INTELLIGENCE_VISUAL_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";

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
  titleLine1: "Media execution.",
  titleLine2: "Consultation to delivery.",
  description:
    "Work with our team to build the right media plan for your listing goals, timeline, and target audience.",
  features: [
    {
      title: "Tailored production planning",
      description: "Service mix aligned to property type, audience, and market.",
    },
    {
      title: "Premium visual quality",
      description: "Consistent standards across photo, video, drone, and edits.",
    },
    {
      title: "Fast turnarounds",
      description: "Reliable delivery timelines to support launch schedules.",
    },
    {
      title: "Expert collaboration",
      description: "A guided process from briefing through final handoff.",
    },
  ] as const satisfies readonly HomePropertyIntelligenceFeature[],
  ctaLabel: "Book Consultation",
  ctaHref: "/contact",
} as const;
