import {
  DEFAULT_STUDIO_SERVICES,
  type StudioServiceContent,
} from "@/features/home/content/studioServicesCopy";
import { STUDIO_SERVICE_EXAMPLES } from "@/features/home/content/studioServiceExamples";
import { serviceExampleSchema } from "@/server/features/studio/service-example.schema";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";
import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

function asPricing(value: unknown): StudioServiceContent["pricing"] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const row = item as { label?: unknown; price?: unknown };
    if (typeof row.label !== "string" || typeof row.price !== "string") {
      return [];
    }
    return [{ label: row.label, price: row.price }];
  });
}

function asOptionalText(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function asExample(
  value: unknown,
  sectionKey: string,
): StudioServiceContent["example"] {
  const parsed = serviceExampleSchema.safeParse(value);
  if (parsed.success) {
    return parsed.data;
  }
  return STUDIO_SERVICE_EXAMPLES[sectionKey];
}

/** Published studio service blocks with static fallback. */
export async function getStudioServiceSections(): Promise<StudioServiceContent[]> {
  try {
    const rows = await getPrisma().studioServiceSection.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) {
      return [...DEFAULT_STUDIO_SERVICES];
    }

    const defaultsByKey = new Map(
      DEFAULT_STUDIO_SERVICES.map((service) => [service.sectionKey, service]),
    );

    return rows.map((row) => {
      const defaults = defaultsByKey.get(row.sectionKey);
      return {
        sectionKey: row.sectionKey,
        eyebrow: row.eyebrow,
        title: row.title,
        description: row.description,
        imageUrl: normalizePublicAssetUrl(row.imageUrl),
        included: asStringArray(row.included),
        pricing: asPricing(row.pricing),
        primaryCtaLabel: row.primaryCtaLabel,
        primaryCtaHref: row.primaryCtaHref,
        secondaryCtaLabel: row.secondaryCtaLabel,
        secondaryCtaHref: row.secondaryCtaHref,
        startingPrice:
          asOptionalText(row.startingPrice) ?? defaults?.startingPrice,
        pricingUnit: asOptionalText(row.pricingUnit) ?? defaults?.pricingUnit,
        footnote: asOptionalText(row.footnote) ?? defaults?.footnote,
        demoLabel: asOptionalText(row.demoLabel) ?? defaults?.demoLabel,
        demoSpaceId: asOptionalText(row.demoSpaceId) ?? defaults?.demoSpaceId,
        example: asExample(row.example, row.sectionKey),
      };
    });
  } catch (error) {
    logger.warn("studio_services.read.fallback_default", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return [...DEFAULT_STUDIO_SERVICES];
  }
}
