import type { ReactNode } from "react";
import type { DataServicesOfferingIconId } from "@/features/services/data/content/dataServicesCopy";

const DATA_SERVICES_OFFERING_ICON_BOX_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-property-intelligence-navy text-white";

const DATA_SERVICES_OFFERING_ICON_SVG_CLASS = "size-6";

type DataServicesOfferingIconProps = {
  icon: DataServicesOfferingIconId;
};

export function DataServicesOfferingIcon({ icon }: DataServicesOfferingIconProps) {
  return (
    <span className={DATA_SERVICES_OFFERING_ICON_BOX_CLASS} aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={DATA_SERVICES_OFFERING_ICON_SVG_CLASS}
      >
        {OFFERING_ICON_PATHS[icon]}
      </svg>
    </span>
  );
}

const OFFERING_ICON_PATHS: Record<DataServicesOfferingIconId, ReactNode> = {
  "lidar-scanning": (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9 20v-6h6v6" />
      <path d="M9 13h6" />
    </>
  ),
  "bim-modeling": (
    <>
      <path d="M12 4 4 8v8l8 4 8-4V8l-8-4z" />
      <path d="M4 8l8 4 8-4M12 12v8" />
    </>
  ),
  "listings-valuations": (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
    </>
  ),
  "analytics-dashboards": (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-3M12 15V9M16 15V6" />
    </>
  ),
};
