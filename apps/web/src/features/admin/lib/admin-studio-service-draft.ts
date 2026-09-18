import { STUDIO_SERVICE_EXAMPLES } from "@/features/home/content/studioServiceExamples";
import type { AdminStudioService } from "@/features/admin/types/admin-data";
import { serviceExampleSchema, type ServiceExampleCopy } from "@/server/features/studio/service-example.schema";
import { matterportShareUrl } from "@/shared/lib/matterportEmbed";

export type PricingDraftRow = { label: string; price: string };

export type StudioServiceEditorDraft = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  includedText: string;
  pricingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  startingPrice: string;
  pricingUnit: string;
  footnote: string;
  demoLabel: string;
  demoSpaceId: string;
  example: ServiceExampleCopy;
  sortOrder: string;
};

function resolveExample(service: AdminStudioService): ServiceExampleCopy {
  const parsed = serviceExampleSchema.safeParse(service.example);
  if (parsed.success) {
    return parsed.data;
  }
  const fallback = STUDIO_SERVICE_EXAMPLES[service.sectionKey];
  if (fallback) {
    return {
      ...fallback,
      highlights: [...fallback.highlights],
    };
  }
  return {
    label: service.eyebrow,
    title: service.title,
    summary: service.description,
    imageUrl: service.imageUrl,
    highlights: asStringList(service.included).slice(0, 4),
  };
}

/** Prefill the studio-service editor from CMS, with static example fallback. */
export function studioServiceToDraft(service: AdminStudioService): StudioServiceEditorDraft {
  return {
    eyebrow: service.eyebrow,
    title: service.title,
    description: service.description,
    imageUrl: service.imageUrl,
    includedText: asStringList(service.included).join("\n"),
    pricingText: formatPricingLines(asPricingRows(service.pricing)),
    primaryCtaLabel: service.primaryCtaLabel,
    primaryCtaHref: service.primaryCtaHref,
    startingPrice: service.startingPrice ?? "",
    pricingUnit: service.pricingUnit ?? "",
    footnote: service.footnote ?? "",
    demoLabel: service.demoLabel ?? "",
    demoSpaceId: service.demoSpaceId ? matterportShareUrl(service.demoSpaceId) : "",
    example: resolveExample(service),
    sortOrder: String(service.sortOrder),
  };
}

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

export function asPricingRows(value: unknown): PricingDraftRow[] {
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

export function parseIncludedLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function parsePricingLines(text: string): PricingDraftRow[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const separator = line.includes("|") ? "|" : "\t";
      const [label = "", ...rest] = line.split(separator);
      return { label: label.trim(), price: rest.join(separator).trim() };
    })
    .filter((row) => row.label.length > 0 && row.price.length > 0);
}

export function formatPricingLines(rows: readonly PricingDraftRow[]): string {
  return rows.map((row) => `${row.label} | ${row.price}`).join("\n");
}
