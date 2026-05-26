import {
  ADMIN_LOGIN_BG_1024_WEBP,
  ADMIN_LOGIN_BG_1920_WEBP,
  ADMIN_LOGIN_BG_2560_WEBP,
} from "@/features/admin/lib/admin-login-assets";

export function AdminLoginBackground() {
  return (
    <div className="admin-login-bg" aria-hidden>
      <div className="admin-login-bg__gradient-fallback" />
      <picture className="admin-login-bg__picture">
        <source
          media="(min-resolution: 2dppx) and (min-width: 1024px)"
          srcSet={ADMIN_LOGIN_BG_2560_WEBP}
          type="image/webp"
        />
        <source media="(min-width: 1280px)" srcSet={ADMIN_LOGIN_BG_2560_WEBP} type="image/webp" />
        <source media="(min-width: 768px)" srcSet={ADMIN_LOGIN_BG_1920_WEBP} type="image/webp" />
        <img
          src={ADMIN_LOGIN_BG_1920_WEBP}
          srcSet={`${ADMIN_LOGIN_BG_1024_WEBP} 1024w, ${ADMIN_LOGIN_BG_1920_WEBP} 1920w, ${ADMIN_LOGIN_BG_2560_WEBP} 2560w`}
          sizes="100vw"
          alt=""
          className="admin-login-bg__image-el"
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div className="admin-login-bg__overlay" />
      <div className="admin-login-bg__readability" />
    </div>
  );
}
