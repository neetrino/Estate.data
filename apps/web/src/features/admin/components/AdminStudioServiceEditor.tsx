"use client";

import { useState } from "react";
import { AdminMatterportDemoFields } from "@/features/admin/components/AdminMatterportDemoFields";
import { AdminExampleFields } from "@/features/admin/components/AdminExampleFields";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminJumpTargetField } from "@/features/admin/components/ui/AdminJumpTargetField";
import { AdminTabs, adminTabHidden } from "@/features/admin/components/ui/AdminTabs";
import {
  studioServiceToDraft,
  type StudioServiceEditorDraft,
} from "@/features/admin/lib/admin-studio-service-draft";
import { saveStudioServiceDraft } from "@/features/admin/lib/save-studio-service-draft";
import { serviceEditorTabs, type ServiceEditorTabId } from "@/features/admin/lib/admin-studio-service-tabs";
import { updateAdminStudioService, uploadAdminImage } from "@/features/admin/services/admin-api";
import type { AdminStudioService } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";
import {
  ADMIN_HIDE_ON_WEBSITE_LABEL,
  ADMIN_POSITION_HINT,
  ADMIN_POSITION_LABEL,
  ADMIN_SHOW_ON_WEBSITE_ACTION,
} from "@/features/admin/content/adminCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

const UPLOAD_FAILED_MESSAGE = "Upload failed";
const PRICING_HINT = "One price per line: Size | Price. Example: Up to 2,000 sq ft | $249";

type DraftFieldsProps = {
  readonly serviceId: string;
  readonly draft: StudioServiceEditorDraft;
  readonly onChange: <K extends keyof StudioServiceEditorDraft>(
    field: K,
    value: StudioServiceEditorDraft[K],
  ) => void;
};

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
        label={ADMIN_POSITION_LABEL}
        name={`sort-${serviceId}`}
        type="number"
        value={draft.sortOrder}
        onChange={(value) => onChange("sortOrder", value)}
        hint={ADMIN_POSITION_HINT}
      />
    </>
  );
}

type AdminStudioServiceEditorProps = {
  readonly service: AdminStudioService;
  readonly onSaved: () => void;
};

/** Editor for a single studio service. */
export function AdminStudioServiceEditor({ service, onSaved }: AdminStudioServiceEditorProps) {
  const [draft, setDraft] = useState<StudioServiceEditorDraft>(() => studioServiceToDraft(service));
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [tab, setTab] = useState<ServiceEditorTabId>("words");
  const showImage = service.sectionKey !== HOME_SECTION_IDS.aiMedia;
  const showMatterportDemo = service.sectionKey === HOME_SECTION_IDS.tours;
  const tabs = serviceEditorTabs(showImage, showMatterportDemo);

  function setField<K extends keyof StudioServiceEditorDraft>(
    field: K,
    value: StudioServiceEditorDraft[K],
  ) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  async function uploadImage(file: File) {
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

  return (
    <div className={`${ADMIN_CARD_CLASS} space-y-4`}>
      {uploadError ? <AdminErrorState message={uploadError} /> : null}
      {saveError ? <AdminErrorState message={saveError} /> : null}
      <AdminTabs items={tabs} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <ServiceCopyFields serviceId={service.id} draft={draft} onChange={setField} />
      </div>
      {showImage ? (
        <div className={adminTabHidden(tab === "picture")}>
          <AdminImageUploader
            label="Image"
            previewUrl={draft.imageUrl ? normalizePublicAssetUrl(draft.imageUrl) : null}
            uploading={uploading}
            placeholderText="Upload a service image"
            onUpload={uploadImage}
          />
        </div>
      ) : null}
      {showMatterportDemo ? (
        <div className={adminTabHidden(tab === "tour")}>
          <AdminMatterportDemoFields
            serviceId={service.id}
            demoLabel={draft.demoLabel}
            demoSpaceId={draft.demoSpaceId}
            onLabelChange={(value) => setField("demoLabel", value)}
            onSpaceIdChange={(value) => setField("demoSpaceId", value)}
          />
        </div>
      ) : null}
      <div className={adminTabHidden(tab === "prices")}>
        <ServiceOfferFields serviceId={service.id} draft={draft} onChange={setField} />
      </div>
      <div className={adminTabHidden(tab === "example")}>
        <AdminExampleFields
          idPrefix={`example-${service.id}`}
          value={draft.example}
          onChange={(example) => setField("example", example)}
          showEmbed={showMatterportDemo}
        />
      </div>
      <div className={adminTabHidden(tab === "button")}>
        <ServiceCtaFields serviceId={service.id} draft={draft} onChange={setField} />
      </div>
      <div className="mt-3 flex gap-2">
        <AdminButton
          disabled={uploading}
          onClick={() =>
            void saveStudioServiceDraft(service.id, draft).then((message) => {
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
          {service.published ? ADMIN_HIDE_ON_WEBSITE_LABEL : ADMIN_SHOW_ON_WEBSITE_ACTION}
        </AdminButton>
      </div>
    </div>
  );
}

