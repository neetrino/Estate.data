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
  fetchAdminStudioServices,
  updateAdminStudioService,
  uploadAdminImage,
} from "@/features/admin/services/admin-api";
import type { AdminStudioService } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const UPLOAD_FAILED_MESSAGE = "Upload failed";

type ServiceDraft = {
  title: string;
  description: string;
  imageUrl: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

function toDraft(service: AdminStudioService): ServiceDraft {
  return {
    title: service.title,
    description: service.description,
    imageUrl: service.imageUrl,
    primaryCtaLabel: service.primaryCtaLabel,
    primaryCtaHref: service.primaryCtaHref,
  };
}

export function AdminStudioServicesPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminStudioServices(), []);
  const services = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Studio services"
        description="Edit titles, descriptions, images, CTAs, order, and visibility."
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

  return (
    <li className={ADMIN_CARD_CLASS}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{service.sectionKey}</p>
      {uploadError ? <AdminErrorState message={uploadError} /> : null}
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
      <ServiceEditorActions
        service={service}
        draft={draft}
        disabled={uploading}
        onSaved={onSaved}
      />
    </li>
  );
}

function ServiceEditorActions({
  service,
  draft,
  disabled,
  onSaved,
}: {
  service: AdminStudioService;
  draft: ServiceDraft;
  disabled: boolean;
  onSaved: () => void;
}) {
  return (
    <div className="mt-3 flex gap-2">
      <AdminButton
        disabled={disabled}
        onClick={() => void updateAdminStudioService(service.id, { ...draft }).then(onSaved)}
      >
        Save
      </AdminButton>
      <AdminButton
        variant="secondary"
        disabled={disabled}
        onClick={() =>
          void updateAdminStudioService(service.id, { published: !service.published }).then(onSaved)
        }
      >
        {service.published ? "Unpublish" : "Publish"}
      </AdminButton>
    </div>
  );
}
