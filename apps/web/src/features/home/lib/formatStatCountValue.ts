import type { HomeStatCountFormat } from "@/features/home/content/homeStatsCopy";

/** Maps animated progress (0–1) to a display string matching the target stat format. */
export function formatStatCountValue(
  progress: number,
  config: HomeStatCountFormat,
): string {
  const current = config.end * progress;
  const rounded =
    config.decimals === 0
      ? Math.round(current)
      : Number(current.toFixed(config.decimals));

  const numeric =
    config.useGrouping && config.decimals === 0
      ? rounded.toLocaleString("en-US")
      : config.decimals === 0
        ? String(rounded)
        : rounded.toFixed(config.decimals);

  return `${numeric}${config.suffix}`;
}

/** Ease-out cubic — fast start, soft landing. */
export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}
