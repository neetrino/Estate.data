import { FOOTER_BG_SOURCES } from "@/shared/components/footer/footerBgAssets";

import "@/shared/components/footer/site-footer.css";

export function SiteFooterBackground() {
  return (
    <div className="site-footer-bg-layer pointer-events-none" aria-hidden>
      <picture className="site-footer-bg-picture block" aria-hidden>
        <source
          media="(min-width: 1280px)"
          srcSet={FOOTER_BG_SOURCES.desktop}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={FOOTER_BG_SOURCES.tablet}
          type="image/webp"
        />
        <img
          src={FOOTER_BG_SOURCES.mobile}
          alt=""
          className="site-footer-bg-image size-full"
          decoding="async"
          fetchPriority="low"
        />
      </picture>
    </div>
  );
}
