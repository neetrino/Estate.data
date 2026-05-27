import {
  MEDIA_PAGE_BG_CACHE_VERSION,
  MEDIA_PAGE_BG_SOURCES,
} from "@/features/media/lib/mediaPageBgAssets";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";

export function MediaPageBackground() {
  const cacheSuffix = `?v=${MEDIA_PAGE_BG_CACHE_VERSION}`;

  return (
    <div
      className="media-page-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 block size-full min-h-full" aria-hidden>
        <picture className="absolute inset-0 block size-full min-h-full">
          <source
            media="(min-width: 1280px)"
            srcSet={`${MEDIA_PAGE_BG_SOURCES.desktop}${cacheSuffix}`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${MEDIA_PAGE_BG_SOURCES.tablet}${cacheSuffix}`}
          />
          <img
            src={`${MEDIA_PAGE_BG_SOURCES.mobile}${cacheSuffix}`}
            alt=""
            width={2560}
            height={1440}
            decoding="async"
            className="media-page-bg-image size-full min-h-full"
          />
        </picture>
      </div>
      <div className="media-page-photo-scrim absolute inset-0" />
      <FooterPageBridge from="white" />
    </div>
  );
}
