import { LISTING_CTA_BANNER_BG_SOURCES } from "@/features/home/landing/lib/listingCtaBannerAssets";

import "@/features/home/styles/home-listing-cta-banner.css";

/** Full-width section backdrop — not painted on the CTA panel card. */
export function ListingCtaSectionBackground() {
  return (
    <div className="home-listing-cta-section__bg pointer-events-none" aria-hidden>
      <picture className="block size-full">
        <source
          media="(min-width: 1280px)"
          srcSet={LISTING_CTA_BANNER_BG_SOURCES.desktop}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={LISTING_CTA_BANNER_BG_SOURCES.tablet}
          type="image/webp"
        />
        <img
          src={LISTING_CTA_BANNER_BG_SOURCES.mobile}
          alt=""
          className="home-listing-cta-section__bg-image"
          decoding="async"
        />
      </picture>
    </div>
  );
}
