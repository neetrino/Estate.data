import { adminAuthenticatedRequest } from "@/features/admin/services/adminAuthenticatedRequest";
import type {
  AdminArticle,
  AdminAsset,
  AdminContactField,
  AdminContactInquiry,
  AdminFaqItem,
  AdminHeroSlide,
  AdminHomeHero,
  AdminHomeHeroUploadResult,
  AdminMediaListResponse,
  AdminOrder,
  AdminPortfolioProject,
  AdminPricingPackage,
  AdminPricingResponse,
  AdminSiteCopyItem,
  AdminStudioService,
  DashboardSummary,
} from "@/features/admin/types/admin-data";
import { API_ROUTES } from "@/shared/api/routes";

export function fetchAdminDashboard(): Promise<DashboardSummary> {
  return adminAuthenticatedRequest<DashboardSummary>(API_ROUTES.adminDashboard);
}

export function fetchAdminContactInquiries(params?: {
  limit?: number;
  page?: number;
  search?: string;
  service?: string;
}): Promise<AdminContactInquiry[]> {
  const searchParams = new URLSearchParams();
  if (params?.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }
  if (params?.page !== undefined) {
    searchParams.set("page", String(params.page));
  }
  if (params?.search) {
    searchParams.set("search", params.search);
  }
  if (params?.service) {
    searchParams.set("service", params.service);
  }

  const query = searchParams.toString();
  const path = query
    ? `${API_ROUTES.adminContactInquiries}?${query}`
    : API_ROUTES.adminContactInquiries;

  return adminAuthenticatedRequest<AdminContactInquiry[]>(path);
}

export function deleteAdminContactInquiry(id: string): Promise<{ deleted: boolean }> {
  return adminAuthenticatedRequest<{ deleted: boolean }>(
    API_ROUTES.adminContactInquiryById(id),
    { method: "DELETE" },
  );
}

export function fetchAdminPortfolio(): Promise<AdminPortfolioProject[]> {
  return adminAuthenticatedRequest<AdminPortfolioProject[]>(API_ROUTES.adminPortfolio);
}

export function createAdminPortfolioProject(
  body: Record<string, unknown>,
): Promise<unknown> {
  return adminAuthenticatedRequest(API_ROUTES.adminPortfolio, {
    method: "POST",
    body,
  });
}

export function updateAdminPortfolioProject(
  id: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  return adminAuthenticatedRequest(API_ROUTES.adminPortfolioById(id), {
    method: "PATCH",
    body,
  });
}

export function deleteAdminPortfolioProject(id: string): Promise<{ deleted: boolean }> {
  return adminAuthenticatedRequest<{ deleted: boolean }>(
    API_ROUTES.adminPortfolioById(id),
    { method: "DELETE" },
  );
}

export function fetchAdminPricing(): Promise<AdminPricingResponse> {
  return adminAuthenticatedRequest<AdminPricingResponse>(API_ROUTES.adminPricing);
}

export function createAdminPricingPackage(
  body: Record<string, unknown>,
): Promise<AdminPricingPackage> {
  return adminAuthenticatedRequest<AdminPricingPackage>(API_ROUTES.adminPricingPackages, {
    method: "POST",
    body,
  });
}

export function updateAdminPricingPackage(
  id: string,
  body: Record<string, unknown>,
): Promise<AdminPricingPackage> {
  return adminAuthenticatedRequest<AdminPricingPackage>(
    API_ROUTES.adminPricingPackageById(id),
    { method: "PATCH", body },
  );
}

export function deleteAdminPricingPackage(id: string): Promise<{ deleted: boolean }> {
  return adminAuthenticatedRequest<{ deleted: boolean }>(
    API_ROUTES.adminPricingPackageById(id),
    { method: "DELETE" },
  );
}

export function fetchAdminArticles(): Promise<AdminArticle[]> {
  return adminAuthenticatedRequest<AdminArticle[]>(API_ROUTES.adminArticles);
}

export function createAdminArticle(body: Record<string, unknown>): Promise<unknown> {
  return adminAuthenticatedRequest(API_ROUTES.adminArticles, {
    method: "POST",
    body,
  });
}

export function updateAdminArticle(
  id: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  return adminAuthenticatedRequest(API_ROUTES.adminArticleById(id), {
    method: "PATCH",
    body,
  });
}

export function deleteAdminArticle(id: string): Promise<{ deleted: boolean }> {
  return adminAuthenticatedRequest<{ deleted: boolean }>(API_ROUTES.adminArticleById(id), {
    method: "DELETE",
  });
}

export function fetchAdminFaq(): Promise<AdminFaqItem[]> {
  return adminAuthenticatedRequest<AdminFaqItem[]>(API_ROUTES.adminFaq);
}

export function createAdminFaqItem(body: Record<string, unknown>): Promise<unknown> {
  return adminAuthenticatedRequest(API_ROUTES.adminFaq, { method: "POST", body });
}

export function updateAdminFaqItem(
  id: string,
  body: Record<string, unknown>,
): Promise<unknown> {
  return adminAuthenticatedRequest(API_ROUTES.adminFaqById(id), {
    method: "PATCH",
    body,
  });
}

export function deleteAdminFaqItem(id: string): Promise<{ deleted: boolean }> {
  return adminAuthenticatedRequest<{ deleted: boolean }>(API_ROUTES.adminFaqById(id), {
    method: "DELETE",
  });
}

export function fetchAdminAssets(): Promise<AdminAsset[]> {
  return adminAuthenticatedRequest<AdminAsset[]>(API_ROUTES.adminAssets);
}

export async function uploadAdminAsset(key: string, file: File): Promise<unknown> {
  const formData = new FormData();
  formData.append("key", key);
  formData.append("file", file);

  const token = (await import("@/features/admin/lib/admin-auth-storage")).readAdminAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_ROUTES.adminAssets, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const { ApiError } = await import("@/shared/api/errors");
    throw new ApiError("Upload failed", response.status);
  }

  const json = (await response.json()) as { data: unknown };
  return json.data;
}

export function fetchAdminMedia(): Promise<AdminMediaListResponse> {
  return adminAuthenticatedRequest<AdminMediaListResponse>(API_ROUTES.adminMedia);
}

export async function uploadAdminMedia(file: File): Promise<unknown> {
  const formData = new FormData();
  formData.append("file", file);

  const { readAdminAuthToken } = await import("@/features/admin/lib/admin-auth-storage");
  const token = readAdminAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_ROUTES.adminMedia, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const { ApiError } = await import("@/shared/api/errors");
    throw new ApiError("Upload failed", response.status);
  }

  const json = (await response.json()) as { data: unknown };
  return json.data;
}

export function fetchAdminPaymentsOrders(): Promise<AdminOrder[]> {
  return adminAuthenticatedRequest<AdminOrder[]>(API_ROUTES.adminPaymentsOrders);
}

export function fetchAdminHomeHero(): Promise<AdminHomeHero> {
  return adminAuthenticatedRequest<AdminHomeHero>(API_ROUTES.adminHomeHero);
}

export function updateAdminHomeHero(input: AdminHomeHero): Promise<AdminHomeHero> {
  return adminAuthenticatedRequest<AdminHomeHero>(API_ROUTES.adminHomeHero, {
    method: "PATCH",
    body: input,
  });
}

const HOME_HERO_UPLOAD_CONTEXT = "homeHero";

async function postAdminUpload(
  file: File,
  context?: string,
): Promise<AdminHomeHeroUploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  if (context) {
    formData.append("context", context);
  }

  const { readAdminAuthToken } = await import("@/features/admin/lib/admin-auth-storage");
  const token = readAdminAuthToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_ROUTES.adminUpload, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const { ApiError } = await import("@/shared/api/errors");
    let message = "Upload failed";
    try {
      const json = (await response.json()) as { error?: { message?: string } };
      message = json.error?.message ?? message;
    } catch {
      // keep default message
    }
    throw new ApiError(message, response.status);
  }

  const json = (await response.json()) as { data: AdminHomeHeroUploadResult };
  return json.data;
}

export async function uploadAdminHomeHeroImage(
  file: File,
): Promise<AdminHomeHeroUploadResult> {
  return postAdminUpload(file, HOME_HERO_UPLOAD_CONTEXT);
}

export async function uploadAdminImage(file: File): Promise<AdminHomeHeroUploadResult> {
  return postAdminUpload(file);
}

export function fetchAdminHeroSlides(): Promise<AdminHeroSlide[]> {
  return adminAuthenticatedRequest<AdminHeroSlide[]>(API_ROUTES.adminHomeHeroSlides);
}

export function createAdminHeroSlide(body: Record<string, unknown>): Promise<AdminHeroSlide> {
  return adminAuthenticatedRequest<AdminHeroSlide>(API_ROUTES.adminHomeHeroSlides, {
    method: "POST",
    body,
  });
}

export function updateAdminHeroSlide(
  id: string,
  body: Record<string, unknown>,
): Promise<AdminHeroSlide> {
  return adminAuthenticatedRequest<AdminHeroSlide>(API_ROUTES.adminHomeHeroSlideById(id), {
    method: "PATCH",
    body,
  });
}

export function deleteAdminHeroSlide(id: string): Promise<{ deleted: boolean }> {
  return adminAuthenticatedRequest<{ deleted: boolean }>(
    API_ROUTES.adminHomeHeroSlideById(id),
    { method: "DELETE" },
  );
}

export function fetchAdminStudioServices(): Promise<AdminStudioService[]> {
  return adminAuthenticatedRequest<AdminStudioService[]>(API_ROUTES.adminStudioServices);
}

export function updateAdminStudioService(
  id: string,
  body: Record<string, unknown>,
): Promise<AdminStudioService> {
  return adminAuthenticatedRequest<AdminStudioService>(API_ROUTES.adminStudioServiceById(id), {
    method: "PATCH",
    body,
  });
}

export function fetchAdminContactFields(): Promise<AdminContactField[]> {
  return adminAuthenticatedRequest<AdminContactField[]>(API_ROUTES.adminContactFields);
}

export function saveAdminContactFields(
  fields: AdminContactField[],
): Promise<AdminContactField[]> {
  return adminAuthenticatedRequest<AdminContactField[]>(API_ROUTES.adminContactFields, {
    method: "PUT",
    body: {
      fields: fields.map((field) => ({
        fieldKey: field.fieldKey,
        label: field.label,
        placeholder: field.placeholder,
        mode: field.mode,
        sortOrder: field.sortOrder,
      })),
    },
  });
}

export function fetchAdminSiteCopy(): Promise<AdminSiteCopyItem[]> {
  return adminAuthenticatedRequest<AdminSiteCopyItem[]>(API_ROUTES.adminSiteCopy);
}

export function saveAdminSiteCopy(items: AdminSiteCopyItem[]): Promise<AdminSiteCopyItem[]> {
  return adminAuthenticatedRequest<AdminSiteCopyItem[]>(API_ROUTES.adminSiteCopy, {
    method: "PUT",
    body: { items },
  });
}

export function fetchAdminAnalytics(): Promise<{ url: string | null }> {
  return adminAuthenticatedRequest<{ url: string | null }>(API_ROUTES.adminAnalytics);
}
