"use client";

import { AdminAuthGuard } from "@/features/admin/components/AdminAuthGuard";
import { AdminPanelShell } from "@/features/admin/components/AdminPanelShell";

const ADMIN_PANEL_PAGE_CLASS = "min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 sm:py-12";

export function AdminPanelPage() {
  return (
    <AdminAuthGuard>
      <main className={ADMIN_PANEL_PAGE_CLASS}>
        <AdminPanelShell />
      </main>
    </AdminAuthGuard>
  );
}
