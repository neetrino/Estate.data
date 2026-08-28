import {
  DEFAULT_STUDIO_SERVICES,
  type StudioServiceContent,
} from "@/features/home/content/studioServicesCopy";
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
    return rows.map((row) => ({
      sectionKey: row.sectionKey,
      eyebrow: row.eyebrow,
      title: row.title,
      description: row.description,
      imageUrl: row.imageUrl,
      galleryUrls: asStringArray(row.galleryUrls),
      included: asStringArray(row.included),
      pricing: asPricing(row.pricing),
      primaryCtaLabel: row.primaryCtaLabel,
      primaryCtaHref: row.primaryCtaHref,
      secondaryCtaLabel: row.secondaryCtaLabel,
      secondaryCtaHref: row.secondaryCtaHref,
    }));
  } catch (error) {
    logger.warn("studio_services.read.fallback_default", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return [...DEFAULT_STUDIO_SERVICES];
  }
}
