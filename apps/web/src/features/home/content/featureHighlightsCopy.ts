export type FeatureHighlightIcon = "camera" | "chart" | "rocket";

export type FeatureHighlight = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: FeatureHighlightIcon;
  readonly accent: "purple" | "cyan" | "pink";
};

export const HOME_FEATURE_HIGHLIGHTS_COPY = {
  items: [
    {
      id: "cinematic-media",
      title: "Cinematic Media",
      subtitle: "That Sells",
      icon: "camera",
      accent: "purple",
    },
    {
      id: "data-intelligence",
      title: "Data Intelligence",
      subtitle: "You Can Act On",
      icon: "chart",
      accent: "cyan",
    },
    {
      id: "faster-decisions",
      title: "Faster Decisions.",
      subtitle: "Stronger Results",
      icon: "rocket",
      accent: "pink",
    },
  ] as const satisfies readonly FeatureHighlight[],
} as const;
