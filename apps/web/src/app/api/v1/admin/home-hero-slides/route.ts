import {
  createHomeHeroSlide,
  listAdminHomeHeroSlides,
} from "@/server/features/home-hero/admin-home-hero-slides";
import { createHomeHeroSlideSchema } from "@/server/features/home-hero/home-hero-slide.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getSlides(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  return jsonSuccess(await listAdminHomeHeroSlides());
}

async function postSlide(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const body = await parseJsonBody(request, createHomeHeroSlideSchema);
  const slide = await createHomeHeroSlide(body);
  return jsonSuccess(slide, { status: 201 });
}

export const GET = handleApiRoute(getSlides);
export const POST = handleApiRoute(postSlide);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
