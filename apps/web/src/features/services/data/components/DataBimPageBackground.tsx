import {
  DATA_BIM_PAGE_BG_CACHE_VERSION,
  DATA_BIM_PAGE_BG_SOURCES,
} from "@/features/services/data/lib/dataBimPageBgAssets";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";

export function DataBimPageBackground() {
  const cacheSuffix = `?v=${DATA_BIM_PAGE_BG_CACHE_VERSION}`;

  return (
    <div
      className="data-bim-page-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 block size-full min-h-full" aria-hidden>
        <picture className="absolute inset-0 block size-full min-h-full">
          <source
            media="(min-width: 1280px)"
            srcSet={`${DATA_BIM_PAGE_BG_SOURCES.desktop}${cacheSuffix}`}
            type="image/webp"
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${DATA_BIM_PAGE_BG_SOURCES.tablet}${cacheSuffix}`}
            type="image/webp"
          />
          <img
            src={`${DATA_BIM_PAGE_BG_SOURCES.mobile}${cacheSuffix}`}
            alt=""
            width={2560}
            height={1440}
            decoding="async"
            className="data-bim-page-bg-image size-full min-h-full"
          />
        </picture>
      </div>
      <div className="data-bim-page-photo-scrim absolute inset-0" />
      <FooterPageBridge from="white" />
    </div>
  );
}
