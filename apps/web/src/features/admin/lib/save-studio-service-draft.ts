import { ADMIN_POSITION_ERROR } from "@/features/admin/content/adminCopy";
import {
  parseIncludedLines,
  parsePricingLines,
  type StudioServiceEditorDraft,
} from "@/features/admin/lib/admin-studio-service-draft";
import { updateAdminStudioService } from "@/features/admin/services/admin-api";
import { serviceExampleSchema } from "@/server/features/studio/service-example.schema";
import { parseMatterportSpaceId } from "@/shared/lib/matterportEmbed";

/** Persist one studio-service editor draft. Returns an error message or null. */
export async function saveStudioServiceDraft(
  serviceId: string,
  draft: StudioServiceEditorDraft,
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
  const exampleParsed = serviceExampleSchema.safeParse(draft.example);
  if (!exampleParsed.success) {
    return "Fill in the Example tab: title, description, photo, and at least one highlight.";
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
      example: exampleParsed.data,
      sortOrder,
    });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "Save failed";
  }
}
