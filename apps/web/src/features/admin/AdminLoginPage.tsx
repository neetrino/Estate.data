"use client";

import { AdminLoginBackground } from "@/features/admin/components/AdminLoginBackground";
import { AdminLoginDecorShapes } from "@/features/admin/components/AdminLoginDecorShapes";
import { AdminLoginForm } from "@/features/admin/components/AdminLoginForm";
import { SUPERSUDO_PANEL_PATH } from "@/features/admin/lib/admin-paths";
import {
  ADMIN_LOGIN_CONTENT_CLASS,
  ADMIN_LOGIN_PAGE_CLASS,
} from "@/features/admin/lib/admin-login-styles";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "@/features/admin/styles/admin-login.css";

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
      <AdminLoginBackground />
      <AdminLoginDecorShapes />
      <div className={ADMIN_LOGIN_CONTENT_CLASS}>
        <AdminLoginForm />
      </div>
    </main>
  );
}
