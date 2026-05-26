export type HeroDashboardMetricIcon = "home" | "clock" | "star";

export type HeroDashboardMetric = {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly trend: string;
  readonly icon: HeroDashboardMetricIcon;
  readonly accent: "purple" | "cyan" | "orange";
};

export type HeroDashboardBottomStatIcon = "eye" | "users" | "message" | "building";

export type HeroDashboardBottomStatAccent = "purple" | "cyan" | "pink" | "orange";

export type HeroDashboardBottomStat = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly icon: HeroDashboardBottomStatIcon;
  readonly accent: HeroDashboardBottomStatAccent;
};

export const HERO_DASHBOARD_COPY = {
  chart: {
    title: "Media + data overview",
    periodLabel: "Last 30 days",
    tooltipDate: "May 22, 2024",
    tooltipValues: {
      views: "32.6K",
      engagement: "18.4K",
      inquiries: "12.7K",
    },
    xAxisLabels: ["May 1", "May 8", "May 15", "May 22", "May 29"] as const,
    yAxisLabels: ["0", "10K", "20K", "30K", "40K"] as const,
    tooltipIndex: 3,
    legend: [
      { id: "views", label: "Views", color: "#8B5CF6" },
      { id: "engagement", label: "Engagement", color: "#3B82F6" },
      { id: "inquiries", label: "Inquiries", color: "#EC4899" },
    ] as const,
    series: [
      {
        id: "views",
        color: "#8B5CF6",
        values: [22_000, 26_000, 29_500, 32_600, 35_200] as const,
      },
      {
        id: "engagement",
        color: "#3B82F6",
        values: [12_000, 14_200, 16_100, 18_400, 19_600] as const,
      },
      {
        id: "inquiries",
        color: "#EC4899",
        values: [7_500, 9_100, 10_600, 12_700, 13_500] as const,
      },
    ] as const,
  },
  topMetrics: [
    {
      id: "properties-shot",
      value: "1,200+",
      label: "Properties shot",
      trend: "18% vs last month",
      icon: "home",
      accent: "purple",
    },
    {
      id: "days-on-market",
      value: "38%",
      label: "Avg. faster days-on-market",
      trend: "12% vs last month",
      icon: "clock",
      accent: "cyan",
    },
    {
      id: "client-satisfaction",
      value: "4.9/5",
      label: "Client satisfaction",
      trend: "0.3 vs last month",
      icon: "star",
      accent: "orange",
    },
  ] as const satisfies readonly HeroDashboardMetric[],
  donut: {
    title: "Avg. faster days-on-market",
    value: "38%",
    baselineLabel: "60 days",
    trend: "12% vs last month",
    percent: 38,
  },
  sparkline: {
    title: "Standard turnaround",
    value: "48 hr",
    trend: "8% vs last month",
  },
  bottomStats: [
    { id: "views", label: "Total Views", value: "2.4M", icon: "eye", accent: "purple" },
    { id: "engagement", label: "Engagement", value: "620K", icon: "users", accent: "cyan" },
    { id: "inquiries", label: "Inquiries", value: "89K", icon: "message", accent: "pink" },
    { id: "properties", label: "Properties", value: "1,200+", icon: "building", accent: "orange" },
  ] as const satisfies readonly HeroDashboardBottomStat[],
} as const;
