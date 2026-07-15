import Image from "next/image";
import { EstatePillButtonLink } from "@/shared/ui/button";
import { INNER_PAGE_MAIN_CLASS, SITE_PAGE_SHELL_CLASS } from "@/shared/lib/constants";
import type { ServiceDetailCopy } from "@/features/services/shared/serviceDetailCopy";
import "@/features/services/shared/styles/service-detail-page.css";

type ServiceDetailPageProps = {
  readonly copy: ServiceDetailCopy;
};

export function ServiceDetailPage({ copy }: ServiceDetailPageProps) {
  return (
    <main className={`${INNER_PAGE_MAIN_CLASS} service-detail-page`}>
      <div className={`${SITE_PAGE_SHELL_CLASS} service-detail-page__content`}>
        <section className="service-detail-page__hero" aria-labelledby="service-detail-heading">
          <div className="service-detail-page__hero-grid">
            <div className="service-detail-page__hero-copy">
              <p className="service-detail-page__eyebrow">{copy.heroLabel}</p>
              <h1 id="service-detail-heading" className="service-detail-page__title">
                {copy.title}
              </h1>
              <p className="service-detail-page__description">{copy.description}</p>
              <p className="service-detail-page__summary">{copy.serviceSummary}</p>
              <div className="service-detail-page__cta-row">
                <EstatePillButtonLink href="/contact">Book Now</EstatePillButtonLink>
                <EstatePillButtonLink href="/contact" accent="blue">
                  Book Consultation
                </EstatePillButtonLink>
              </div>
            </div>

            <figure className="service-detail-page__hero-media">
              <Image
                src={copy.heroImage.src}
                alt={copy.heroImage.alt}
                fill
                sizes="(max-width: 767px) 100vw, 42vw"
                className="service-detail-page__hero-image"
                priority
              />
            </figure>
          </div>

          <div className="service-detail-page__metrics-grid">
            {copy.metrics.map((metric) => (
              <article key={metric.label} className="service-detail-page__metric-card">
                <p className="service-detail-page__metric-value">{metric.value}</p>
                <p className="service-detail-page__metric-label">{metric.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-detail-page__section" aria-label="Service gallery">
          <h2 className="service-detail-page__section-title">Visual direction</h2>
          <div className="service-detail-page__gallery-grid">
            {copy.gallery.map((image) => (
              <figure key={image.src} className="service-detail-page__gallery-card">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                  className="service-detail-page__gallery-image"
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="service-detail-page__section" aria-label="Service highlights">
          <h2 className="service-detail-page__section-title">What is included</h2>
          <div className="service-detail-page__highlights-grid">
            {copy.highlights.map((highlight) => (
              <article key={highlight.title} className="service-detail-page__highlight-card">
                <h3 className="service-detail-page__card-title">{highlight.title}</h3>
                <p className="service-detail-page__card-body">{highlight.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="service-detail-page__split-grid" aria-label="Workflow and packages">
          <article className="service-detail-page__panel">
            <h2 className="service-detail-page__section-title">Workflow</h2>
            <ol className="service-detail-page__workflow-list">
              {copy.workflow.map((step) => (
                <li key={step.title} className="service-detail-page__workflow-item">
                  <h3 className="service-detail-page__card-title">{step.title}</h3>
                  <p className="service-detail-page__card-body">{step.description}</p>
                </li>
              ))}
            </ol>
          </article>

          <article className="service-detail-page__panel">
            <h2 className="service-detail-page__section-title">Sample packages</h2>
            <div className="service-detail-page__packages-list">
              {copy.packages.map((pkg) => (
                <article key={pkg.name} className="service-detail-page__package-card">
                  <header className="service-detail-page__package-head">
                    <h3 className="service-detail-page__card-title">{pkg.name}</h3>
                    <p className="service-detail-page__package-price">{pkg.startingAt}</p>
                  </header>
                  <p className="service-detail-page__package-turnaround">
                    Turnaround: <span>{pkg.turnaround}</span>
                  </p>
                  <ul className="service-detail-page__package-list">
                    {pkg.inclusions.map((inclusion) => (
                      <li key={inclusion}>{inclusion}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="service-detail-page__section" aria-label="Frequently asked questions">
          <h2 className="service-detail-page__section-title">FAQ</h2>
          <div className="service-detail-page__faq-grid">
            {copy.faq.map((entry) => (
              <article key={entry.question} className="service-detail-page__faq-card">
                <h3 className="service-detail-page__card-title">{entry.question}</h3>
                <p className="service-detail-page__card-body">{entry.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
