import { getPrisma } from "@/server/lib/db";

export type AdminDashboardSummary = {
  portfolioCount: number;
  publishedPortfolioCount: number;
  featuredPortfolioCount: number;
  pricingPackageCount: number;
  articleCount: number;
  publishedArticleCount: number;
  faqCount: number;
  publishedFaqCount: number;
  contactInquiryCount: number;
  assetCount: number;
  orderCount: number;
  pendingOrderCount: number;
};

/** Aggregate counts for the admin dashboard. */
export async function getAdminDashboard(): Promise<AdminDashboardSummary> {
  const prisma = getPrisma();

  const [
    portfolioCount,
    publishedPortfolioCount,
    featuredPortfolioCount,
    pricingPackageCount,
    articleCount,
    publishedArticleCount,
    faqCount,
    publishedFaqCount,
    contactInquiryCount,
    assetCount,
    orderCount,
    pendingOrderCount,
  ] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.portfolioProject.count({ where: { published: true } }),
    prisma.portfolioProject.count({ where: { featuredOnHome: true } }),
    prisma.pricingPackage.count(),
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.faqItem.count(),
    prisma.faqItem.count({ where: { published: true } }),
    prisma.contactInquiry.count(),
    prisma.asset.count(),
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
  ]);

  return {
    portfolioCount,
    publishedPortfolioCount,
    featuredPortfolioCount,
    pricingPackageCount,
    articleCount,
    publishedArticleCount,
    faqCount,
    publishedFaqCount,
    contactInquiryCount,
    assetCount,
    orderCount,
    pendingOrderCount,
  };
}
