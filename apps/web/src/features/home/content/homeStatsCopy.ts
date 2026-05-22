export type HomeStatCountFormat = {
  readonly end: number;
  readonly decimals: number;
  readonly suffix: string;
  readonly useGrouping?: boolean;
};

export type HomeStat = {
  readonly id: string;
  readonly label: string;
  readonly count: HomeStatCountFormat;
};

export const HOME_STATS_COUNT_UP_DURATION_MS = 2_000;

export const HOME_STATS_COPY = {
  stats: [
    {
      id: "properties-shot",
      label: "Properties shot",
      count: { end: 1200, decimals: 0, suffix: "+", useGrouping: true },
    },
    {
      id: "days-on-market",
      label: "Avg. faster days-on-market",
      count: { end: 38, decimals: 0, suffix: "%" },
    },
    {
      id: "client-satisfaction",
      label: "Client satisfaction",
      count: { end: 4.9, decimals: 1, suffix: "/5" },
    },
    {
      id: "turnaround",
      label: "Standard turnaround",
      count: { end: 48, decimals: 0, suffix: " hr" },
    },
  ] as const satisfies readonly HomeStat[],
} as const;
