import { getPrisma } from "@/server/lib/db";

export type AdminDashboardSummary = {
  portfolioCount: number;
  publishedPortfolioCount: number;
  featuredPortfolioCount: number;
  pricingPackageCount: number;
  faqCount: number;
  publishedFaqCount: number;
  contactInquiryCount: number;
};

/** Aggregate counts for the admin dashboard. */
export async function getAdminDashboard(): Promise<AdminDashboardSummary> {
  const prisma = getPrisma();

  const [
    portfolioCount,
    publishedPortfolioCount,
    featuredPortfolioCount,
    pricingPackageCount,
    faqCount,
    publishedFaqCount,
    contactInquiryCount,
  ] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.portfolioProject.count({ where: { published: true } }),
    prisma.portfolioProject.count({ where: { featuredOnHome: true } }),
    prisma.pricingPackage.count({ where: { categoryKey: "media" } }),
    prisma.faqItem.count(),
    prisma.faqItem.count({ where: { published: true } }),
    prisma.contactInquiry.count(),
  ]);

  return {
    portfolioCount,
    publishedPortfolioCount,
    featuredPortfolioCount,
    pricingPackageCount,
    faqCount,
    publishedFaqCount,
    contactInquiryCount,
  };
}
