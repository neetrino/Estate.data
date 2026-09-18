"use client";

import Link from "next/link";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { supersudoStudioServicePath } from "@/features/admin/lib/admin-paths";
import { fetchAdminStudioServices } from "@/features/admin/services/admin-api";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

/** Studio services list — click a row to edit that service. */
export function AdminStudioServicesPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminStudioServices(), []);
  const services = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Services"
        description="Click a service to change its words, photo, and prices. Hidden services do not appear on the website."
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      <ul className="grid gap-3">
        {services.map((service) => (
          <li key={service.id}>
            <Link
              href={supersudoStudioServicePath(service.sectionKey)}
              className={`flex items-center justify-between gap-4 ${ADMIN_CARD_CLASS} transition-colors hover:border-brand-purple/30 hover:bg-brand-purple/[0.03]`}
            >
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Click to edit
                </p>
                <h2 className="mt-1 truncate text-base font-semibold text-brand-navy">
                  {service.title}
                </h2>
                <p className="mt-1 truncate text-sm text-muted-foreground">{service.eyebrow}</p>
              </div>
              <AdminBadge
                label={service.published ? "Visible" : "Hidden"}
                tone={service.published ? "success" : "muted"}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
