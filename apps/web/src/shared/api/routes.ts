import { API_VERSION_PREFIX } from "@estate/db";

/**
 * Central route paths for the backend.
 * Frontend calls these via apiClient; backend implements under apps/api.
 */
export const API_ROUTES = {
  health: `${API_VERSION_PREFIX}/health`,
  assets: `${API_VERSION_PREFIX}/assets`,
  contact: `${API_VERSION_PREFIX}/contact`,
  portfolio: `${API_VERSION_PREFIX}/portfolio`,
  projectsRecent: `${API_VERSION_PREFIX}/projects/recent`,
  articles: `${API_VERSION_PREFIX}/articles`,
  faq: `${API_VERSION_PREFIX}/faq`,
  i18nLocales: `${API_VERSION_PREFIX}/i18n/locales`,
  pricing: `${API_VERSION_PREFIX}/pricing`,
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
  adminArticles: `${API_VERSION_PREFIX}/admin/articles`,
  adminArticleById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/articles/${encodeURIComponent(id)}`,
  adminFaq: `${API_VERSION_PREFIX}/admin/faq`,
  adminFaqById: (id: string) =>
    `${API_VERSION_PREFIX}/admin/faq/${encodeURIComponent(id)}`,
  adminAssets: `${API_VERSION_PREFIX}/admin/assets`,
  adminMedia: `${API_VERSION_PREFIX}/admin/media`,
  adminPaymentsOrders: `${API_VERSION_PREFIX}/admin/payments/orders`,
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
