"use client";

import { motion, useReducedMotion } from "motion/react";
import { AdminDashboardHero } from "@/features/admin/components/AdminDashboardHero";
import { AdminLatestInquiries } from "@/features/admin/components/AdminLatestInquiries";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminQuickActions } from "@/features/admin/components/ui/AdminQuickActions";
import { AdminStatCard } from "@/features/admin/components/ui/AdminStatCard";
import type { AdminNavIconId } from "@/features/admin/config/admin-nav";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import {
  SUPERSUDO_PANEL_ARTICLES_PATH,
  SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  SUPERSUDO_PANEL_FAQ_PATH,
  SUPERSUDO_PANEL_PAYMENTS_PATH,
  SUPERSUDO_PANEL_PORTFOLIO_PATH,
  SUPERSUDO_PANEL_PRICING_PATH,
} from "@/features/admin/lib/admin-paths";
import { adminStaggerContainer } from "@/features/admin/lib/admin-motion";
import {
  fetchAdminContactInquiries,
  fetchAdminDashboard,
} from "@/features/admin/services/admin-api";
import {
  ADMIN_DASHBOARD_PAGE_CLASS,
  ADMIN_DASHBOARD_PANELS_GRID_CLASS,
  ADMIN_DASHBOARD_STATS_GRID_CLASS,
  type AdminStatIconTone,
} from "@/features/admin/styles/admin-dashboard-classes";
import type { DashboardSummary } from "@/features/admin/types/admin-data";

const LATEST_INQUIRIES_LIMIT = 5;

const QUICK_ACTIONS = [
  {
    id: "portfolio",
    label: "Manage portfolio",
    description: "Projects, categories, and featured tiles",
    href: SUPERSUDO_PANEL_PORTFOLIO_PATH,
    icon: "portfolio",
  },
  {
    id: "pricing",
    label: "Manage pricing",
    description: "Packages and subscription tiers",
    href: SUPERSUDO_PANEL_PRICING_PATH,
    icon: "pricing",
  },
  {
    id: "articles",
    label: "Manage articles",
    description: "Resources posts and translations",
    href: SUPERSUDO_PANEL_ARTICLES_PATH,
    icon: "articles",
  },
  {
    id: "faq",
    label: "Manage FAQ",
    description: "Questions shown on the resources page",
    href: SUPERSUDO_PANEL_FAQ_PATH,
    icon: "faq",
  },
  {
    id: "contact",
    label: "Open inquiries",
    description: "Review new contact form submissions",
    href: SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
    icon: "contact-inquiries",
  },
  {
    id: "payments",
    label: "Review payments",
    description: "Orders and pending transactions",
    href: SUPERSUDO_PANEL_PAYMENTS_PATH,
    icon: "payments",
  },
] as const;

type DashboardStat = {
  readonly label: string;
  readonly value: number;
  readonly sublabel?: string;
  readonly href: string;
  readonly icon: AdminNavIconId;
  readonly tone: AdminStatIconTone;
};

function getDashboardStats(summary: DashboardSummary): DashboardStat[] {
  return [
    {
      label: "Portfolio projects",
      value: summary.portfolioCount,
      sublabel: `${summary.publishedPortfolioCount} published · ${summary.featuredPortfolioCount} featured`,
      href: SUPERSUDO_PANEL_PORTFOLIO_PATH,
      icon: "portfolio",
      tone: "purple",
    },
    {
      label: "Pricing packages",
      value: summary.pricingPackageCount,
      href: SUPERSUDO_PANEL_PRICING_PATH,
      icon: "pricing",
      tone: "navy",
    },
    {
      label: "Articles",
      value: summary.articleCount,
      sublabel: `${summary.publishedArticleCount} published`,
      href: SUPERSUDO_PANEL_ARTICLES_PATH,
      icon: "articles",
      tone: "cyan",
    },
    {
      label: "FAQ items",
      value: summary.faqCount,
      sublabel: `${summary.publishedFaqCount} published`,
      href: SUPERSUDO_PANEL_FAQ_PATH,
      icon: "faq",
      tone: "gold",
    },
    {
      label: "Contact inquiries",
      value: summary.contactInquiryCount,
      href: SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
      icon: "contact-inquiries",
      tone: "orange",
    },
    {
      label: "Orders",
      value: summary.orderCount,
      sublabel: `${summary.pendingOrderCount} pending`,
      href: SUPERSUDO_PANEL_PAYMENTS_PATH,
      icon: "payments",
      tone: "purple",
    },
  ];
}

function DashboardStatGrid({ summary }: { readonly summary: DashboardSummary }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={ADMIN_DASHBOARD_STATS_GRID_CLASS}
      variants={adminStaggerContainer}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
    >
      {getDashboardStats(summary).map((stat) => (
        <AdminStatCard key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}

export function AdminDashboardPage() {
  const reduceMotion = useReducedMotion();
  const { data, loading, error, reload } = useAdminQuery(async () => {
    const [summary, inquiries] = await Promise.all([
      fetchAdminDashboard(),
      fetchAdminContactInquiries({ limit: LATEST_INQUIRIES_LIMIT }),
    ]);
    return { summary, inquiries };
  }, []);

  if (loading) {
    return <AdminLoadingState label="Loading dashboard…" />;
  }

  if (error || !data) {
    return <AdminErrorState message={error ?? "Dashboard unavailable"} onRetry={reload} />;
  }

  return (
    <div className={ADMIN_DASHBOARD_PAGE_CLASS}>
      <AdminDashboardHero />
      <DashboardStatGrid summary={data.summary} />
      <motion.div
        className={ADMIN_DASHBOARD_PANELS_GRID_CLASS}
        variants={adminStaggerContainer}
        initial={reduceMotion ? false : "hidden"}
        animate="show"
      >
        <AdminQuickActions actions={QUICK_ACTIONS} />
        <AdminLatestInquiries inquiries={data.inquiries} />
      </motion.div>
    </div>
  );
}
