import { DataServicesFeatureImage } from "@/features/services/data/components/DataServicesFeatureImage";
import { DataServicesIntegrationsCard } from "@/features/services/data/components/DataServicesIntegrationsCard";
import { DataServicesOfferingsGrid } from "@/features/services/data/components/DataServicesOfferingsGrid";
import { DataServicesReportCta } from "@/features/services/data/components/DataServicesReportCta";
import { ScrollRevealBlock } from "@/shared/components/reveal/ScrollRevealBlock";

export function DataServicesBody() {
  return (
    <div className="data-bim-layout">
      <section className="data-bim-layout__top" aria-label="Data and BIM services">
        <DataServicesFeatureImage />
        <DataServicesOfferingsGrid />
      </section>
      <section className="data-bim-layout__bottom" aria-label="Integrations and report">
        <ScrollRevealBlock className="min-h-0" index={0}>
          <DataServicesIntegrationsCard />
        </ScrollRevealBlock>
        <ScrollRevealBlock className="min-h-0" index={1}>
          <DataServicesReportCta />
        </ScrollRevealBlock>
      </section>
    </div>
  );
}
