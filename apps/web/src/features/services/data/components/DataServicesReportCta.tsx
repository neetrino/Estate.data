import Image from "next/image";
import Link from "next/link";
import { DATA_SERVICES_REPORT_CTA_COPY } from "@/features/services/data/content/dataServicesCopy";

export function DataServicesReportCta() {
  const { title, description, buttonLabel, buttonHref } = DATA_SERVICES_REPORT_CTA_COPY;

  return (
    <section className="data-bim-report-card" aria-labelledby="data-report-cta-heading">
      <div className="data-bim-report-card__icon-wrap" aria-hidden>
        <Image
          src="/images/data-bim-services/icons/market-report.png"
          alt=""
          width={220}
          height={220}
          className="data-bim-report-card__icon"
        />
      </div>
      <div className="data-bim-report-card__content">
        <h2 id="data-report-cta-heading" className="data-bim-report-card__title">
          {title}
        </h2>
        <p className="data-bim-report-card__description">{description}</p>
        <div className="mt-5 flex justify-start">
          <Link href={buttonHref} className="data-bim-report-card__button">
            <span>{buttonLabel}</span>
            <span className="data-bim-report-card__button-arrow" aria-hidden>
              <svg viewBox="0 0 16 16" fill="none" className="size-4">
                <path
                  d="M3.5 8h8.2M8.5 4.8l3.2 3.2-3.2 3.2"
                  stroke="currentColor"
                  strokeWidth="1.65"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
