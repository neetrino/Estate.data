"use client";

import { useState } from "react";

import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { AdminStatCard } from "@/features/admin/components/ui/AdminStatCard";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import {
  SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  googleAnalyticsHref,
} from "@/features/admin/lib/admin-paths";
import { fetchAdminDashboard } from "@/features/admin/services/admin-api";
import type { DashboardSummary } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

const REPORT_TABS = [
  {
    id: "requests",
    label: "Form requests",
    hint: "How many people asked for a service from the contact form.",
  },
  {
    id: "visits",
    label: "Website visits",
    hint: "Visits, devices, and countries live in Google Analytics. This page does not count them.",
  },
] as const satisfies readonly AdminTabItem<"requests" | "visits">[];

const GA_LINK_CLASS =
  "inline-flex items-center rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-purple";

function RequestServiceTable({
  rows,
}: {
  readonly rows: DashboardSummary["requestsByService"];
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">Nobody has asked for a service yet.</p>;
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
  const gaHref = googleAnalyticsHref();
  const [tab, setTab] = useState<"requests" | "visits">("requests");

  if (loading && !data) {
    return <AdminLoadingState />;
  }
  if (error || !data) {
    return <AdminErrorState message={error ?? "Could not load this page"} onRetry={reload} />;
  }

  return (
    <>
      <AdminPageHeader
        title="Reports"
        description="Pick a tab. Form requests are counted here. Website visits open in Google Analytics."
      />
      <AdminTabs items={REPORT_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "requests")}>
        <div className="grid gap-4 sm:grid-cols-3">
          <AdminStatCard
            label="All form messages"
            value={data.contactInquiryCount}
            sublabel="From the contact form"
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
      </div>
      <div className={adminTabHidden(tab === "visits")}>
        <div className={`${ADMIN_CARD_CLASS} space-y-3`}>
          <h2 className="text-base font-semibold text-brand-navy">Website visits</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This page does not count visits. Open Google Analytics for visitors, devices, and countries.
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>How many people visited</li>
            <li>Which pages they opened</li>
            <li>Which services they clicked</li>
            <li>Phone, computer, or tablet</li>
            <li>Which country they came from</li>
          </ul>
          <a href={gaHref} target="_blank" rel="noopener noreferrer" className={GA_LINK_CLASS}>
            Open Google Analytics
          </a>
        </div>
      </div>
    </>
  );
}
