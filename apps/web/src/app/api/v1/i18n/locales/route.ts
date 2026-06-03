import { getLocalesPayload } from "@/server/features/i18n/locales";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getLocales(): Promise<Response> {
  return jsonSuccess(getLocalesPayload());
}

export const GET = handleApiRoute(getLocales);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
