/** Service keys rendered on the public studio homepage. */
export const PUBLIC_STUDIO_SERVICE_KEYS = [
  "photography",
  "editing",
  "video",
  "ai-media",
  "drone",
  "tours",
  "scan-to-bim",
] as const;

export type PublicStudioServiceKey = (typeof PUBLIC_STUDIO_SERVICE_KEYS)[number];
