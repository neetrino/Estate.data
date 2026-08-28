import { getPrisma } from "@/server/lib/db";
import { ApiError } from "@/server/lib/api-error";
import type { UpdateStudioServiceInput } from "@/server/features/studio/studio-service.schema";

export async function listAdminStudioServices() {
  return getPrisma().studioServiceSection.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function updateStudioService(id: string, input: UpdateStudioServiceInput) {
  try {
    return await getPrisma().studioServiceSection.update({
      where: { id },
      data: input,
    });
  } catch {
    throw ApiError.notFound("Studio service not found");
  }
}
