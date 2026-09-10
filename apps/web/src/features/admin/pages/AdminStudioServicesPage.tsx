"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  asPricingRows,
  asStringList,
  formatPricingLines,
  parseIncludedLines,
  parsePricingLines,
} from "@/features/admin/lib/admin-studio-service-draft";
import {
  fetchAdminStudioServices,
  updateAdminStudioService,
  uploadAdminImage,
} from "@/features/admin/services/admin-api";
import type { AdminStudioService } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const UPLOAD_FAILED_MESSAGE = "Upload failed";
const PRICING_HINT = "One row per line: Label | Price";

type ServiceDraft = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  includedText: string;
  pricingText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  startingPrice: string;
  pricingUnit: string;
  footnote: string;
  sortOrder: string;
};

function toDraft(service: AdminStudioService): ServiceDraft {
  return {
    eyebrow: service.eyebrow,
    title: service.title,
    description: service.description,
    imageUrl: service.imageUrl,
    includedText: asStringList(service.included).join("\n"),
    pricingText: formatPricingLines(asPricingRows(service.pricing)),
    primaryCtaLabel: service.primaryCtaLabel,
    primaryCtaHref: service.primaryCtaHref,
    secondaryCtaLabel: service.secondaryCtaLabel,
    secondaryCtaHref: service.secondaryCtaHref,
    startingPrice: service.startingPrice ?? "",
    pricingUnit: service.pricingUnit ?? "",
    footnote: service.footnote ?? "",
    sortOrder: String(service.sortOrder),
  };
}

export function AdminStudioServicesPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminStudioServices(), []);
  const services = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Studio services"
        description="Edit copy, images, included lists, pricing, Starting at, CTAs, order, and visibility."
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      <ul className="grid gap-4">
        {services.map((service) => (
          <ServiceEditor key={service.id} service={service} onSaved={reload} />
        ))}
      </ul>
    </>
  );
}

function ServiceEditor({
  service,
  onSaved,
}: {
  service: AdminStudioService;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState<ServiceDraft>(() => toDraft(service));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  function setField<K extends keyof ServiceDraft>(field: K, value: ServiceDraft[K]) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  async function handleUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const uploaded = await uploadAdminImage(file);
      setField("imageUrl", uploaded.publicUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : UPLOAD_FAILED_MESSAGE);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaveError(null);
    const sortOrder = Number.parseInt(draft.sortOrder, 10);
    if (!Number.isFinite(sortOrder) || sortOrder < 0) {
      setSaveError("Sort order must be a non-negative number.");
      return;
    }

    try {
      await updateAdminStudioService(service.id, {
        eyebrow: draft.eyebrow,
        title: draft.title,
        description: draft.description,
        imageUrl: draft.imageUrl,
        included: parseIncludedLines(draft.includedText),
        pricing: parsePricingLines(draft.pricingText),
        primaryCtaLabel: draft.primaryCtaLabel,
        primaryCtaHref: draft.primaryCtaHref,
        secondaryCtaLabel: draft.secondaryCtaLabel,
        secondaryCtaHref: draft.secondaryCtaHref,
        startingPrice: draft.startingPrice.trim() || null,
        pricingUnit: draft.pricingUnit.trim() || null,
        footnote: draft.footnote.trim() || null,
        sortOrder,
      });
      onSaved();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Save failed");
    }
  }

  return (
    <li className={ADMIN_CARD_CLASS}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{service.sectionKey}</p>
      {uploadError ? <AdminErrorState message={uploadError} /> : null}
      {saveError ? <AdminErrorState message={saveError} /> : null}

      <AdminFormField
        label="Eyebrow"
        name={`eyebrow-${service.id}`}
        value={draft.eyebrow}
        onChange={(value) => setField("eyebrow", value)}
      />
      <AdminFormField
        label="Title"
        name={`title-${service.id}`}
        value={draft.title}
        onChange={(value) => setField("title", value)}
      />
      <AdminFormField
        label="Description"
        name={`desc-${service.id}`}
        value={draft.description}
        onChange={(value) => setField("description", value)}
        multiline
      />
      <AdminImageUploader
        label="Image"
        previewUrl={draft.imageUrl ? normalizePublicAssetUrl(draft.imageUrl) : null}
        uploading={uploading}
        placeholderText="Upload a service image"
        onUpload={handleUpload}
      />
      <AdminFormField
        label="What's included"
        name={`included-${service.id}`}
        value={draft.includedText}
        onChange={(value) => setField("includedText", value)}
        multiline
        rows={8}
        hint="One item per line"
      />
      <AdminFormField
        label="Pricing rows"
        name={`pricing-${service.id}`}
        value={draft.pricingText}
        onChange={(value) => setField("pricingText", value)}
        multiline
        rows={6}
        hint={PRICING_HINT}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <AdminFormField
          label="Starting price"
          name={`starting-${service.id}`}
          value={draft.startingPrice}
          onChange={(value) => setField("startingPrice", value)}
          hint='Shown as “Starting at $X”. Leave empty to hide.'
        />
        <AdminFormField
          label="Pricing unit"
          name={`unit-${service.id}`}
          value={draft.pricingUnit}
          onChange={(value) => setField("pricingUnit", value)}
          hint='Optional, e.g. "/ image"'
        />
      </div>
      <AdminFormField
        label="Footnote"
        name={`footnote-${service.id}`}
        value={draft.footnote}
        onChange={(value) => setField("footnote", value)}
        multiline
        rows={3}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <AdminFormField
          label="Primary button"
          name={`cta-${service.id}`}
          value={draft.primaryCtaLabel}
          onChange={(value) => setField("primaryCtaLabel", value)}
        />
        <AdminFormField
          label="Primary button href"
          name={`href-${service.id}`}
          value={draft.primaryCtaHref}
          onChange={(value) => setField("primaryCtaHref", value)}
        />
        <AdminFormField
          label="Secondary button"
          name={`secondary-cta-${service.id}`}
          value={draft.secondaryCtaLabel}
          onChange={(value) => setField("secondaryCtaLabel", value)}
        />
        <AdminFormField
          label="Secondary button href"
          name={`secondary-href-${service.id}`}
          value={draft.secondaryCtaHref}
          onChange={(value) => setField("secondaryCtaHref", value)}
        />
      </div>
      <AdminFormField
        label="Sort order"
        name={`sort-${service.id}`}
        type="number"
        value={draft.sortOrder}
        onChange={(value) => setField("sortOrder", value)}
      />

      <div className="mt-3 flex gap-2">
        <AdminButton disabled={uploading} onClick={() => void handleSave()}>
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
    </li>
  );
}
