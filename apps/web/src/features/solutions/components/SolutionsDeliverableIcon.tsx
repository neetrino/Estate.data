import type { ReactNode } from "react";
import type { SolutionsDeliverableIconId } from "@/features/solutions/content/solutionsRolesCopy";

const SOLUTIONS_DELIVERABLE_ICON_SVG_BASE_CLASS = "size-5 shrink-0 sm:size-6";

type SolutionsDeliverableIconProps = {
  icon: SolutionsDeliverableIconId;
  colorClass: string;
};

export function SolutionsDeliverableIcon({ icon, colorClass }: SolutionsDeliverableIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${SOLUTIONS_DELIVERABLE_ICON_SVG_BASE_CLASS} ${colorClass}`}
      aria-hidden
    >
      {ICON_PATHS[icon]}
    </svg>
  );
}

const ICON_PATHS: Record<SolutionsDeliverableIconId, ReactNode> = {
  photo: (
    <>
      <path d="M4 7h3l2-3h6l2 3h3v12H4V7z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  drone: (
    <>
      <path d="M12 10v4" />
      <path d="M8 12H4l2-2M16 12h4l-2-2M8 12l-2 2M16 12l2 2" />
      <rect x="9" y="12" width="6" height="2" rx="1" />
    </>
  ),
  "tour-3d": (
    <>
      <path d="M12 3 20 7v10l-8 4-8-4V7l8-4z" />
      <path d="m12 11 8-4M12 11v10M12 11 4 7" />
    </>
  ),
  "listing-website": (
    <>
      <rect x="3" y="5" width="18" height="12" rx="2" />
      <path d="M8 19h8" />
      <path d="M9 9h6M9 12h4" />
    </>
  ),
  "comps-brief": (
    <>
      <path d="M7 4h10v16H7z" />
      <path d="M10 8h4M10 11h4" />
      <path d="M10 15h2" />
      <path d="M15 15v3M13 17h4" />
    </>
  ),
  "site-captures": (
    <>
      <path d="M4 18V8l8-4 8 4v10" />
      <path d="M9 18v-5h6v5" />
      <circle cx="12" cy="10" r="1.5" />
    </>
  ),
  bim: (
    <>
      <path d="M4 20 12 4l8 16H4z" />
      <path d="M8.5 14h7" />
    </>
  ),
  "project-microsite": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  "market-study": (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-3M12 15V9M16 15V6" />
    </>
  ),
  "volume-photo": (
    <>
      <rect x="3" y="5" width="7" height="7" rx="1" />
      <rect x="14" y="5" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="5" rx="1" />
      <rect x="14" y="14" width="7" height="5" rx="1" />
    </>
  ),
  "virtual-tours": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  "performance-dashboard": (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 14v-3M12 14V8M17 14v-5" />
    </>
  ),
  "lidar-bim": (
    <>
      <path d="M12 3v18" />
      <path d="M6 8h12M6 16h12" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  valuation: (
    <>
      <path d="M12 3v18" />
      <path d="M7 8h10l-2 4H9l2 4" />
    </>
  ),
  "risk-dashboard": (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="M8 14l3-3 2 2 3-4" />
    </>
  ),
  "market-reports": (
    <>
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6M9 11h6M9 14h4" />
    </>
  ),
  comps: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-4M12 16V8M16 16v-6" />
    </>
  ),
  "due-diligence-shoot": (
    <>
      <path d="M4 7h3l2-3h6l2 3h3v12H4V7z" />
      <path d="M9 14l2 2 4-4" />
    </>
  ),
};
