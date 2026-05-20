import { DATA_SERVICES_INTEGRATIONS_COPY } from "@/features/services/data/content/dataServicesCopy";
import {
  DATA_SERVICES_BOTTOM_CARD_PADDING_CLASS,
  DATA_SERVICES_BOTTOM_CARD_RADIUS_CLASS,
  DATA_SERVICES_BOTTOM_CARD_SHELL_CLASS,
} from "@/features/services/data/content/dataServicesLayout";

const DATA_SERVICES_INTEGRATIONS_CARD_CLASS = [
  DATA_SERVICES_BOTTOM_CARD_SHELL_CLASS,
  DATA_SERVICES_BOTTOM_CARD_PADDING_CLASS,
  DATA_SERVICES_BOTTOM_CARD_RADIUS_CLASS,
  "flex flex-col justify-start border border-foreground/10 bg-white shadow-[var(--client-voices-card-shadow)]",
].join(" ");

const DATA_SERVICES_INTEGRATIONS_TITLE_CLASS =
  "text-xl font-bold text-property-intelligence-navy";

const DATA_SERVICES_INTEGRATIONS_LIST_CLASS =
  "mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2";

const DATA_SERVICES_INTEGRATIONS_ITEM_CLASS =
  "flex items-center gap-2.5 text-base text-property-intelligence-navy";

function IntegrationCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="size-4 shrink-0 text-client-voices-accent"
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

  return (
    <section className={DATA_SERVICES_INTEGRATIONS_CARD_CLASS} aria-labelledby="data-integrations-heading">
      <h2 id="data-integrations-heading" className={DATA_SERVICES_INTEGRATIONS_TITLE_CLASS}>
        {title}
      </h2>
      <ul className={DATA_SERVICES_INTEGRATIONS_LIST_CLASS}>
        {items.map((item) => (
          <li key={item} className={DATA_SERVICES_INTEGRATIONS_ITEM_CLASS}>
            <IntegrationCheckIcon />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
