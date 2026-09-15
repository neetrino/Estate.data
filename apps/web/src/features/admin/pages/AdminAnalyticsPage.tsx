"use client";

import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminStatCard } from "@/features/admin/components/ui/AdminStatCard";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import {
  SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  googleAnalyticsHref,
} from "@/features/admin/lib/admin-paths";
import { fetchAdminDashboard } from "@/features/admin/services/admin-api";
import type { DashboardSummary } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { resolveGtmId } from "@/shared/analytics/gtmConfig";

const GA_LINK_CLASS =
  "inline-flex items-center rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-purple";

const GA_METRICS = [
  "Total / new / active users",
  "Sessions and page views",
  "Service views and clicks (service_view / service_click events)",
  "Most viewed and clicked services",
  "Traffic sources, device, country",
  "Conversion / request rate",
] as const;

function RequestServiceTable({
  rows,
}: {
  readonly rows: DashboardSummary["requestsByService"];
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">No service requests yet.</p>;
  }

  return (
    <ul className="divide-y divide-foreground/10">
      {rows.map((row) => (
        <li key={row.service} className="flex items-center justify-between gap-3 py-2 text-sm">
          <span className="text-brand-navy">{row.label}</span>
          <span className="font-semibold text-brand-navy">{row.count}</span>
        </li>
      ))}
    </ul>
  );
}

/** CMS request stats plus a shortcut into Google Analytics — no duplicate traffic product. */
export function AdminAnalyticsPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminDashboard, []);
  const gtmId = resolveGtmId();
  const gaHref = googleAnalyticsHref();

  if (loading && !data) {
    return <AdminLoadingState />;
  }
  if (error || !data) {
    return <AdminErrorState message={error ?? "Could not load analytics"} onRetry={reload} />;
  }

  return (
    <>
      <AdminPageHeader
        title="Analytics"
        description="Contact requests live here. Traffic, devices, and geography stay in Google Analytics."
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="All service requests"
          value={data.contactInquiryCount}
          sublabel="Contact form submissions"
          href={SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH}
          icon="contact-inquiries"
          tone="navy"
        />
        <AdminStatCard
          label="Last 7 days"
          value={data.requestsLast7Days}
          icon="analytics"
          tone="purple"
        />
        <AdminStatCard
          label="Last 30 days"
          value={data.requestsLast30Days}
          icon="analytics"
          tone="purple"
        />
      </div>
      <div className={`${ADMIN_CARD_CLASS} mt-6 space-y-3`}>
        <h2 className="text-base font-semibold text-brand-navy">Most requested services</h2>
        <RequestServiceTable rows={data.requestsByService} />
      </div>
      <div className={`${ADMIN_CARD_CLASS} mt-6 space-y-3`}>
        <h2 className="text-base font-semibold text-brand-navy">Google Analytics</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          These metrics are not duplicated in this admin. Open GA for them. GTM
          {gtmId ? ` is loaded (${gtmId})` : " is off until NEXT_PUBLIC_GTM_ID is set"}.
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {GA_METRICS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a href={gaHref} target="_blank" rel="noopener noreferrer" className={GA_LINK_CLASS}>
          Open Google Analytics
        </a>
      </div>
    </>
  );
}
