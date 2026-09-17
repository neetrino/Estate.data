"use client";

import { useState } from "react";
import { AdminContactCopyForm } from "@/features/admin/components/AdminContactCopyForm";
import { AdminWebPagesCopyForm } from "@/features/admin/components/AdminWebPagesCopyForm";
import { AdminWhatWeDoCopyForm } from "@/features/admin/components/AdminWhatWeDoCopyForm";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTabs, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { fetchAdminSiteCopy } from "@/features/admin/services/admin-api";

const MARKETING_TABS = [
  { id: "whatWeDo", label: "What We Do" },
  { id: "webPages", label: "Web Pages" },
  { id: "contact", label: "Contact" },
] as const satisfies readonly AdminTabItem<"whatWeDo" | "webPages" | "contact">[];

type MarketingTabId = (typeof MARKETING_TABS)[number]["id"];

/** CMS for What We Do, Web Pages, and Contact marketing copy. */
export function AdminMarketingCopyPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminSiteCopy, []);
  const [tab, setTab] = useState<MarketingTabId>("whatWeDo");

  if (loading && !data) {
    return <AdminLoadingState />;
  }
  if (error || !data) {
    return <AdminErrorState message={error ?? "Could not load marketing copy"} onRetry={reload} />;
  }

  return (
    <>
      <AdminPageHeader
        title="Marketing copy"
        description="Pick a homepage area, edit the words visitors see, then save. Buttons use a destination list — you don’t type page links."
      />
      <AdminTabs items={MARKETING_TABS} value={tab} onChange={setTab} />
      <div className={tab === "whatWeDo" ? "" : "hidden"}>
        <AdminWhatWeDoCopyForm initial={data.whatWeDo} onSaved={reload} />
      </div>
      <div className={tab === "webPages" ? "" : "hidden"}>
        <AdminWebPagesCopyForm initial={data.webPages} onSaved={reload} />
      </div>
      <div className={tab === "contact" ? "" : "hidden"}>
        <AdminContactCopyForm initial={data.contact} onSaved={reload} />
      </div>
    </>
  );
}
