import Image from "next/image";
import { DATA_SERVICES_INTEGRATIONS_COPY } from "@/features/services/data/content/dataServicesCopy";

function IntegrationCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4 shrink-0 text-[#8B5CF6]"
      aria-hidden
    >
      <path
        d="M3 8.5 6.5 12 13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DataServicesIntegrationsCard() {
  const { title, items } = DATA_SERVICES_INTEGRATIONS_COPY;
  const leftColumn = items.filter((_, index) => index % 2 === 0);
  const rightColumn = items.filter((_, index) => index % 2 !== 0);

  return (
    <section className="data-bim-integrations-card" aria-labelledby="data-integrations-heading">
      <div className="data-bim-integrations-card__icon-wrap" aria-hidden>
        <Image
          src="/images/data-bim-services/icons/integrations-puzzle.png"
          alt=""
          width={148}
          height={148}
          className="size-[5.5rem] object-contain sm:size-[6.5rem]"
        />
      </div>
      <div className="data-bim-integrations-card__content">
        <h2 id="data-integrations-heading" className="data-bim-integrations-card__title">
          {title}
        </h2>
        <div className="data-bim-integrations-card__columns">
          <ul className="data-bim-integrations-card__list">
            {leftColumn.map((item) => (
              <li key={item} className="data-bim-integrations-card__item">
                <IntegrationCheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ul className="data-bim-integrations-card__list">
            {rightColumn.map((item) => (
              <li key={item} className="data-bim-integrations-card__item">
                <IntegrationCheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
