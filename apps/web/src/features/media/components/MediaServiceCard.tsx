import type { CSSProperties } from "react";
import Image from "next/image";
import { MediaServiceIcon } from "@/features/media/components/MediaServiceIcon";
import type { MediaService } from "@/features/media/content/mediaServicesCopy";
import { MEDIA_SERVICE_ASSETS } from "@/features/media/lib/mediaServiceAssets";

type MediaServiceCardProps = {
  service: MediaService;
};

export function MediaServiceCard({ service }: MediaServiceCardProps) {
  const assets = MEDIA_SERVICE_ASSETS[service.icon];

  return (
    <article
      className="media-service-card"
      style={
        {
          "--media-service-image-position": assets.imagePosition,
        } as CSSProperties
      }
    >
      <div className="media-service-card__photo" aria-hidden>
        <Image
          src={assets.imageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="media-service-card__photo-image"
        />
      </div>
      <div className="media-service-card__overlay" aria-hidden />
      <div className="media-service-card__content">
        <MediaServiceIcon icon={service.icon} />
        <h3 className="media-service-card__title">{service.title}</h3>
        <ul className="media-service-card__features">
          {service.features.map((feature) => (
            <li key={feature} className="media-service-card__feature">
              <MediaServiceFeatureCheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MediaServiceFeatureCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="media-service-card__check"
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
