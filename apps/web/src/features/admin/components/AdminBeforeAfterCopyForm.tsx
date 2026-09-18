"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
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

function beforeAfterTabs(items: BeforeAfterCopy["items"]): readonly AdminTabItem<string>[] {
  return [
    {
      id: "words",
      label: "Words",
      hint: "Headline visitors read above the photos.",
    },
    ...items.map((item, index) => ({
      id: item.id,
      label: item.label.trim() || `Photo pair ${index + 1}`,
      hint: "Caption and the before and after pictures.",
    })),
  ];
}

function BeforeAfterWordFields({
  draft,
  onChange,
}: {
  readonly draft: BeforeAfterCopy;
  readonly onChange: (next: BeforeAfterCopy) => void;
}) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="before-after-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Title"
        name="before-after-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="before-after-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={3}
      />
    </>
  );
}

function BeforeAfterTabFields({
  draft,
  onChange,
}: {
  readonly draft: BeforeAfterCopy;
  readonly onChange: (next: BeforeAfterCopy) => void;
}) {
  const [tab, setTab] = useState("words");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const tabs = beforeAfterTabs(draft.items);
  const activeTab = tabs.some((item) => item.id === tab) ? tab : "words";

  return (
    <>
      <AdminTabs items={tabs} value={activeTab} onChange={setTab} />
      <div className={adminTabHidden(activeTab === "words")}>
        <BeforeAfterWordFields draft={draft} onChange={onChange} />
      </div>
      {draft.items.map((item, index) => (
        <div key={item.id} className={adminTabHidden(activeTab === item.id)}>
          <BeforeAfterItemFields
            item={item}
            index={index}
            uploadingKey={uploadingKey}
            onUploadingKeyChange={setUploadingKey}
            onChange={(next) => {
              const items = draft.items.slice();
              items[index] = next;
              onChange({ ...draft, items });
            }}
          />
        </div>
      ))}
    </>
  );
}

export function AdminBeforeAfterCopyForm({ initial, onSaved }: AdminBeforeAfterCopyFormProps) {
  return (
    <AdminSiteCopyForm
      title="Before & after"
      copyKey={SITE_COPY_KEYS.beforeAfter}
      initial={initial}
      saveLabel="Save before & after"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <BeforeAfterTabFields draft={draft} onChange={setDraft} />}
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
    <div className="space-y-3">
      <AdminFormField
        label={`Photo pair ${index + 1} caption`}
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
