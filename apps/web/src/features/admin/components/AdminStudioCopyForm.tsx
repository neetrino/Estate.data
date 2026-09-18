"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { formatPipeTable, parsePipeTable } from "@/features/admin/lib/admin-site-copy-lines";
import { uploadAdminImage } from "@/features/admin/services/admin-api";
import { SITE_COPY_KEYS, type StudioCopy } from "@/server/features/site-copy/site-copy.schema";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const MEMBERS_HINT = "One per line: AV | Adrian Vale | Role | Short bio";

const STUDIO_TABS = [
  { id: "words", label: "Words", hint: "The studio story visitors read." },
  { id: "photo", label: "Photo", hint: "The studio picture next to that story." },
  { id: "team", label: "Team", hint: "People listed in the team block." },
] as const satisfies readonly AdminTabItem<"words" | "photo" | "team">[];

type AdminStudioCopyFormProps = {
  readonly initial: StudioCopy;
  readonly onSaved: () => void;
};

type StudioFieldsProps = {
  readonly draft: StudioCopy;
  readonly onChange: (next: StudioCopy) => void;
};

function StudioWordFields({ draft, onChange }: StudioFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="studio-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Title"
        name="studio-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="studio-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={4}
      />
    </>
  );
}

function StudioPhotoFields({ draft, onChange }: StudioFieldsProps) {
  const [uploading, setUploading] = useState(false);

  return (
    <>
      <AdminImageUploader
        label="Studio photo"
        previewUrl={normalizePublicAssetUrl(draft.imageUrl)}
        uploading={uploading}
        onUpload={async (file) => {
          setUploading(true);
          try {
            const uploaded = await uploadAdminImage(file);
            onChange({ ...draft, imageUrl: uploaded.publicUrl });
          } finally {
            setUploading(false);
          }
        }}
      />
      <AdminFormField
        label="Short description of the photo"
        name="studio-image-alt"
        value={draft.imageAlt}
        onChange={(imageAlt) => onChange({ ...draft, imageAlt })}
      />
    </>
  );
}

function StudioTeamFields({ draft, onChange }: StudioFieldsProps) {
  return (
    <AdminFormField
      label="Team members"
      name="studio-members"
      value={formatPipeTable(
        draft.members.map((member) => [member.initials, member.name, member.role, member.bio]),
      )}
      onChange={(text) =>
        onChange({
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
  );
}

function StudioTabFields({ draft, onChange }: StudioFieldsProps) {
  const [tab, setTab] = useState<(typeof STUDIO_TABS)[number]["id"]>("words");

  return (
    <>
      <AdminTabs items={STUDIO_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <StudioWordFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "photo")}>
        <StudioPhotoFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "team")}>
        <StudioTeamFields draft={draft} onChange={onChange} />
      </div>
    </>
  );
}

export function AdminStudioCopyForm({ initial, onSaved }: AdminStudioCopyFormProps) {
  return (
    <AdminSiteCopyForm
      title="Studio & team"
      copyKey={SITE_COPY_KEYS.studio}
      initial={initial}
      saveLabel="Save studio"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <StudioTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}
