import { MediaServiceIcon } from "@/features/media/components/MediaServiceIcon";
import type { MediaService } from "@/features/media/content/mediaServicesCopy";
import {
  MEDIA_SERVICE_CARD_MIN_HEIGHT_PX,
  MEDIA_SERVICE_CARD_SURFACE_STYLE,
  WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX,
} from "@/shared/lib/constants";

const MEDIA_SERVICE_CARD_CLASS =
  "relative flex w-full flex-col overflow-hidden px-8 py-8 text-left";

const MEDIA_SERVICE_TITLE_CLASS = "mt-5 text-xl font-bold text-white";

const MEDIA_SERVICE_FEATURES_CLASS = "mt-4 flex flex-col gap-2.5";

const MEDIA_SERVICE_FEATURE_CLASS =
  "flex items-start gap-2.5 text-base leading-relaxed text-media-service-card-description";

type MediaServiceCardProps = {
  service: MediaService;
};

export function MediaServiceCard({ service }: MediaServiceCardProps) {
  return (
    <article
      className={MEDIA_SERVICE_CARD_CLASS}
      style={{
        minHeight: MEDIA_SERVICE_CARD_MIN_HEIGHT_PX,
        ...MEDIA_SERVICE_CARD_SURFACE_STYLE,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(${WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX}px)`,
        }}
      >
        <MediaServiceIcon icon={service.icon} />
        <h3 className={MEDIA_SERVICE_TITLE_CLASS}>{service.title}</h3>
        <ul className={MEDIA_SERVICE_FEATURES_CLASS}>
          {service.features.map((feature) => (
            <li key={feature} className={MEDIA_SERVICE_FEATURE_CLASS}>
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
      className="mt-0.5 size-4 shrink-0 text-client-voices-accent"
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
