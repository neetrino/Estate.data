export type PricingSubtitleSegment = {
  readonly text: string;
  readonly tone: "subtitle" | "title";
};

export const PRICING_PAGE_COPY = {
  eyebrow: "PRICING",
  title: "Clear packages. No surprises.",
  subtitleSegments: [
    { text: "Media tiers ship in 48 hours. ", tone: "subtitle" },
    { text: "Add analytics anytime.", tone: "title" },
  ] as const satisfies readonly PricingSubtitleSegment[],
} as const;
