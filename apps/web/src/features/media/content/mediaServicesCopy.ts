import { PRICING_PATH } from "@/shared/lib/routes";

export const MEDIA_SERVICE_ICON_IDS = [
  "photography",
  "cinematic-video",
  "drone-aerial",
  "tours-floorplans",
  "staging",
  "listing-websites",
] as const;

export type MediaServiceIconId = (typeof MEDIA_SERVICE_ICON_IDS)[number];

export type MediaService = {
  readonly id: string;
  readonly title: string;
  readonly icon: MediaServiceIconId;
  readonly features: readonly string[];
};

export const MEDIA_PAGE_CTAS = {
  pricingLabel: "See pricing tiers",
  pricingHref: PRICING_PATH,
  bookLabel: "Book a shoot",
  bookHref: "/contact",
} as const;

export const MEDIA_SERVICES: readonly MediaService[] = [
  {
    id: "photography",
    title: "Photography",
    icon: "photography",
    features: ["Interior & exterior", "Twilight & virtual twilight", "HDR & flash-blended"],
  },
  {
    id: "cinematic-video",
    title: "Cinematic Video",
    icon: "cinematic-video",
    features: ["Property walkthroughs", "Agent-branded films", "Lifestyle B-roll"],
  },
  {
    id: "drone-aerial",
    title: "Drone & Aerial",
    icon: "drone-aerial",
    features: ["FAA Part 107 pilots", "4K + 6K aerials", "Neighborhood context"],
  },
  {
    id: "tours-floorplans",
    title: "3D Tours & Floorplans",
    icon: "tours-floorplans",
    features: ["Matterport tours", "Schematic floorplans", "Dollhouse views"],
  },
  {
    id: "staging",
    title: "Staging & Virtual Staging",
    icon: "staging",
    features: ["Physical staging partners", "Virtual furnishings", "Item removal"],
  },
  {
    id: "listing-websites",
    title: "Listing Websites",
    icon: "listing-websites",
    features: ["Custom property URL", "Mobile-first templates", "Lead capture"],
  },
] as const;
