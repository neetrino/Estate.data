import { DataServicesOfferingCard } from "@/features/services/data/components/DataServicesOfferingCard";
import { DATA_SERVICES_OFFERINGS } from "@/features/services/data/content/dataServicesCopy";
import { ScrollRevealListItem } from "@/shared/components/reveal/ScrollRevealListItem";

const DATA_SERVICES_OFFERINGS_GRID_CLASS =
  "grid h-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-rows-2 lg:gap-5";

const DATA_SERVICES_OFFERINGS_ITEM_CLASS = "flex min-h-0 min-w-0";

export function DataServicesOfferingsGrid() {
  return (
    <ul className={DATA_SERVICES_OFFERINGS_GRID_CLASS}>
      {DATA_SERVICES_OFFERINGS.map((offering, index) => (
        <ScrollRevealListItem key={offering.id} index={index} className={DATA_SERVICES_OFFERINGS_ITEM_CLASS}>
          <DataServicesOfferingCard offering={offering} />
        </ScrollRevealListItem>
      ))}
    </ul>
  );
}
