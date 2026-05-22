import Link from "next/link";
import { MediaServiceCard } from "@/features/media/components/MediaServiceCard";
import {
  MEDIA_PAGE_CTAS,
  MEDIA_SERVICES,
} from "@/features/media/content/mediaServicesCopy";
import { WHAT_WE_DO_CARD_GRID_GAP_CLASS } from "@/shared/lib/constants";

const MEDIA_SERVICES_GRID_CLASS = `mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`;

const MEDIA_SERVICES_CTA_ROW_CLASS = [
  "mt-10 flex flex-wrap gap-3",
  "max-sm:w-full max-sm:flex-nowrap max-sm:justify-center max-sm:gap-2.5",
].join(" ");

const MEDIA_SERVICES_CTA_BUTTON_BASE_CLASS = [
  "inline-flex h-12 items-center justify-center rounded-button px-8 text-base font-semibold",
  "max-sm:shrink-0 max-sm:px-6",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
].join(" ");

const MEDIA_SERVICES_PRIMARY_CTA_CLASS = [
  MEDIA_SERVICES_CTA_BUTTON_BASE_CLASS,
  "bg-property-intelligence-accent-dark text-white shadow transition-opacity hover:opacity-90",
].join(" ");

const MEDIA_SERVICES_SECONDARY_CTA_CLASS = [
  MEDIA_SERVICES_CTA_BUTTON_BASE_CLASS,
  "border border-foreground/15 bg-white text-property-intelligence-navy transition-colors hover:border-property-intelligence-accent/50",
].join(" ");

export function MediaServicesSection() {
  const { pricingLabel, pricingHref, bookLabel, bookHref } = MEDIA_PAGE_CTAS;

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20" aria-labelledby="media-services-heading">
      <h2 id="media-services-heading" className="sr-only">
        Media services
      </h2>
      <ul className={MEDIA_SERVICES_GRID_CLASS}>
        {MEDIA_SERVICES.map((service) => (
          <li key={service.id} className="min-w-0">
            <MediaServiceCard service={service} />
          </li>
        ))}
      </ul>
      <div className={MEDIA_SERVICES_CTA_ROW_CLASS}>
        <Link href={pricingHref} className={MEDIA_SERVICES_PRIMARY_CTA_CLASS}>
          {pricingLabel}
        </Link>
        <Link href={bookHref} className={MEDIA_SERVICES_SECONDARY_CTA_CLASS}>
          {bookLabel}
        </Link>
      </div>
    </section>
  );
}
