"use client";

import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";
import { ADMIN_LOGIN_COPY } from "@/features/admin/content/adminCopy";
import { SUPERSUDO_PANEL_PATH } from "@/features/admin/lib/admin-paths";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import {
  CONTACT_PAGE_EYEBROW_CLASS,
  CONTACT_PAGE_SUBTITLE_CLASS,
  CONTACT_PAGE_TITLE_CLASS,
} from "@/shared/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ADMIN_LOGIN_PAGE_CLASS =
  "flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6";

const ADMIN_LOGIN_HEADER_CLASS = "mb-8 max-w-md text-center";

export function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(SUPERSUDO_PANEL_PATH);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <main className={ADMIN_LOGIN_PAGE_CLASS}>
      <header className={ADMIN_LOGIN_HEADER_CLASS}>
        <p className={CONTACT_PAGE_EYEBROW_CLASS}>{ADMIN_LOGIN_COPY.eyebrow}</p>
        <h1 className={CONTACT_PAGE_TITLE_CLASS}>{ADMIN_LOGIN_COPY.title}</h1>
        <p className={CONTACT_PAGE_SUBTITLE_CLASS}>{ADMIN_LOGIN_COPY.subtitle}</p>
      </header>
      <AdminLoginForm />
    </main>
  );
}
