import Image from "next/image";

export function DataServicesFeatureImage() {
  return (
    <article className="data-bim-feature-card" aria-label="BIM data flow illustration">
      <Image
        src="/images/data-bim-services/bim-illustration-v2.png"
        alt="Scan to BIM building visualization with LiDAR and data labels"
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="data-bim-feature-card__image"
        priority
      />
      <div className="data-bim-feature-card__scan-overlay" aria-hidden>
        <span className="data-bim-feature-card__scan-beam" />
        <span className="data-bim-feature-card__scan-grid" />
        <span className="data-bim-feature-card__scan-points" />
      </div>
    </article>
  );
}
