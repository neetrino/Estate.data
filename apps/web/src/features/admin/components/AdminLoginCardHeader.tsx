import Image from "next/image";
import { AdminLoginShieldIcon } from "@/features/admin/components/AdminLoginIcons";
import { ADMIN_LOGIN_COPY } from "@/features/admin/content/adminCopy";
import {
  ADMIN_LOGIN_BRAND_CLASS,
  ADMIN_LOGIN_BRAND_LOGO_CLASS,
  ADMIN_LOGIN_BRAND_TEXT_CLASS,
  ADMIN_LOGIN_EYEBROW_CLASS,
  ADMIN_LOGIN_HEADER_CLASS,
  ADMIN_LOGIN_SUBTITLE_CLASS,
  ADMIN_LOGIN_TITLE_CLASS,
} from "@/features/admin/lib/admin-login-styles";
import { SITE_LOGO_CACHE_VERSION, SITE_LOGO_PATH } from "@/shared/components/navbar/navConfig";

const ADMIN_LOGIN_LOGO_WIDTH_PX = 72;
const ADMIN_LOGIN_LOGO_HEIGHT_PX = 72;

export function AdminLoginCardHeader() {
  return (
    <div className="admin-login-card__intro">
      <div className={`${ADMIN_LOGIN_BRAND_CLASS} admin-login-card__brand`}>
        <Image
          src={`${SITE_LOGO_PATH}?v=${SITE_LOGO_CACHE_VERSION}`}
          alt=""
          width={ADMIN_LOGIN_LOGO_WIDTH_PX}
          height={ADMIN_LOGIN_LOGO_HEIGHT_PX}
          priority
          unoptimized
          className={ADMIN_LOGIN_BRAND_LOGO_CLASS}
        />
        <span className={ADMIN_LOGIN_BRAND_TEXT_CLASS}>{ADMIN_LOGIN_COPY.brandName}</span>
      </div>

      <header className={ADMIN_LOGIN_HEADER_CLASS}>
        <p className={ADMIN_LOGIN_EYEBROW_CLASS}>
          <AdminLoginShieldIcon />
          {ADMIN_LOGIN_COPY.eyebrow}
        </p>
        <h1 className={ADMIN_LOGIN_TITLE_CLASS}>{ADMIN_LOGIN_COPY.title}</h1>
        <p className={ADMIN_LOGIN_SUBTITLE_CLASS}>{ADMIN_LOGIN_COPY.subtitle}</p>
      </header>
    </div>
  );
}
