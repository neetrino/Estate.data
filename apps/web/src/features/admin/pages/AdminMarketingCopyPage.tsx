"use client";

import { AdminContactCopyForm } from "@/features/admin/components/AdminContactCopyForm";
import { AdminWebPagesCopyForm } from "@/features/admin/components/AdminWebPagesCopyForm";
import { AdminWhatWeDoCopyForm } from "@/features/admin/components/AdminWhatWeDoCopyForm";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { fetchAdminSiteCopy } from "@/features/admin/services/admin-api";

/** CMS for What We Do, Web Pages, and Contact marketing copy. */
export function AdminMarketingCopyPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminSiteCopy, []);

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
        description="What We Do, Web Pages, and Contact headings shown on the public site."
      />
      <div className="space-y-6">
        <AdminWhatWeDoCopyForm initial={data.whatWeDo} onSaved={reload} />
        <AdminWebPagesCopyForm initial={data.webPages} onSaved={reload} />
        <AdminContactCopyForm initial={data.contact} onSaved={reload} />
      </div>
    </>
  );
}
