import { DataServicesOfferingIcon } from "@/features/services/data/components/DataServicesOfferingIcon";
import type { DataServicesOffering } from "@/features/services/data/content/dataServicesCopy";

type DataServicesOfferingCardProps = {
  offering: DataServicesOffering;
};

export function DataServicesOfferingCard({ offering }: DataServicesOfferingCardProps) {
  return (
    <article className="data-bim-service-card">
      <DataServicesOfferingIcon icon={offering.icon} />
      <h3 className="data-bim-service-card__title">{offering.title}</h3>
      <p className="data-bim-service-card__description">{offering.description}</p>
    </article>
  );
}
