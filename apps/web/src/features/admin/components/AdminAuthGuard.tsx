"use client";

import { SUPERSUDO_PATH } from "@/features/admin/lib/admin-paths";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

const ADMIN_AUTH_LOADING_CLASS =
  "flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground";

type AdminAuthGuardProps = {
  readonly children: ReactNode;
};

/** Redirect unauthenticated visitors to the login route. */
export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(SUPERSUDO_PATH);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <p className={ADMIN_AUTH_LOADING_CLASS}>Loading session…</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
