"use client";

import { AdminSidebar } from "@/features/admin/components/layout/AdminSidebar";
import { AdminTopbar } from "@/features/admin/components/layout/AdminTopbar";
import {
  ADMIN_CONTENT_CLASS,
  ADMIN_LAYOUT_CLASS,
  ADMIN_MAIN_CLASS,
  ADMIN_PANEL_ROOT_CLASS,
} from "@/features/admin/styles/admin-panel-classes";

type AdminLayoutProps = {
  readonly children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={ADMIN_PANEL_ROOT_CLASS}>
      <div className={ADMIN_LAYOUT_CLASS}>
        <AdminSidebar />
        <div className={ADMIN_MAIN_CLASS}>
          <AdminTopbar />
          <div className={ADMIN_CONTENT_CLASS}>{children}</div>
        </div>
      </div>
    </div>
  );
}
