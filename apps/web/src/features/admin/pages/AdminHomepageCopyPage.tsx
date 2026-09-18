"use client";

import { useState } from "react";
import { AdminBrandCopyForm } from "@/features/admin/components/AdminBrandCopyForm";
import { AdminBeforeAfterCopyForm } from "@/features/admin/components/AdminBeforeAfterCopyForm";
import {
  AdminOfferingsCopyForm,
  AdminProcessCopyForm,
  AdminStatsCopyForm,
} from "@/features/admin/components/AdminHomepageCopyForms";
import {
  AdminServiceAreaCopyForm,
  AdminWhyUsCopyForm,
} from "@/features/admin/components/AdminHomepageGroupedCopyForms";
import { AdminFaqIntroCopyForm } from "@/features/admin/components/AdminSectionIntroCopyForms";
import { AdminFloorPlansCopyForm } from "@/features/admin/components/AdminSectionIntroCopyForms";
import { AdminPackagesIntroCopyForm } from "@/features/admin/components/AdminSectionIntroCopyForms";
import { AdminPortfolioIntroCopyForm } from "@/features/admin/components/AdminSectionIntroCopyForms";
import { AdminPackageCompareCopyForm } from "@/features/admin/components/AdminPackageCompareCopyForm";
import { AdminScanToBimCopyForm } from "@/features/admin/components/AdminScanToBimCopyForm";
import { AdminServicesIntroCopyForm } from "@/features/admin/components/AdminServicesIntroCopyForm";
import { AdminStudioCopyForm } from "@/features/admin/components/AdminStudioCopyForm";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTabs } from "@/features/admin/components/ui/AdminTabs";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import {
  HOMEPAGE_COPY_TABS,
  type HomepageCopyTabId,
} from "@/features/admin/lib/admin-homepage-copy-tabs";
import { fetchAdminSiteCopy } from "@/features/admin/services/admin-api";
import type { MarketingCopyBundle } from "@/features/admin/types/admin-data";

type HomepageCopyPanelsProps = {
  readonly tab: HomepageCopyTabId;
  readonly data: MarketingCopyBundle;
  readonly onSaved: () => void;
};

function HomepageCopyPanels({ tab, data, onSaved }: HomepageCopyPanelsProps) {
  return (
    <>
      <div className={tab === "brand" ? "" : "hidden"}>
        <AdminBrandCopyForm initial={data.brand} onSaved={onSaved} />
      </div>
      <div className={tab === "stats" ? "" : "hidden"}>
        <AdminStatsCopyForm initial={data.stats} onSaved={onSaved} />
      </div>
      <div className={tab === "offerings" ? "" : "hidden"}>
        <AdminOfferingsCopyForm initial={data.offerings} onSaved={onSaved} />
      </div>
      <div className={tab === "servicesIntro" ? "" : "hidden"}>
        <AdminServicesIntroCopyForm initial={data.servicesIntro} onSaved={onSaved} />
      </div>
      <div className={tab === "floorPlans" ? "" : "hidden"}>
        <AdminFloorPlansCopyForm initial={data.floorPlans} onSaved={onSaved} />
      </div>
      <div className={tab === "scanToBim" ? "" : "hidden"}>
        <AdminScanToBimCopyForm initial={data.scanToBim} onSaved={onSaved} />
      </div>
      <div className={tab === "packagesIntro" ? "" : "hidden"}>
        <AdminPackagesIntroCopyForm initial={data.packagesIntro} onSaved={onSaved} />
      </div>
      <div className={tab === "packageCompare" ? "" : "hidden"}>
        <AdminPackageCompareCopyForm initial={data.packageCompare} onSaved={onSaved} />
      </div>
      <div className={tab === "portfolioIntro" ? "" : "hidden"}>
        <AdminPortfolioIntroCopyForm initial={data.portfolioIntro} onSaved={onSaved} />
      </div>
      <div className={tab === "beforeAfter" ? "" : "hidden"}>
        <AdminBeforeAfterCopyForm initial={data.beforeAfter} onSaved={onSaved} />
      </div>
      <div className={tab === "process" ? "" : "hidden"}>
        <AdminProcessCopyForm initial={data.process} onSaved={onSaved} />
      </div>
      <div className={tab === "whyUs" ? "" : "hidden"}>
        <AdminWhyUsCopyForm initial={data.whyUs} onSaved={onSaved} />
      </div>
      <div className={tab === "studio" ? "" : "hidden"}>
        <AdminStudioCopyForm initial={data.studio} onSaved={onSaved} />
      </div>
      <div className={tab === "serviceArea" ? "" : "hidden"}>
        <AdminServiceAreaCopyForm initial={data.serviceArea} onSaved={onSaved} />
      </div>
      <div className={tab === "faqIntro" ? "" : "hidden"}>
        <AdminFaqIntroCopyForm initial={data.faqIntro} onSaved={onSaved} />
      </div>
    </>
  );
}

/** CMS for the remaining homepage blocks, one section at a time. */
export function AdminHomepageCopyPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminSiteCopy, []);
  const [tab, setTab] = useState<HomepageCopyTabId>("brand");

  if (loading && !data) {
    return <AdminLoadingState />;
  }
  if (error || !data) {
    return <AdminErrorState message={error ?? "Could not load homepage copy"} onRetry={reload} />;
  }

  return (
    <>
      <AdminPageHeader
        title="Other homepage blocks"
        description="Pick a tab, change the words, then Save. The top of the homepage, services, and the contact form have their own pages in the menu."
      />
      <AdminTabs items={HOMEPAGE_COPY_TABS} value={tab} onChange={setTab} />
      <HomepageCopyPanels tab={tab} data={data} onSaved={reload} />
    </>
  );
}
