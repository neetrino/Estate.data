import { DataServicesFeatureImage } from "@/features/services/data/components/DataServicesFeatureImage";
import { DataServicesIntegrationsCard } from "@/features/services/data/components/DataServicesIntegrationsCard";
import { DataServicesOfferingsGrid } from "@/features/services/data/components/DataServicesOfferingsGrid";
import { DataServicesReportCta } from "@/features/services/data/components/DataServicesReportCta";
import { ScrollRevealBlock } from "@/shared/components/reveal/ScrollRevealBlock";
import { HOME_STATS_GRID_GAP_CLASS } from "@/shared/lib/constants";

const DATA_SERVICES_BODY_CLASS = `mt-10 lg:mt-12 flex flex-col ${HOME_STATS_GRID_GAP_CLASS}`;

const DATA_SERVICES_TOP_ROW_CLASS = `grid grid-cols-1 lg:grid-cols-2 lg:items-stretch ${HOME_STATS_GRID_GAP_CLASS}`;

const DATA_SERVICES_BOTTOM_ROW_CLASS = `grid grid-cols-1 lg:grid-cols-2 lg:items-stretch ${HOME_STATS_GRID_GAP_CLASS}`;

export function DataServicesBody() {
  return (
    <div className={DATA_SERVICES_BODY_CLASS}>
      <div className={DATA_SERVICES_TOP_ROW_CLASS}>
        <DataServicesFeatureImage />
        <DataServicesOfferingsGrid />
      </div>
      <div className={DATA_SERVICES_BOTTOM_ROW_CLASS}>
        <ScrollRevealBlock className="min-h-0" index={0}>
          <DataServicesIntegrationsCard />
        </ScrollRevealBlock>
        <ScrollRevealBlock className="min-h-0" index={1}>
          <DataServicesReportCta />
        </ScrollRevealBlock>
      </div>
    </div>
  );
}
