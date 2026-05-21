import type { ReactNode } from "react";
import type { SolutionsRoleIconId } from "@/features/solutions/content/solutionsRolesCopy";
import { SOLUTIONS_ROLE_ICON_BOX_CLASS } from "@/shared/lib/constants";

const SOLUTIONS_ROLE_ICON_SVG_CLASS = "size-6";

type SolutionsRoleIconProps = {
  icon: SolutionsRoleIconId;
};

export function SolutionsRoleIcon({ icon }: SolutionsRoleIconProps) {
  return (
    <span className={SOLUTIONS_ROLE_ICON_BOX_CLASS} aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={SOLUTIONS_ROLE_ICON_SVG_CLASS}
      >
        {ICON_PATHS[icon]}
      </svg>
    </span>
  );
}

const ICON_PATHS: Record<SolutionsRoleIconId, ReactNode> = {
  brokers: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </>
  ),
  developers: (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  "property-managers": (
    <>
      <path d="M12 2v4" />
      <path d="M6 6h12l-1 14H7L6 6z" />
      <circle cx="12" cy="14" r="2" />
    </>
  ),
  lenders: (
    <>
      <path d="M3 10h18" />
      <path d="M5 10V8a7 7 0 0 1 14 0v2" />
      <rect x="3" y="10" width="18" height="10" rx="2" />
    </>
  ),
  investors: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-3M12 15V9M16 15V6" />
    </>
  ),
};
