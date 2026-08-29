"use client";

import Image from "next/image";
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
import {
  ADMIN_SIDEBAR_BRAND_CLASS,
  ADMIN_SIDEBAR_BRAND_LOGO_IMG_CLASS,
  ADMIN_SIDEBAR_BRAND_LOGO_WRAP_CLASS,
  ADMIN_SIDEBAR_CLASS,
  ADMIN_SIDEBAR_FOOTER_CLASS,
  ADMIN_SIDEBAR_GROUP_CLASS,
  ADMIN_SIDEBAR_GROUP_LABEL_CLASS,
  ADMIN_SIDEBAR_NAV_CLASS,
  ADMIN_SIDEBAR_NAV_ITEM_ACTIVE_CLASS,
  ADMIN_SIDEBAR_NAV_ITEM_CLASS,
  ADMIN_SIDEBAR_NAV_ITEM_IDLE_CLASS,
  ADMIN_SIDEBAR_NAV_LIST_CLASS,
} from "@/features/admin/styles/admin-panel-classes";
import {
  SITE_LOGO_ALT,
  SITE_LOGO_DARK_CACHE_VERSION,
  SITE_LOGO_DARK_PATH,
} from "@/shared/components/navbar/navConfig";

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/supersudo/panel") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function navItemClass(active: boolean): string {
  return [
    ADMIN_SIDEBAR_NAV_ITEM_CLASS,
    active ? ADMIN_SIDEBAR_NAV_ITEM_ACTIVE_CLASS : ADMIN_SIDEBAR_NAV_ITEM_IDLE_CLASS,
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
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className={ADMIN_SIDEBAR_BRAND_CLASS}
        title="View live site"
        aria-label="View live site"
      >
        <span className={ADMIN_SIDEBAR_BRAND_LOGO_WRAP_CLASS}>
          <Image
            src={`${SITE_LOGO_DARK_PATH}?v=${SITE_LOGO_DARK_CACHE_VERSION}`}
            alt={SITE_LOGO_ALT}
            fill
            sizes="248px"
            unoptimized
            priority
            className={ADMIN_SIDEBAR_BRAND_LOGO_IMG_CLASS}
          />
        </span>
      </Link>

      <nav className={ADMIN_SIDEBAR_NAV_CLASS}>
        {ADMIN_NAV_GROUPS.map((group) => (
          <div key={group.id} className={ADMIN_SIDEBAR_GROUP_CLASS}>
            <p className={ADMIN_SIDEBAR_GROUP_LABEL_CLASS}>{group.label}</p>
            <ul className={ADMIN_SIDEBAR_NAV_LIST_CLASS}>
              {group.items.map((item) => (
                <li key={item.id}>
                  <NavLink item={item} active={isNavItemActive(pathname, item.href)} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={ADMIN_SIDEBAR_FOOTER_CLASS}>
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
