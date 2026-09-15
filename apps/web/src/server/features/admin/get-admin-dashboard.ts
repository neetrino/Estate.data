import {
  getInquiryAnalytics,
  type ServiceRequestCount,
} from "@/server/features/admin/get-inquiry-analytics";
import { getPrisma } from "@/server/lib/db";

export type AdminDashboardSummary = {
  portfolioCount: number;
  publishedPortfolioCount: number;
  featuredPortfolioCount: number;
  pricingPackageCount: number;
  faqCount: number;
  publishedFaqCount: number;
  contactInquiryCount: number;
  requestsLast7Days: number;
  requestsLast30Days: number;
  requestsByService: readonly ServiceRequestCount[];
};

/** Aggregate counts for the admin dashboard and analytics page. */
export async function getAdminDashboard(): Promise<AdminDashboardSummary> {
  const prisma = getPrisma();

  const [
    portfolioCount,
    publishedPortfolioCount,
    featuredPortfolioCount,
    pricingPackageCount,
    faqCount,
    publishedFaqCount,
    inquiryAnalytics,
  ] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.portfolioProject.count({ where: { published: true } }),
    prisma.portfolioProject.count({ where: { featuredOnHome: true } }),
    prisma.pricingPackage.count({ where: { categoryKey: "media" } }),
    prisma.faqItem.count(),
    prisma.faqItem.count({ where: { published: true } }),
    getInquiryAnalytics(),
  ]);

  return {
    portfolioCount,
    publishedPortfolioCount,
    featuredPortfolioCount,
    pricingPackageCount,
    faqCount,
    publishedFaqCount,
    contactInquiryCount: inquiryAnalytics.total,
    requestsLast7Days: inquiryAnalytics.last7Days,
    requestsLast30Days: inquiryAnalytics.last30Days,
    requestsByService: inquiryAnalytics.byService,
  };
}
