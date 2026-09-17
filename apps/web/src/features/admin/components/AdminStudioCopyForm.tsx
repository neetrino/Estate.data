"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { formatPipeTable, parsePipeTable } from "@/features/admin/lib/admin-site-copy-lines";
import { uploadAdminImage } from "@/features/admin/services/admin-api";
import { SITE_COPY_KEYS, type StudioCopy } from "@/server/features/site-copy/site-copy.schema";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const MEMBERS_HINT = "One per line: AV | Adrian Vale | Role | Short bio";

type AdminStudioCopyFormProps = {
  readonly initial: StudioCopy;
  readonly onSaved: () => void;
};

export function AdminStudioCopyForm({ initial, onSaved }: AdminStudioCopyFormProps) {
  const [uploading, setUploading] = useState(false);

  return (
    <AdminSiteCopyForm
      title="Studio / team"
      copyKey={SITE_COPY_KEYS.studio}
      initial={initial}
      saveLabel="Save studio"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="studio-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="studio-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Body"
            name="studio-body"
            value={draft.body}
            onChange={(body) => setDraft({ ...draft, body })}
            multiline
            rows={4}
          />
          <AdminImageUploader
            label="Studio photo"
            previewUrl={normalizePublicAssetUrl(draft.imageUrl)}
            uploading={uploading}
            onUpload={async (file) => {
              setUploading(true);
              try {
                const uploaded = await uploadAdminImage(file);
                setDraft({ ...draft, imageUrl: uploaded.publicUrl });
              } finally {
                setUploading(false);
              }
            }}
          />
          <AdminFormField
            label="Photo alt text"
            name="studio-image-alt"
            value={draft.imageAlt}
            onChange={(imageAlt) => setDraft({ ...draft, imageAlt })}
          />
          <AdminFormField
            label="Team"
            name="studio-members"
            value={formatPipeTable(
              draft.members.map((member) => [
                member.initials,
                member.name,
                member.role,
                member.bio,
              ]),
            )}
            onChange={(text) =>
              setDraft({
                ...draft,
                members: parsePipeTable(text, 4).map(
                  ([initials = "", name = "", role = "", bio = ""]) => ({
                    initials,
                    name,
                    role,
                    bio,
                  }),
                ),
              })
            }
            multiline
            rows={8}
            hint={MEMBERS_HINT}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}
