import Image from "next/image";
import type { DataServicesOfferingIconId } from "@/features/services/data/content/dataServicesCopy";

type DataServicesOfferingIconProps = {
  icon: DataServicesOfferingIconId;
};

export function DataServicesOfferingIcon({ icon }: DataServicesOfferingIconProps) {
  const iconPath = OFFERING_ICON_ASSET_PATH[icon];

  return (
    <span className="data-bim-service-card__icon-badge" aria-hidden>
      <Image src={iconPath} alt="" width={88} height={88} className="size-[5.5rem] object-contain" />
    </span>
  );
}

const OFFERING_ICON_ASSET_PATH: Record<DataServicesOfferingIconId, string> = {
  "lidar-scanning": "/icons/data-bim-services/lidar-scanning.png",
  "bim-modeling": "/icons/data-bim-services/bim-modeling.png",
  "listings-valuations": "/icons/data-bim-services/listings-valuations.png",
  "analytics-dashboards": "/icons/data-bim-services/analytics-dashboards.png",
};
