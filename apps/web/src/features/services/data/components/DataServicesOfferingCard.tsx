import { DataServicesOfferingIcon } from "@/features/services/data/components/DataServicesOfferingIcon";
import type { DataServicesOffering } from "@/features/services/data/content/dataServicesCopy";

const DATA_SERVICES_OFFERING_CARD_CLASS =
  "flex h-full min-h-0 w-full flex-col rounded-2xl border border-foreground/10 bg-white p-5 shadow-[var(--client-voices-card-shadow)] sm:p-6";

const DATA_SERVICES_OFFERING_TITLE_CLASS =
  "mt-5 text-lg font-bold text-property-intelligence-navy";

const DATA_SERVICES_OFFERING_DESCRIPTION_CLASS =
  "mt-2 flex-1 text-base leading-relaxed text-muted-foreground";

type DataServicesOfferingCardProps = {
  offering: DataServicesOffering;
};

export function DataServicesOfferingCard({ offering }: DataServicesOfferingCardProps) {
  return (
    <article className={DATA_SERVICES_OFFERING_CARD_CLASS}>
      <DataServicesOfferingIcon icon={offering.icon} />
      <h3 className={DATA_SERVICES_OFFERING_TITLE_CLASS}>{offering.title}</h3>
      <p className={DATA_SERVICES_OFFERING_DESCRIPTION_CLASS}>{offering.description}</p>
    </article>
  );
}
