"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { getAdminPanelPageTitle } from "@/features/admin/lib/admin-paths";
import { SUPERSUDO_PATH } from "@/features/admin/lib/admin-paths";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { ADMIN_TOPBAR_CLASS } from "@/features/admin/styles/admin-panel-classes";

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { email, logout } = useAdminAuth();
  const title = getAdminPanelPageTitle(pathname);

  function handleLogout() {
    logout();
    router.replace(SUPERSUDO_PATH);
  }

  return (
    <header className={ADMIN_TOPBAR_CLASS}>
      <p className="text-sm font-semibold text-brand-navy">{title}</p>
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-purple hover:text-brand-navy"
        >
          View site
        </Link>
        {email ? (
          <span className="hidden text-sm text-muted-foreground sm:inline">{email}</span>
        ) : null}
        <AdminButton variant="secondary" onClick={handleLogout}>
          Logout
        </AdminButton>
      </div>
    </header>
  );
}
