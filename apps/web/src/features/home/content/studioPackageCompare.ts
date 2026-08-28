export const STUDIO_PACKAGE_COMPARE = {
  eyebrow: "Compare",
  title: "What's in each package.",
  columns: ["Essential", "Digital", "Cinematic", "Complete"] as const,
  rows: [
    { service: "Photography", values: ["●", "●", "●", "●"] as const },
    { service: "Photo Editing", values: ["●", "●", "●", "●"] as const },
    { service: "Matterport 3D", values: ["—", "●", "—", "●"] as const },
    { service: "Floor Plan", values: ["—", "●", "—", "●"] as const },
    { service: "Drone Photos", values: ["—", "—", "●", "●"] as const },
    { service: "Drone Video", values: ["—", "—", "—", "●"] as const },
    { service: "Cinematic Video", values: ["—", "—", "●", "●"] as const },
    { service: "Social Media Video", values: ["—", "—", "●", "●"] as const },
    { service: "AI Media", values: ["Add-on", "Add-on", "Add-on", "Add-on"] as const },
    { service: "Delivery Time", values: ["24h", "48h", "48h", "72h"] as const },
  ],
} as const;
