"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { uploadAdminImage } from "@/features/admin/services/admin-api";
import type { ServiceExampleCopy } from "@/server/features/studio/service-example.schema";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

type AdminExampleFieldsProps = {
  readonly idPrefix: string;
  readonly value: ServiceExampleCopy;
  readonly onChange: (next: ServiceExampleCopy) => void;
  readonly showEmbed?: boolean;
};

export function AdminExampleFields({
  idPrefix,
  value,
  onChange,
  showEmbed = false,
}: AdminExampleFieldsProps) {
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <AdminFormField
        label="Small label"
        name={`${idPrefix}-label`}
        value={value.label}
        onChange={(label) => onChange({ ...value, label })}
      />
      <AdminFormField
        label="Title"
        name={`${idPrefix}-title`}
        value={value.title}
        onChange={(title) => onChange({ ...value, title })}
      />
      <AdminFormField
        label="Description"
        name={`${idPrefix}-summary`}
        value={value.summary}
        onChange={(summary) => onChange({ ...value, summary })}
        multiline
        rows={4}
      />
      <AdminImageUploader
        label="Example photo"
        previewUrl={normalizePublicAssetUrl(value.imageUrl)}
        uploading={uploading}
        onUpload={async (file) => {
          setUploading(true);
          try {
            const uploaded = await uploadAdminImage(file);
            onChange({ ...value, imageUrl: uploaded.publicUrl });
          } finally {
            setUploading(false);
          }
        }}
      />
      <AdminFormField
        label="Highlights"
        name={`${idPrefix}-highlights`}
        value={value.highlights.join("\n")}
        onChange={(text) => onChange({ ...value, highlights: parseIncludedLines(text) })}
        multiline
        rows={6}
        hint="Short points under the description — one per line"
      />
      {showEmbed ? (
        <AdminFormField
          label="3D tour link (optional)"
          name={`${idPrefix}-embed`}
          value={value.embedUrl ?? ""}
          onChange={(embedUrl) => onChange({ ...value, embedUrl })}
          hint="Paste a Matterport share URL if this example should play a tour"
        />
      ) : null}
    </>
  );
}
