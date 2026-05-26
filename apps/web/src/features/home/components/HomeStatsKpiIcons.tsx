import type { HomeStatFooterIcon, HomeStatIcon } from "@/features/home/content/homeStatsCopy";

const ICON_STROKE = 1.75;

type HomeStatsKpiIconProps = {
  variant: HomeStatIcon | HomeStatFooterIcon;
  className?: string;
};

export function HomeStatsKpiIcon({ variant, className = "size-5" }: HomeStatsKpiIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths(variant)}
    </svg>
  );
}

function iconPaths(variant: HomeStatIcon | HomeStatFooterIcon) {
  switch (variant) {
    case "home":
      return (
        <>
          <path d="M4 20V9.5L12 5l8 4.5V20" />
          <path d="M9 20v-5h6v5" />
        </>
      );
    case "trend":
      return (
        <>
          <path d="M4 18 9 13l4 4 7-8" />
          <path d="M14 9h6v6" />
        </>
      );
    case "star":
      return (
        <polygon points="12 3 14.5 9 21 9.5 16.2 13.8 17.8 20.5 12 17 6.2 20.5 7.8 13.8 3 9.5 9.5 9" />
      );
    case "clock":
      return (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8v4.5l3 2" />
        </>
      );
    case "arrow-up":
      return (
        <>
          <path d="M12 19V6" />
          <path d="m7 11 5-5 5 5" />
        </>
      );
    case "lightning":
      return (
        <>
          <path d="M13 2 7 14h5.5L11 22l8-11h-5.5L13 2z" />
        </>
      );
    default:
      return null;
  }
}
