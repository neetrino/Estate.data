import { HERO_LANDING_BG_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";

type HeroTextSegment = {
  text: string;
  accent?: boolean;
};

export type HeroHeadlineLine = {
  segments: readonly HeroTextSegment[];
};

export const DEFAULT_HOME_HERO_DESKTOP_IMAGE_URL = HERO_LANDING_BG_SOURCES.desktop;
export const DEFAULT_HOME_HERO_MOBILE_IMAGE_URL = HERO_LANDING_BG_SOURCES.mobile;

/** Resolved hero content passed to the landing page. */
export type HomeHeroContentFields = {
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
};

export const HOME_HERO_KEY = "home" as const;

export const HOME_HERO_COPY = {
  locationBadge: "Los Angeles · Real Estate Media + Digital Reality Capture",
  headlineLines: [
    {
      segments: [
        {
          text: "Make your property impossible to ignore.",
          accent: false,
        },
      ],
    },
  ] as const satisfies readonly HeroHeadlineLine[],
  descriptionLines: [
    "Premium real estate photography, cinematic video, drone, AI-powered media, Matterport 3D tours and professional reality capture — all under one roof.",
  ] as const,
  primaryCta: { label: "Book a Shoot", href: "/#contact" },
  secondaryCta: { label: "Explore Services", href: "/#photography" },
} as const;

/** Static fallback when the DB row is missing. */
export function getDefaultHomeHeroContent(): Omit<
  HomeHeroContentFields,
  "desktopImageUrl" | "mobileImageUrl"
> & {
  desktopImageUrl: string | null;
  desktopImageKey: string | null;
  mobileImageUrl: string | null;
  mobileImageKey: string | null;
} {
  return {
    title: HOME_HERO_COPY.headlineLines
      .map((line) => line.segments.map((segment) => segment.text).join(""))
      .join("\n"),
    description: HOME_HERO_COPY.descriptionLines.join(" "),
    primaryButtonLabel: HOME_HERO_COPY.primaryCta.label,
    primaryButtonHref: HOME_HERO_COPY.primaryCta.href,
    secondaryButtonLabel: HOME_HERO_COPY.secondaryCta.label,
    secondaryButtonHref: HOME_HERO_COPY.secondaryCta.href,
    desktopImageUrl: DEFAULT_HOME_HERO_DESKTOP_IMAGE_URL,
    desktopImageKey: null,
    mobileImageUrl: null,
    mobileImageKey: null,
  };
}

/** Resolve storefront image URLs with static fallbacks. */
export function resolveHomeHeroImageUrls(input: {
  desktopImageUrl: string | null | undefined;
  mobileImageUrl: string | null | undefined;
}): Pick<HomeHeroContentFields, "desktopImageUrl" | "mobileImageUrl"> {
  const desktopImageUrl = input.desktopImageUrl ?? DEFAULT_HOME_HERO_DESKTOP_IMAGE_URL;
  const mobileImageUrl = input.mobileImageUrl ?? desktopImageUrl;

  return {
    desktopImageUrl,
    mobileImageUrl,
  };
}

/** Split stored title into non-empty trimmed lines for rendering. */
export function splitHomeHeroTitleLines(title: string): string[] {
  return title
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
