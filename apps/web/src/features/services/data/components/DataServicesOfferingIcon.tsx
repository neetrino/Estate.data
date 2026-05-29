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
  "lidar-scanning": "/images/data-bim-services/icons/lidar-scanning.png",
  "bim-modeling": "/images/data-bim-services/icons/bim-modeling.png",
  "listings-valuations": "/images/data-bim-services/icons/listings-valuations.png",
  "analytics-dashboards": "/images/data-bim-services/icons/analytics-dashboards.png",
};
