import { getHomeHero } from "@/server/features/home-hero/get-home-hero";
import { updateHomeHeroSchema } from "@/server/features/home-hero/home-hero.schema";
import { updateHomeHero } from "@/server/features/home-hero/update-home-hero";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getAdminHomeHero(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const hero = await getHomeHero();
  return jsonSuccess(hero);
}

async function patchAdminHomeHero(request: Request): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, updateHomeHeroSchema);
  const hero = await updateHomeHero(body);

  logger.info("admin.home-hero.updated");

  return jsonSuccess(hero);
}

export const GET = handleApiRoute(getAdminHomeHero);
export const PATCH = handleApiRoute(patchAdminHomeHero);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
