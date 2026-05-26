import { AdminLoginHomeIcon } from "@/features/admin/components/AdminLoginIcons";
import { ADMIN_LOGIN_COPY } from "@/features/admin/content/adminCopy";
import { ADMIN_LOGIN_HOME_LINK_CLASS } from "@/features/admin/lib/admin-login-styles";
import Link from "next/link";

export function AdminLoginHomeLink() {
  return (
    <Link href="/" className={ADMIN_LOGIN_HOME_LINK_CLASS}>
      <AdminLoginHomeIcon />
      {ADMIN_LOGIN_COPY.homeButtonLabel}
    </Link>
  );
}
