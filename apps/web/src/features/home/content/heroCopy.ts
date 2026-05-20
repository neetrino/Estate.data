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
      segments: [
        { text: "Stunning visuals. ", accent: false },
        { text: "Actionable", accent: true },
      ],
    },
    {
      segments: [
        { text: "insights.", accent: true },
        { text: " Faster sales in LA.", accent: false },
      ],
    },
  ] as const satisfies readonly HeroHeadlineLine[],
  descriptionLines: [
    "LumenLA pairs cinematic real estate media with property intelligence — so brokers,",
    "developers, and investors close deals with confidence.",
  ] as const,
  primaryCta: { label: "Book a Shoot", href: "/contact" },
  secondaryCta: { label: "Request a Market Report", href: "/market-report" },
} as const;
