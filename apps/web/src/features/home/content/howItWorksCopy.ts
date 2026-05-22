export type HowItWorksAccent = "purple" | "cyan" | "yellow" | "orange" | "navy";

export type HowItWorksIconId =
  | "upload-data"
  | "organize-assets"
  | "process-store"
  | "analyze-track"
  | "scale-grow";

export type HowItWorksStep = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly accent: HowItWorksAccent;
  readonly icon: HowItWorksIconId;
};

export const HOME_HOW_IT_WORKS_COPY = {
  eyebrow: "How it works",
  title: "From raw data to intelligent real estate operations.",
  steps: [
    {
      id: "upload-data",
      title: "Upload Data",
      description: "Import property information, media, documents, and 3D assets.",
      accent: "purple",
      icon: "upload-data",
    },
    {
      id: "organize-assets",
      title: "Organize Assets",
      description: "We structure and organize everything in the cloud.",
      accent: "cyan",
      icon: "organize-assets",
    },
    {
      id: "process-store",
      title: "Process & Store",
      description: "Assets are processed, secured, and stored for easy access.",
      accent: "yellow",
      icon: "process-store",
    },
    {
      id: "analyze-track",
      title: "Analyze & Track",
      description: "Get real-time insights and track asset performance.",
      accent: "orange",
      icon: "analyze-track",
    },
    {
      id: "scale-grow",
      title: "Scale & Grow",
      description: "Collaborate across teams and scale your operations.",
      accent: "yellow",
      icon: "scale-grow",
    },
  ] as const satisfies readonly HowItWorksStep[],
} as const;
