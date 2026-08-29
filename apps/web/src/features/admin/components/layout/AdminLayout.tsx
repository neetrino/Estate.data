"use client";

import { AdminSidebar } from "@/features/admin/components/layout/AdminSidebar";
import {
  ADMIN_CONTENT_CLASS,
  ADMIN_LAYOUT_CLASS,
  ADMIN_MAIN_CLASS,
  ADMIN_PANEL_ROOT_CLASS,
} from "@/features/admin/styles/admin-panel-classes";
import "@/features/admin/styles/admin-scrollbar.css";

type AdminLayoutProps = {
  readonly children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className={ADMIN_PANEL_ROOT_CLASS}>
      <div className={ADMIN_LAYOUT_CLASS}>
        <AdminSidebar />
        <div className={ADMIN_MAIN_CLASS}>
          <div className={ADMIN_CONTENT_CLASS}>{children}</div>
        </div>
      </div>
    </div>
  );
}
