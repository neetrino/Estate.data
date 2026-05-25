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
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
