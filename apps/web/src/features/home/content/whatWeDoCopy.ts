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
  /** SVG icon at full size, no colored wrapper (e.g. scan-to-bim). */
  readonly iconPlain?: boolean;
};

export const HOME_WHAT_WE_DO_COPY = {
  title: "What we do",
  subtitleLines: [
    "End-to-end real estate media services",
    "From first capture to final delivery,",
    "we create premium visuals that help properties stand out and sell faster.",
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
      iconPlain: true,
    },
    {
      id: "market-intelligence",
      title: "AI Media",
      description: "Fast enhancement workflows with polished, listing-ready output.",
      icon: "market-intelligence",
    },
  ] as const satisfies readonly WhatWeDoService[],
} as const;
