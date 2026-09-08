import { API_VERSION_PREFIX } from "@estate/db";

/**
 * Central route paths for the backend.
 * Frontend calls these via apiClient; backend implements under apps/api.
 */
export const API_ROUTES = {
  health: `${API_VERSION_PREFIX}/health`,
  assets: `${API_VERSION_PREFIX}/assets`,
  contact: `${API_VERSION_PREFIX}/contact`,
  adminAuthLogin: `${API_VERSION_PREFIX}/admin/auth/login`,
  adminAuthRefresh: `${API_VERSION_PREFIX}/admin/auth/refresh`,
  adminDashboard: `${API_VERSION_PREFIX}/admin/dashboard`,
  adminContactInquiries: `${API_VERSION_PREFIX}/admin/contact-inquiries`,
  adminContactInquiryById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/contact-inquiries/${encodeURIComponent(id)}`,
  adminPortfolio: `${API_VERSION_PREFIX}/admin/portfolio`,
  adminPortfolioById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/portfolio/${encodeURIComponent(id)}`,
  adminPricing: `${API_VERSION_PREFIX}/admin/pricing`,
  adminPricingPackages: `${API_VERSION_PREFIX}/admin/pricing/packages`,
  adminPricingPackageById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/pricing/packages/${encodeURIComponent(id)}`,
  adminFaq: `${API_VERSION_PREFIX}/admin/faq`,
  adminFaqById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/faq/${encodeURIComponent(id)}`,
  adminHomeHero: `${API_VERSION_PREFIX}/admin/home-hero`,
  adminHomeHeroSlides: `${API_VERSION_PREFIX}/admin/home-hero-slides`,
  adminHomeHeroSlideById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/home-hero-slides/${encodeURIComponent(id)}`,
  adminStudioServices: `${API_VERSION_PREFIX}/admin/studio-services`,
  adminStudioServiceById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/studio-services/${encodeURIComponent(id)}`,
  adminContactFields: `${API_VERSION_PREFIX}/admin/contact-fields`,
  adminUpload: `${API_VERSION_PREFIX}/admin/upload`,
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
