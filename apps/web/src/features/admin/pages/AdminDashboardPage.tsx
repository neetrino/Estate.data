"use client";

import Link from "next/link";
import { AdminQuickActions } from "@/features/admin/components/ui/AdminQuickActions";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminStatCard } from "@/features/admin/components/ui/AdminStatCard";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import {
  SUPERSUDO_PANEL_ARTICLES_PATH,
  SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  SUPERSUDO_PANEL_FAQ_PATH,
  SUPERSUDO_PANEL_PORTFOLIO_PATH,
  SUPERSUDO_PANEL_PRICING_PATH,
} from "@/features/admin/lib/admin-paths";
import {
  fetchAdminContactInquiries,
  fetchAdminDashboard,
} from "@/features/admin/services/admin-api";

const QUICK_ACTIONS = [
  { id: "portfolio", label: "Manage portfolio", href: SUPERSUDO_PANEL_PORTFOLIO_PATH },
  { id: "pricing", label: "Manage pricing", href: SUPERSUDO_PANEL_PRICING_PATH },
  { id: "articles", label: "Manage articles", href: SUPERSUDO_PANEL_ARTICLES_PATH },
  { id: "faq", label: "Manage FAQ", href: SUPERSUDO_PANEL_FAQ_PATH },
  {
    id: "contact",
    label: "Open contact inquiries",
    href: SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  },
] as const;

export function AdminDashboardPage() {
  const { data, loading, error, reload } = useAdminQuery(
    async () => {
      const [summary, inquiries] = await Promise.all([
        fetchAdminDashboard(),
        fetchAdminContactInquiries({ limit: 5 }),
      ]);
      return { summary, inquiries };
    },
    [],
  );

  if (loading) {
    return <AdminLoadingState label="Loading dashboard…" />;
  }

  if (error || !data) {
    return <AdminErrorState message={error ?? "Dashboard unavailable"} onRetry={reload} />;
  }

  const { summary, inquiries } = data;

  return (
    <>
      <AdminPageHeader
        title="Welcome back"
        description="Overview of content, inquiries, and system activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AdminStatCard
          label="Portfolio projects"
          value={summary.portfolioCount}
          sublabel={`${summary.publishedPortfolioCount} published`}
          href={SUPERSUDO_PANEL_PORTFOLIO_PATH}
        />
        <AdminStatCard
          label="Pricing packages"
          value={summary.pricingPackageCount}
          href={SUPERSUDO_PANEL_PRICING_PATH}
        />
        <AdminStatCard
          label="Articles"
          value={summary.articleCount}
          sublabel={`${summary.publishedArticleCount} published`}
          href={SUPERSUDO_PANEL_ARTICLES_PATH}
        />
        <AdminStatCard
          label="FAQ items"
          value={summary.faqCount}
          sublabel={`${summary.publishedFaqCount} published`}
          href={SUPERSUDO_PANEL_FAQ_PATH}
        />
        <AdminStatCard
          label="Contact inquiries"
          value={summary.contactInquiryCount}
          href={SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <AdminQuickActions actions={QUICK_ACTIONS} />

        <div className={ADMIN_CARD_CLASS}>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-brand-navy">Latest inquiries</h2>
            <Link
              href={SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH}
              className="text-sm font-medium text-brand-purple hover:text-brand-navy"
            >
              View all
            </Link>
          </div>
          {inquiries.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No contact inquiries yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-foreground/10">
              {inquiries.map((inquiry) => (
                <li key={inquiry.id} className="py-3">
                  <p className="text-sm font-semibold text-brand-navy">{inquiry.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {inquiry.email} · {inquiry.service}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
