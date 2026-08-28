import {
  listAdminContactFields,
  replaceContactFields,
} from "@/server/features/contact/admin-contact-fields";
import { updateContactFieldsSchema } from "@/server/features/contact/contact-fields.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getFields(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  return jsonSuccess(await listAdminContactFields());
}

async function putFields(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const body = await parseJsonBody(request, updateContactFieldsSchema);
  return jsonSuccess(await replaceContactFields(body));
}

export const GET = handleApiRoute(getFields);
export const PUT = handleApiRoute(putFields);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
