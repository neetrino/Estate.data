import { API_VERSION_PREFIX } from "@/shared/lib/constants";

/**
 * Central route paths for the backend.
 * Frontend calls these via apiClient; backend implements under apps/api.
 */
export const API_ROUTES = {
  health: `${API_VERSION_PREFIX}/health`,
  assets: `${API_VERSION_PREFIX}/assets`,
} as const;

export type ApiRouteKey = keyof typeof API_ROUTES;
