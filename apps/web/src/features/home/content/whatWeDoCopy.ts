export type WhatWeDoServiceIconId =
  | "photography"
  | "cinematic-video"
  | "drone-aerial"
  | "tours-floorplans"
  | "scan-to-bim"
  | "market-intelligence";

export type WhatWeDoService = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: WhatWeDoServiceIconId;
};

export const HOME_WHAT_WE_DO_COPY = {
  title: "What we do",
  subtitleLines: [
    "Media + Data, under one roof",
    "From the first drone pass to the final dashboard,",
    "we ship the assets and intelligence you need to move properties faster.",
  ] as const,
  services: [
    {
      id: "photography",
      title: "Photography",
      description: "Interior, exterior, twilight & virtual twilight.",
      icon: "photography",
    },
    {
      id: "cinematic-video",
      title: "Cinematic Video",
      description: "Walkthroughs and bespoke property films.",
      icon: "cinematic-video",
    },
    {
      id: "drone-aerial",
      title: "Drone & Aerial",
      description: "FAA Part 107 licensed pilots.",
      icon: "drone-aerial",
    },
    {
      id: "tours-floorplans",
      title: "3D Tours & Floorplans",
      description: "Matterport, dollhouse, schematic plans.",
      icon: "tours-floorplans",
    },
    {
      id: "scan-to-bim",
      title: "Scan to BIM",
      description: "LiDAR scanning, Revit BIM deliverables.",
      icon: "scan-to-bim",
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      description: "Listings data, valuations, CRM integrations.",
      icon: "market-intelligence",
    },
  ] as const satisfies readonly WhatWeDoService[],
} as const;
