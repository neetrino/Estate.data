import { listAdminContactInquiries } from "@/server/features/contact/list-admin-contact-inquiries";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { z } from "zod";

const listQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional(),
  page: z.coerce.number().int().min(1).optional(),
  search: z.string().max(200).optional(),
  service: z.string().max(120).optional(),
});

function parseListQuery(request: Request) {
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  const parsed = listQuerySchema.safeParse(params);
  return parsed.success ? parsed.data : {};
}

async function getAdminContactInquiries(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const inquiries = await listAdminContactInquiries(parseListQuery(request));
  return jsonSuccess(inquiries);
}

export const GET = handleApiRoute(getAdminContactInquiries);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
