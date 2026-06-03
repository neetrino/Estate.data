"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AdminNavIcon } from "@/features/admin/components/layout/AdminNavIcon";
import {
  ADMIN_NAV_GROUPS,
  ADMIN_SIDEBAR_LOGOUT_ITEM,
  type AdminNavItem,
} from "@/features/admin/config/admin-nav";
import { SUPERSUDO_PATH } from "@/features/admin/lib/admin-paths";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { ADMIN_SIDEBAR_CLASS } from "@/features/admin/styles/admin-panel-classes";

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/supersudo/panel") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function navItemClass(active: boolean): string {
  return [
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-brand-purple/10 text-brand-purple"
      : "text-brand-navy hover:bg-neutral-50",
  ].join(" ");
}

function NavLink({ item, active }: { readonly item: AdminNavItem; readonly active: boolean }) {
  return (
    <Link href={item.href} className={navItemClass(active)}>
      <AdminNavIcon id={item.icon} />
      <span>{item.label}</span>
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAdminAuth();

  function handleLogout() {
    logout();
    router.replace(SUPERSUDO_PATH);
  }

  return (
    <aside className={ADMIN_SIDEBAR_CLASS}>
      <div className="border-b border-foreground/10 px-5 py-5">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand-purple uppercase">
          Estate Data
        </p>
        <p className="mt-1 text-lg font-bold text-brand-navy">Admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.id} className="mb-5">
            <p className="px-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {group.label}
            </p>
            <ul className="mt-2 space-y-0.5">
              {group.items.map((item) => (
                <li key={item.id}>
                  <NavLink item={item} active={isNavItemActive(pathname, item.href)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="mt-auto border-t border-foreground/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className={`${navItemClass(false)} cursor-pointer`}
        >
          <AdminNavIcon id={ADMIN_SIDEBAR_LOGOUT_ITEM.icon} />
          <span>{ADMIN_SIDEBAR_LOGOUT_ITEM.label}</span>
        </button>
      </div>
    </aside>
  );
}
