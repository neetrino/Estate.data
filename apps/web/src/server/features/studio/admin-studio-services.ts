import { getPrisma } from "@/server/lib/db";
import { ApiError } from "@/server/lib/api-error";
import type { UpdateStudioServiceInput } from "@/server/features/studio/studio-service.schema";
import { PUBLIC_STUDIO_SERVICE_KEYS } from "@/server/features/studio/studio-service-keys";

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
    where: { sectionKey: { in: [...PUBLIC_STUDIO_SERVICE_KEYS] } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

function exampleWriteValue(example: UpdateStudioServiceInput["example"]) {
  if (!example) {
    return undefined;
  }
  return {
    label: example.label,
    title: example.title,
    summary: example.summary,
    imageUrl: example.imageUrl,
    highlights: example.highlights,
    ...(example.embedUrl ? { embedUrl: example.embedUrl } : {}),
  };
}

export async function updateStudioService(id: string, input: UpdateStudioServiceInput) {
  const { example, ...rest } = input;
  const data = {
    ...rest,
    startingPrice: emptyToNull(input.startingPrice),
    pricingUnit: emptyToNull(input.pricingUnit),
    footnote: emptyToNull(input.footnote),
    demoLabel: emptyToNull(input.demoLabel),
    demoSpaceId: emptyToNull(input.demoSpaceId),
    example: exampleWriteValue(example),
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
