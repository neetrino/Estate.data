"use client";

import Link from "next/link";
import { AdminStudioServiceEditor } from "@/features/admin/components/AdminStudioServiceEditor";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { SUPERSUDO_PANEL_STUDIO_SERVICES_PATH } from "@/features/admin/lib/admin-paths";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { fetchAdminStudioServices } from "@/features/admin/services/admin-api";

type AdminStudioServiceEditPageProps = {
  readonly sectionKey: string;
};

/** Loads one studio service and shows its editor. */
export function AdminStudioServiceEditPage({ sectionKey }: AdminStudioServiceEditPageProps) {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminStudioServices(), []);
  const service = data?.find((item) => item.sectionKey === sectionKey);

  if (loading && !data) {
    return <AdminLoadingState />;
  }
  if (error) {
    return <AdminErrorState message={error} onRetry={reload} />;
  }
  if (!service) {
    return (
      <AdminErrorState
        message="This service was not found."
        onRetry={reload}
      />
    );
  }

  return (
    <>
      <p className="mb-4">
        <Link
          href={SUPERSUDO_PANEL_STUDIO_SERVICES_PATH}
          className="text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-navy"
        >
          ← All services
        </Link>
      </p>
      <AdminPageHeader
        title={service.title}
        description={`${service.sectionKey.replaceAll("-", " ")} · edit this service only.`}
      />
      <AdminStudioServiceEditor service={service} onSaved={reload} />
    </>
  );
}
