export type HomeStat = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
};

export const HOME_STATS_COPY = {
  stats: [
    {
      id: "properties-shot",
      value: "1,200+",
      label: "Properties shot",
    },
    {
      id: "days-on-market",
      value: "38%",
      label: "Avg. faster days-on-market",
    },
    {
      id: "client-satisfaction",
      value: "4.9/5",
      label: "Client satisfaction",
    },
    {
      id: "turnaround",
      value: "48 hr",
      label: "Standard turnaround",
    },
  ] as const satisfies readonly HomeStat[],
} as const;
