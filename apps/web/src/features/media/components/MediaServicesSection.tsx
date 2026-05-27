import Link from "next/link";
import { MediaServiceCard } from "@/features/media/components/MediaServiceCard";
import {
  MEDIA_PAGE_CTAS,
  MEDIA_SERVICES,
} from "@/features/media/content/mediaServicesCopy";
import { MEDIA_PAGE_COPY } from "@/features/media/content/mediaPageCopy";
import "@/features/media/styles/media-services-section.css";

export function MediaServicesSection() {
  const { eyebrow, title, subtitle } = MEDIA_PAGE_COPY;
  const { pricingLabel, pricingHref, bookLabel, bookHref } = MEDIA_PAGE_CTAS;

  return (
    <section className="media-services-section" aria-labelledby="media-services-heading">
      <header>
        <p className="media-services-section__eyebrow">{eyebrow}</p>
        <h1 id="media-services-heading" className="media-services-section__title">
          {title}
        </h1>
        <p className="media-services-section__subtitle">{subtitle}</p>
      </header>

      <ul className="media-services-section__grid">
        {MEDIA_SERVICES.map((service) => (
          <li key={service.id} className="media-services-section__grid-item">
            <MediaServiceCard service={service} />
          </li>
        ))}
      </ul>

      <div className="media-services-section__cta-row">
        <Link href={pricingHref} className="media-services-section__cta-primary">
          {pricingLabel}
        </Link>
        <Link href={bookHref} className="media-services-section__cta-secondary">
          {bookLabel}
        </Link>
      </div>
    </section>
  );
}
