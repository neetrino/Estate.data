"use client";

import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { fetchAdminAnalytics } from "@/features/admin/services/admin-api";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

export function AdminAnalyticsPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminAnalytics(), []);

  return (
    <>
      <AdminPageHeader
        title="Analytics"
        description="Traffic statistics live in Google Analytics. We do not duplicate user stats here."
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      <div className={ADMIN_CARD_CLASS}>
        {data?.url ? (
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[#8e54e9] underline"
          >
            Open Google Analytics
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">
            Set GOOGLE_ANALYTICS_URL in env, or save analytics.url in Site copy, to show the
            dashboard link.
          </p>
        )}
      </div>
    </>
  );
}
