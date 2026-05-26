import { DataServicesBody } from "@/features/services/data/components/DataServicesBody";
import { DATA_SERVICES_PAGE_COPY } from "@/features/services/data/content/dataServicesCopy";
import {
  SITE_PAGE_SHELL_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_MAIN_CLASS,
} from "@/shared/lib/constants";

export function DataServicesPage() {
  const { eyebrow, title, subtitle } = DATA_SERVICES_PAGE_COPY;

  return (
    <main className={PROPERTY_INTELLIGENCE_PAGE_MAIN_CLASS}>
        <div className={SITE_PAGE_SHELL_CLASS}>
          <header>
            <p className={PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <DataServicesBody />
        </div>
    </main>
  );
}
