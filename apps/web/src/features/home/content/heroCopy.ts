import { DATA_BIM_PATH } from "@/shared/lib/routes";

type HeroTextSegment = {
  text: string;
  accent?: boolean;
};

export type HeroHeadlineLine = {
  segments: readonly HeroTextSegment[];
};

export const HOME_HERO_COPY = {
  locationBadge: "Serving Greater Los Angeles",
  headlineLines: [
    {
      segments: [{ text: "Stunning visuals.", accent: false }],
    },
    {
      segments: [{ text: "Actionable insights.", accent: true }],
    },
    {
      segments: [{ text: "Faster sales in LA.", accent: false }],
    },
  ] as const satisfies readonly HeroHeadlineLine[],
  descriptionLines: [
    "Estate Data pairs cinematic real estate media with property intelligence — so brokers,",
    "developers, and investors close deals with confidence.",
  ] as const,
  primaryCta: { label: "Book a Shoot", href: "/contact" },
  secondaryCta: { label: "Request a Market Report", href: DATA_BIM_PATH },
} as const;
