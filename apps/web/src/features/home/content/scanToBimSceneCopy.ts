export const SCAN_TO_BIM_SCENE_LABELS = [
  { id: "lidar", text: "LiDAR Scan", position: "top-left" as const, accent: "cyan" as const },
  { id: "property", text: "Property Data", position: "mid-left" as const, accent: "cyan" as const },
  { id: "floorplans", text: "Floorplans", position: "mid-right" as const, accent: "purple" as const },
  { id: "analytics", text: "Analytics", position: "bottom-left" as const, accent: "yellow" as const },
  { id: "documents", text: "Documents", position: "bottom-right" as const, accent: "yellow" as const },
] as const;

export const SCAN_TO_BIM_SCENE_TIMING = {
  rotationCycleS: 32,
  scanCycleS: 8,
  pointCount: 42,
} as const;
