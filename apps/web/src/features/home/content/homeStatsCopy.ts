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
      id: "storage",
      label: "Cloud storage delivered",
      count: { end: 2.4, decimals: 1, suffix: "TB+" },
    },
    {
      id: "properties-shot",
      label: "Properties shot",
      count: { end: 1200, decimals: 0, suffix: "+", useGrouping: true },
    },
    {
      id: "data-sources",
      label: "Data sources integrated",
      count: { end: 300, decimals: 0, suffix: "+", useGrouping: true },
    },
    {
      id: "bim-models",
      label: "3D/BIM deliverables",
      count: { end: 48.7, decimals: 1, suffix: "K+" },
    },
    {
      id: "platform-uptime",
      label: "Delivery reliability",
      count: { end: 99.9, decimals: 1, suffix: "%" },
    },
  ] as const satisfies readonly HomeStat[],
} as const;
