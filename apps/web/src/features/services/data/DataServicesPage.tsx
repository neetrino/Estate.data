import { DataServicesBody } from "@/features/services/data/components/DataServicesBody";
import { DATA_SERVICES_PAGE_COPY } from "@/features/services/data/content/dataServicesCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_SECTION_SURFACE_CLASS,
} from "@/shared/lib/constants";

const DATA_SERVICES_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-property-intelligence-accent sm:text-base";

const DATA_SERVICES_TITLE_CLASS =
  "mt-3 text-4xl font-bold tracking-tight text-property-intelligence-navy sm:text-5xl lg:text-[3rem]";

const DATA_SERVICES_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-property-intelligence-navy sm:text-xl";

export function DataServicesPage() {
  const { eyebrow, title, subtitle } = DATA_SERVICES_PAGE_COPY;

  return (
    <>
      <Navbar />
      <main className={WHAT_WE_DO_SECTION_SURFACE_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={DATA_SERVICES_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={DATA_SERVICES_TITLE_CLASS}>{title}</h1>
            <p className={DATA_SERVICES_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <DataServicesBody />
        </div>
      </main>
    </>
  );
}
