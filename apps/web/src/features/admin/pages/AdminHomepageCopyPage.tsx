"use client";

import { AdminBeforeAfterCopyForm } from "@/features/admin/components/AdminBeforeAfterCopyForm";
import {
  AdminOfferingsCopyForm,
  AdminProcessCopyForm,
  AdminServiceAreaCopyForm,
  AdminStatsCopyForm,
  AdminWhyUsCopyForm,
} from "@/features/admin/components/AdminHomepageCopyForms";
import {
  AdminFaqIntroCopyForm,
  AdminFloorPlansCopyForm,
  AdminPackagesIntroCopyForm,
  AdminPortfolioIntroCopyForm,
} from "@/features/admin/components/AdminSectionIntroCopyForms";
import { AdminStudioCopyForm } from "@/features/admin/components/AdminStudioCopyForm";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { fetchAdminSiteCopy } from "@/features/admin/services/admin-api";

export function AdminHomepageCopyPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminSiteCopy, []);

  if (loading && !data) {
    return <AdminLoadingState />;
  }
  if (error || !data) {
    return <AdminErrorState message={error ?? "Could not load homepage copy"} onRetry={reload} />;
  }

  return (
    <>
      <AdminPageHeader
        title="Homepage sections"
        description="Stats, offerings, team, process, and the other homepage blocks that were previously hardcoded."
      />
      <div className="space-y-6">
        <AdminStatsCopyForm initial={data.stats} onSaved={reload} />
        <AdminOfferingsCopyForm initial={data.offerings} onSaved={reload} />
        <AdminProcessCopyForm initial={data.process} onSaved={reload} />
        <AdminWhyUsCopyForm initial={data.whyUs} onSaved={reload} />
        <AdminStudioCopyForm initial={data.studio} onSaved={reload} />
        <AdminServiceAreaCopyForm initial={data.serviceArea} onSaved={reload} />
        <AdminBeforeAfterCopyForm initial={data.beforeAfter} onSaved={reload} />
        <AdminPackagesIntroCopyForm initial={data.packagesIntro} onSaved={reload} />
        <AdminPortfolioIntroCopyForm initial={data.portfolioIntro} onSaved={reload} />
        <AdminFaqIntroCopyForm initial={data.faqIntro} onSaved={reload} />
        <AdminFloorPlansCopyForm initial={data.floorPlans} onSaved={reload} />
      </div>
    </>
  );
}
