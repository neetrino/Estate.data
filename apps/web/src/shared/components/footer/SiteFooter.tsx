import { FooterCopyright } from "@/shared/components/footer/FooterCopyright";
import { FooterLinkColumn } from "@/shared/components/footer/FooterLinkColumn";
import { FooterStudioColumn } from "@/shared/components/footer/FooterStudioColumn";
import {
  FOOTER_BRAND_TAGLINE,
  FOOTER_COMPANY_LINKS,
  FOOTER_SERVICES_LINKS,
} from "@/shared/components/footer/footerConfig";
import { LogoLink } from "@/shared/components/navbar";
import {
  FOOTER_BRAND_COLUMN_CLASS,
  FOOTER_BRAND_TAGLINE_OFFSET_CLASS,
  FOOTER_DIVIDER_CLASS,
  FOOTER_LINK_COLUMNS_OFFSET_CLASS,
  FOOTER_MAIN_ROW_CLASS,
  FOOTER_TOP_SEPARATOR_CLASS,
  LOGO_FOOTER_OFFSET_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";

const FOOTER_BRAND_TEXT_CLASS = `max-w-xs text-sm leading-relaxed text-muted-foreground ${FOOTER_BRAND_TAGLINE_OFFSET_CLASS}`;

export function SiteFooter() {
  return (
    <footer className={`hidden bg-white lg:block ${FOOTER_TOP_SEPARATOR_CLASS}`}>
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <div className={FOOTER_MAIN_ROW_CLASS}>
          <div className={FOOTER_BRAND_COLUMN_CLASS}>
            <div className={LOGO_FOOTER_OFFSET_CLASS}>
              <LogoLink tone="dark" size="footer" />
            </div>
            <p className={FOOTER_BRAND_TEXT_CLASS}>{FOOTER_BRAND_TAGLINE}</p>
          </div>
          <FooterLinkColumn
            title="Services"
            links={FOOTER_SERVICES_LINKS}
            className={FOOTER_LINK_COLUMNS_OFFSET_CLASS}
          />
          <FooterLinkColumn
            title="Company"
            links={FOOTER_COMPANY_LINKS}
            className={FOOTER_LINK_COLUMNS_OFFSET_CLASS}
          />
          <FooterStudioColumn />
        </div>

        <div className={FOOTER_DIVIDER_CLASS}>
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
}
