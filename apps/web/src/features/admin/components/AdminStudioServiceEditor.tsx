"use client";

import { useState } from "react";
import { AdminServiceGalleryField } from "@/features/admin/components/AdminServiceGalleryField";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminJumpTargetField } from "@/features/admin/components/ui/AdminJumpTargetField";
import {
  asPricingRows,
  asStringList,
  formatPricingLines,
  parseIncludedLines,
  parsePricingLines,
} from "@/features/admin/lib/admin-studio-service-draft";
import { updateAdminStudioService, uploadAdminImage } from "@/features/admin/services/admin-api";
import type { AdminStudioService } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

const UPLOAD_FAILED_MESSAGE = "Upload failed";
const PRICING_HINT = "One row per line: Label | Price";

type ServiceDraft = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  galleryText: string;
  includedText: string;
  pricingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  startingPrice: string;
  pricingUnit: string;
  footnote: string;
  sortOrder: string;
};

type DraftFieldsProps = {
  readonly serviceId: string;
  readonly draft: ServiceDraft;
  readonly onChange: <K extends keyof ServiceDraft>(field: K, value: ServiceDraft[K]) => void;
};

function toDraft(service: AdminStudioService): ServiceDraft {
  return {
    eyebrow: service.eyebrow,
    title: service.title,
    description: service.description,
    imageUrl: service.imageUrl,
    galleryText: asStringList(service.galleryUrls).join("\n"),
    includedText: asStringList(service.included).join("\n"),
    pricingText: formatPricingLines(asPricingRows(service.pricing)),
    primaryCtaLabel: service.primaryCtaLabel,
    primaryCtaHref: service.primaryCtaHref,
    startingPrice: service.startingPrice ?? "",
    pricingUnit: service.pricingUnit ?? "",
    footnote: service.footnote ?? "",
    sortOrder: String(service.sortOrder),
  };
}

function ServiceCopyFields({ serviceId, draft, onChange }: DraftFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name={`eyebrow-${serviceId}`}
        value={draft.eyebrow}
        onChange={(value) => onChange("eyebrow", value)}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Title"
        name={`title-${serviceId}`}
        value={draft.title}
        onChange={(value) => onChange("title", value)}
      />
      <AdminFormField
        label="Description"
        name={`desc-${serviceId}`}
        value={draft.description}
        onChange={(value) => onChange("description", value)}
        multiline
      />
    </>
  );
}

function ServiceOfferFields({ serviceId, draft, onChange }: DraftFieldsProps) {
  return (
    <>
      <AdminFormField
        label="What's included"
        name={`included-${serviceId}`}
        value={draft.includedText}
        onChange={(value) => onChange("includedText", value)}
        multiline
        rows={8}
        hint="One item per line"
      />
      <AdminFormField
        label="Pricing rows"
        name={`pricing-${serviceId}`}
        value={draft.pricingText}
        onChange={(value) => onChange("pricingText", value)}
        multiline
        rows={6}
        hint={PRICING_HINT}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <AdminFormField
          label="Starting price"
          name={`starting-${serviceId}`}
          value={draft.startingPrice}
          onChange={(value) => onChange("startingPrice", value)}
          hint='Shown as “Starting at $X”. Leave empty to hide.'
        />
        <AdminFormField
          label="Pricing unit"
          name={`unit-${serviceId}`}
          value={draft.pricingUnit}
          onChange={(value) => onChange("pricingUnit", value)}
          hint='Optional, e.g. "/ image"'
        />
      </div>
      <AdminFormField
        label="Footnote"
        name={`footnote-${serviceId}`}
        value={draft.footnote}
        onChange={(value) => onChange("footnote", value)}
        multiline
        rows={3}
      />
    </>
  );
}

function ServiceCtaFields({ serviceId, draft, onChange }: DraftFieldsProps) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2">
        <AdminFormField
          label="Button text"
          name={`cta-${serviceId}`}
          value={draft.primaryCtaLabel}
          onChange={(value) => onChange("primaryCtaLabel", value)}
        />
        <AdminJumpTargetField
          label="Button goes to"
          name={`href-${serviceId}`}
          value={draft.primaryCtaHref}
          onChange={(value) => onChange("primaryCtaHref", value)}
        />
      </div>
      <AdminFormField
        label="Sort order"
        name={`sort-${serviceId}`}
        type="number"
        value={draft.sortOrder}
        onChange={(value) => onChange("sortOrder", value)}
      />
    </>
  );
}

type AdminStudioServiceEditorProps = {
  readonly service: AdminStudioService;
  readonly onSaved: () => void;
};

async function saveServiceDraft(serviceId: string, draft: ServiceDraft): Promise<string | null> {
  const sortOrder = Number.parseInt(draft.sortOrder, 10);
  if (!Number.isFinite(sortOrder) || sortOrder < 0) {
    return "Sort order must be a non-negative number.";
  }
  try {
    await updateAdminStudioService(serviceId, {
      eyebrow: draft.eyebrow,
      title: draft.title,
      description: draft.description,
      imageUrl: draft.imageUrl,
      galleryUrls: parseIncludedLines(draft.galleryText),
      included: parseIncludedLines(draft.includedText),
      pricing: parsePricingLines(draft.pricingText),
      primaryCtaLabel: draft.primaryCtaLabel,
      primaryCtaHref: draft.primaryCtaHref,
      startingPrice: draft.startingPrice.trim() || null,
      pricingUnit: draft.pricingUnit.trim() || null,
      footnote: draft.footnote.trim() || null,
      sortOrder,
    });
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : "Save failed";
  }
}

/** Editor for a single studio service. */
export function AdminStudioServiceEditor({ service, onSaved }: AdminStudioServiceEditorProps) {
  const [draft, setDraft] = useState<ServiceDraft>(() => toDraft(service));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const showImage = service.sectionKey !== HOME_SECTION_IDS.aiMedia;

  function setField<K extends keyof ServiceDraft>(field: K, value: ServiceDraft[K]) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  async function uploadTo(field: "image" | "gallery", file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const uploaded = await uploadAdminImage(file);
      if (field === "image") {
        setField("imageUrl", uploaded.publicUrl);
        return;
      }
      setDraft((previous) => {
        const lines = parseIncludedLines(previous.galleryText);
        return { ...previous, galleryText: [...lines, uploaded.publicUrl].join("\n") };
      });
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : UPLOAD_FAILED_MESSAGE);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={`${ADMIN_CARD_CLASS} space-y-4`}>
      {uploadError ? <AdminErrorState message={uploadError} /> : null}
      {saveError ? <AdminErrorState message={saveError} /> : null}
      <ServiceCopyFields serviceId={service.id} draft={draft} onChange={setField} />
      {showImage ? (
        <AdminImageUploader
          label="Image"
          previewUrl={draft.imageUrl ? normalizePublicAssetUrl(draft.imageUrl) : null}
          uploading={uploading}
          placeholderText="Upload a service image"
          onUpload={(file) => uploadTo("image", file)}
        />
      ) : null}
      <AdminServiceGalleryField
        serviceId={service.id}
        galleryText={draft.galleryText}
        uploading={uploading}
        onGalleryTextChange={(value) => setField("galleryText", value)}
        onUpload={(file) => uploadTo("gallery", file)}
      />
      <ServiceOfferFields serviceId={service.id} draft={draft} onChange={setField} />
      <ServiceCtaFields serviceId={service.id} draft={draft} onChange={setField} />
      <div className="mt-3 flex gap-2">
        <AdminButton
          disabled={uploading}
          onClick={() =>
            void saveServiceDraft(service.id, draft).then((message) => {
              if (message) {
                setSaveError(message);
                return;
              }
              setSaveError(null);
              onSaved();
            })
          }
        >
          Save
        </AdminButton>
        <AdminButton
          variant="secondary"
          disabled={uploading}
          onClick={() =>
            void updateAdminStudioService(service.id, { published: !service.published }).then(
              onSaved,
            )
          }
        >
          {service.published ? "Unpublish" : "Publish"}
        </AdminButton>
      </div>
    </div>
  );
}

