import { getLocalesPayload } from "@/features/i18n/locales";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";

async function getLocales(): Promise<Response> {
  return jsonSuccess(getLocalesPayload());
}

export const GET = handleApiRoute(getLocales);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
