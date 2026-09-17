export const HOME_HERO_COPY_MODES = ["shared", "perSlide"] as const;

export type HomeHeroCopyMode = (typeof HOME_HERO_COPY_MODES)[number];

/** Coerce a stored string to a known copy mode. */
export function parseHomeHeroCopyMode(value: string): HomeHeroCopyMode {
  return value === "perSlide" ? "perSlide" : "shared";
}
