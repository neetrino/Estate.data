import {
  listRecentWorkProjects,
  parseRecentWorkLimit,
} from "@/server/features/recent-work/list-recent-work-projects";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getRecentProjects(
  request: Request
): Promise<Response> {
  const limit = parseRecentWorkLimit(new URL(request.url).searchParams.get("limit"));
  const projects = await listRecentWorkProjects(limit);

  return jsonSuccess(projects);
}

export const GET = handleApiRoute(getRecentProjects);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
