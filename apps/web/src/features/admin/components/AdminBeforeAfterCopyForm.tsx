"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { uploadAdminImage } from "@/features/admin/services/admin-api";
import {
  SITE_COPY_KEYS,
  type BeforeAfterCopy,
} from "@/server/features/site-copy/site-copy.schema";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

type AdminBeforeAfterCopyFormProps = {
  readonly initial: BeforeAfterCopy;
  readonly onSaved: () => void;
};

export function AdminBeforeAfterCopyForm({ initial, onSaved }: AdminBeforeAfterCopyFormProps) {
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  return (
    <AdminSiteCopyForm
      title="Before / after"
      copyKey={SITE_COPY_KEYS.beforeAfter}
      initial={initial}
      saveLabel="Save before / after"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="before-after-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="before-after-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Body"
            name="before-after-body"
            value={draft.body}
            onChange={(body) => setDraft({ ...draft, body })}
            multiline
            rows={3}
          />
          {draft.items.map((item, index) => (
            <BeforeAfterItemFields
              key={item.id}
              item={item}
              index={index}
              uploadingKey={uploadingKey}
              onUploadingKeyChange={setUploadingKey}
              onChange={(next) => {
                const items = draft.items.slice();
                items[index] = next;
                setDraft({ ...draft, items });
              }}
            />
          ))}
        </>
      )}
    </AdminSiteCopyForm>
  );
}

function BeforeAfterItemFields({
  item,
  index,
  uploadingKey,
  onUploadingKeyChange,
  onChange,
}: {
  readonly item: BeforeAfterCopy["items"][number];
  readonly index: number;
  readonly uploadingKey: string | null;
  readonly onUploadingKeyChange: (key: string | null) => void;
  readonly onChange: (next: BeforeAfterCopy["items"][number]) => void;
}) {
  const beforeKey = `${item.id}-before`;
  const afterKey = `${item.id}-after`;

  async function uploadSide(side: "beforeSrc" | "afterSrc", key: string, file: File) {
    onUploadingKeyChange(key);
    try {
      const uploaded = await uploadAdminImage(file);
      onChange({ ...item, [side]: uploaded.publicUrl });
    } finally {
      onUploadingKeyChange(null);
    }
  }

  return (
    <div className="space-y-3 border-t border-neutral-200 pt-4">
      <AdminFormField
        label={`Pair ${index + 1} label`}
        name={`before-after-label-${item.id}`}
        value={item.label}
        onChange={(label) => onChange({ ...item, label })}
      />
      <AdminImageUploader
        label="Before image"
        previewUrl={normalizePublicAssetUrl(item.beforeSrc)}
        uploading={uploadingKey === beforeKey}
        onUpload={(file) => uploadSide("beforeSrc", beforeKey, file)}
      />
      <AdminImageUploader
        label="After image"
        previewUrl={normalizePublicAssetUrl(item.afterSrc)}
        uploading={uploadingKey === afterKey}
        onUpload={(file) => uploadSide("afterSrc", afterKey, file)}
      />
    </div>
  );
}
