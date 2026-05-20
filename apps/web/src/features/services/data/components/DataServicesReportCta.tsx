import { DATA_SERVICES_REPORT_CTA_COPY } from "@/features/services/data/content/dataServicesCopy";
import {
  DATA_SERVICES_BOTTOM_CARD_PADDING_CLASS,
  DATA_SERVICES_BOTTOM_CARD_RADIUS_CLASS,
  DATA_SERVICES_BOTTOM_CARD_SHELL_CLASS,
} from "@/features/services/data/content/dataServicesLayout";
import { HOME_LISTING_CTA_BOOK_BUTTON_CLASS } from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const DATA_SERVICES_REPORT_CTA_SHELL_CLASS = [
  "home-listing-cta-panel",
  DATA_SERVICES_BOTTOM_CARD_SHELL_CLASS,
  DATA_SERVICES_BOTTOM_CARD_PADDING_CLASS,
  DATA_SERVICES_BOTTOM_CARD_RADIUS_CLASS,
  "flex flex-col justify-start shadow-[var(--client-voices-card-shadow)]",
].join(" ");

const DATA_SERVICES_REPORT_CTA_TITLE_CLASS =
  "text-2xl font-bold tracking-tight text-white sm:text-3xl";

const DATA_SERVICES_REPORT_CTA_DESCRIPTION_CLASS =
  "mt-3 max-w-md text-base leading-relaxed text-white/90";

const DATA_SERVICES_REPORT_CTA_BUTTON_CLASS = `max-w-full ${HOME_LISTING_CTA_BOOK_BUTTON_CLASS}`;

export function DataServicesReportCta() {
  const { title, description, buttonLabel, buttonHref } = DATA_SERVICES_REPORT_CTA_COPY;

  return (
    <section
      className={DATA_SERVICES_REPORT_CTA_SHELL_CLASS}
      aria-labelledby="data-report-cta-heading"
    >
      <h2 id="data-report-cta-heading" className={DATA_SERVICES_REPORT_CTA_TITLE_CLASS}>
        {title}
      </h2>
      <p className={DATA_SERVICES_REPORT_CTA_DESCRIPTION_CLASS}>{description}</p>
      <div className="mt-4 flex justify-start">
        <EstatePillButtonLink href={buttonHref} className={DATA_SERVICES_REPORT_CTA_BUTTON_CLASS}>
          {buttonLabel}
        </EstatePillButtonLink>
      </div>
    </section>
  );
}
