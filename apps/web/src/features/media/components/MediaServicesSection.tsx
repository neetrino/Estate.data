import Link from "next/link";
import { MediaServiceCard } from "@/features/media/components/MediaServiceCard";
import { MediaRevealListItem } from "@/features/media/components/MediaRevealListItem";
import {
  MEDIA_PAGE_CTAS,
  MEDIA_SERVICES,
} from "@/features/media/content/mediaServicesCopy";
import { MEDIA_PAGE_COPY } from "@/features/media/content/mediaPageCopy";
import {
  PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS,
} from "@/shared/lib/constants";
import "@/features/media/styles/media-services-section.css";

export function MediaServicesSection() {
  const { eyebrow, title, subtitle } = MEDIA_PAGE_COPY;
  const { pricingLabel, pricingHref, bookLabel, bookHref } = MEDIA_PAGE_CTAS;

  return (
    <section className="media-services-section" aria-labelledby="media-services-heading">
      <header>
        <p className={PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
        <h1
          id="media-services-heading"
          className={[PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS, "lg:whitespace-nowrap"].join(" ")}
        >
          {title}
        </h1>
        <p className={PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
      </header>

      <ul className="media-services-section__grid">
        {MEDIA_SERVICES.map((service, index) => (
          <MediaRevealListItem key={service.id} index={index}>
            <MediaServiceCard service={service} />
          </MediaRevealListItem>
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
