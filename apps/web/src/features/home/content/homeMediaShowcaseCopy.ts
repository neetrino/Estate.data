import { ASSET_KEYS } from "@estate/db";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";

const RECENT_WORK_PLACEHOLDER = resolveAssetUrl(ASSET_KEYS.recentWorkPlaceholder);

export type HomeMediaShowcaseItem = {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
};

export const HOME_MEDIA_SHOWCASE_COPY = {
  title: "Real estate media showcase",
  subtitle:
    "Interiors, exteriors, aerials, twilight scenes, luxury homes, commercial spaces, and architectural details.",
  rows: [
    [
      {
        id: "interior-1",
        src: "/images/hero-landing-bg-2560.webp",
        alt: "Premium interior living space with natural light",
      },
      {
        id: "aerial-1",
        src: "/images/what-we-do-bg-2560.webp",
        alt: "Aerial neighborhood context over luxury homes",
      },
      {
        id: "luxury-1",
        src: RECENT_WORK_PLACEHOLDER,
        alt: "Luxury property exterior at sunset",
      },
      {
        id: "architecture-1",
        src: "/images/client-voices/home-section-bg-2560.webp",
        alt: "Architectural facade details and modern lines",
      },
    ],
    [
      {
        id: "twilight-1",
        src: "/images/hero-landing-bg-mobile-20260528-v2.png",
        alt: "Twilight property photography with warm ambiance",
      },
      {
        id: "commercial-1",
        src: "/images/property-intelligence/home-visual.webp",
        alt: "Commercial real estate space with clean composition",
      },
      {
        id: "exterior-1",
        src: "/images/hero-landing-bg-2560.webp",
        alt: "Wide exterior shot of an upscale listing",
      },
      {
        id: "drone-1",
        src: RECENT_WORK_PLACEHOLDER,
        alt: "Drone perspective over hillside property",
      },
    ],
  ] as const satisfies readonly (readonly HomeMediaShowcaseItem[])[],
} as const;
