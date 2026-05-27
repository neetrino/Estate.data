import { DataBimPageBackground } from "@/features/services/data/components/DataBimPageBackground";
import { DataServicesBody } from "@/features/services/data/components/DataServicesBody";
import { DATA_SERVICES_PAGE_COPY } from "@/features/services/data/content/dataServicesCopy";
import "@/features/services/data/styles/data-bim-page.css";
import {
  DATA_BIM_PAGE_MAIN_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";

export function DataServicesPage() {
  const { eyebrow, title, subtitle } = DATA_SERVICES_PAGE_COPY;

  return (
    <main className={DATA_BIM_PAGE_MAIN_CLASS}>
      <DataBimPageBackground />

      <div className={`${SITE_PAGE_SHELL_CLASS} data-bim-page__content`}>
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
