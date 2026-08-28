import {
  deleteHomeHeroSlide,
  updateHomeHeroSlide,
} from "@/server/features/home-hero/admin-home-hero-slides";
import { updateHomeHeroSlideSchema } from "@/server/features/home-hero/home-hero-slide.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import type { ApiRouteContext } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchSlide(request: Request, context: ApiRouteContext): Promise<Response> {
  await requireAdminAuth(request);
  const { id } = await context.params;
  const body = await parseJsonBody(request, updateHomeHeroSlideSchema);
  return jsonSuccess(await updateHomeHeroSlide(id, body));
}

async function removeSlide(request: Request, context: ApiRouteContext): Promise<Response> {
  await requireAdminAuth(request);
  const { id } = await context.params;
  return jsonSuccess(await deleteHomeHeroSlide(id));
}

export const PATCH = handleApiRoute(patchSlide);
export const DELETE = handleApiRoute(removeSlide);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
