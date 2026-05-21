import type { LandingAccent } from "@/features/home/landing/lib/landingStyles";

type LandingModuleIconProps = {
  accent: LandingAccent;
  variant: number;
};

export function LandingModuleIcon({ accent, variant }: LandingModuleIconProps) {
  const stroke = accentStroke(accent);

  return (
    <svg
      className="size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths(variant)}
    </svg>
  );
}

function accentStroke(accent: LandingAccent): string {
  const map: Record<LandingAccent, string> = {
    purple: "#873c83",
    cyan: "#16c0da",
    yellow: "#fdba2c",
    orange: "#e55100",
    navy: "#2e4873",
  };
  return map[accent];
}

function iconPaths(variant: number) {
  switch (variant % 4) {
    case 0:
      return (
        <>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M9 20v-6h6v6" />
        </>
      );
    case 1:
      return (
        <>
          <path d="M3 17l6-6 4 4 8-10" />
          <path d="M14 5h7v7" />
        </>
      );
    case 2:
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 15l3-3 2 2 5-6" />
        </>
      );
    default:
      return (
        <>
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <circle cx="12" cy="12" r="4" />
        </>
      );
  }
}
