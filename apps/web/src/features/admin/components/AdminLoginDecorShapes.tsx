const ADMIN_LOGIN_DOT_COUNT = 12;

export function AdminLoginDecorShapes() {
  return (
    <div className="admin-login-decor" aria-hidden>
      <div className="admin-login-decor__sphere admin-login-decor__sphere--lg" />
      <div className="admin-login-decor__sphere admin-login-decor__sphere--md" />
      <div className="admin-login-decor__cube admin-login-decor__cube--one" />
      <div className="admin-login-decor__cube admin-login-decor__cube--two" />
      <div className="admin-login-decor__wave" />
      <div className="admin-login-decor__dots">
        {Array.from({ length: ADMIN_LOGIN_DOT_COUNT }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}
