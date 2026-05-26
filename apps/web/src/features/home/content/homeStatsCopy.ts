export type HomeStatCountFormat = {
  readonly end: number;
  readonly decimals: number;
  readonly suffix: string;
  readonly useGrouping?: boolean;
};

export type HomeStatAccent = "purple" | "cyan" | "yellow" | "orange";

export type HomeStatIcon = "home" | "trend" | "star" | "clock";

export type HomeStatFooterIcon = "arrow-up" | "trend" | "star" | "lightning";

export type HomeStat = {
  readonly id: string;
  readonly label: string;
  readonly footerText: string;
  readonly count: HomeStatCountFormat;
  readonly accent: HomeStatAccent;
  readonly icon: HomeStatIcon;
  readonly footerIcon: HomeStatFooterIcon;
};

export const HOME_STATS_COUNT_UP_DURATION_MS = 2_000;

export const HOME_STATS_COPY = {
  stats: [
    {
      id: "properties-shot",
      label: "Properties shot",
      footerText: "Capturing spaces that sell.",
      count: { end: 1200, decimals: 0, suffix: "+", useGrouping: true },
      accent: "purple",
      icon: "home",
      footerIcon: "arrow-up",
    },
    {
      id: "days-on-market",
      label: "Avg. faster days-on-market",
      footerText: "Helping listings sell, sooner.",
      count: { end: 38, decimals: 0, suffix: "%" },
      accent: "cyan",
      icon: "trend",
      footerIcon: "trend",
    },
    {
      id: "client-satisfaction",
      label: "Client satisfaction",
      footerText: "Loved by agents & homeowners.",
      count: { end: 4.9, decimals: 1, suffix: "/5" },
      accent: "yellow",
      icon: "star",
      footerIcon: "star",
    },
    {
      id: "turnaround",
      label: "Standard turnaround",
      footerText: "Fast. Reliable. Every time.",
      count: { end: 48, decimals: 0, suffix: " hr" },
      accent: "orange",
      icon: "clock",
      footerIcon: "lightning",
    },
  ] as const satisfies readonly HomeStat[],
} as const;
