import { getPrisma } from "@/server/lib/db";
import { ApiError } from "@/server/lib/api-error";
import type { UpdateStudioServiceInput } from "@/server/features/studio/studio-service.schema";

function emptyToNull(value: string | null | undefined): string | null | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function listAdminStudioServices() {
  return getPrisma().studioServiceSection.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function updateStudioService(id: string, input: UpdateStudioServiceInput) {
  const data: UpdateStudioServiceInput = {
    ...input,
    startingPrice: emptyToNull(input.startingPrice),
    pricingUnit: emptyToNull(input.pricingUnit),
    footnote: emptyToNull(input.footnote),
  };

  try {
    return await getPrisma().studioServiceSection.update({
      where: { id },
      data,
    });
  } catch {
    throw ApiError.notFound("Studio service not found");
  }
}
