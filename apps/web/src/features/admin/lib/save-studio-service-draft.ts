import { ADMIN_POSITION_ERROR } from "@/features/admin/content/adminCopy";
import {
  parseIncludedLines,
  parsePricingLines,
} from "@/features/admin/lib/admin-studio-service-draft";
import { updateAdminStudioService } from "@/features/admin/services/admin-api";
import { parseMatterportSpaceId } from "@/shared/lib/matterportEmbed";

export type StudioServiceSaveDraft = {
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
  sortOrder: string;
};

/** Persist one studio-service editor draft. Returns an error message or null. */
export async function saveStudioServiceDraft(
  serviceId: string,
  draft: StudioServiceSaveDraft,
): Promise<string | null> {
  const sortOrder = Number.parseInt(draft.sortOrder, 10);
  if (!Number.isFinite(sortOrder) || sortOrder < 0) {
    return ADMIN_POSITION_ERROR;
  }
  const demoSpaceId = draft.demoSpaceId.trim()
    ? parseMatterportSpaceId(draft.demoSpaceId)
    : null;
  if (draft.demoSpaceId.trim() && !demoSpaceId) {
    return "Paste a Matterport share URL (my.matterport.com/show/?m=…).";
  }
  try {
    await updateAdminStudioService(serviceId, {
      eyebrow: draft.eyebrow,
      title: draft.title,
      description: draft.description,
      imageUrl: draft.imageUrl,
      included: parseIncludedLines(draft.includedText),
      pricing: parsePricingLines(draft.pricingText),
      primaryCtaLabel: draft.primaryCtaLabel,
      primaryCtaHref: draft.primaryCtaHref,
      startingPrice: draft.startingPrice.trim() || null,
      pricingUnit: draft.pricingUnit.trim() || null,
      footnote: draft.footnote.trim() || null,
      demoLabel: draft.demoLabel.trim() || null,
      demoSpaceId,
      sortOrder,
    });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "Save failed";
  }
}
