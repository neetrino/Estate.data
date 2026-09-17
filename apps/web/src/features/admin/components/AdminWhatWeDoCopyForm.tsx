"use client";

import { useState } from "react";
import { AdminCopySection } from "@/features/admin/components/ui/AdminCopySection";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminJumpTargetField } from "@/features/admin/components/ui/AdminJumpTargetField";
import { AdminVideoUploader } from "@/features/admin/components/ui/AdminVideoUploader";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { uploadAdminImage } from "@/features/admin/services/admin-api";
import { SITE_COPY_KEYS, type WhatWeDoCopy } from "@/server/features/site-copy/site-copy.schema";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

type AdminWhatWeDoCopyFormProps = {
  readonly initial: WhatWeDoCopy;
  readonly onSaved: () => void;
};

type WhatWeDoFieldsProps = {
  readonly draft: WhatWeDoCopy;
  readonly onChange: (next: WhatWeDoCopy) => void;
};

function WhatWeDoTitleFields({ draft, onChange }: WhatWeDoFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="what-we-do-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Headline — line 1"
        name="what-we-do-title-1"
        value={draft.titleLines[0]}
        onChange={(line) =>
          onChange({ ...draft, titleLines: [line, draft.titleLines[1], draft.titleLines[2]] })
        }
      />
      <AdminFormField
        label="Headline — line 2"
        name="what-we-do-title-2"
        value={draft.titleLines[1]}
        onChange={(line) =>
          onChange({ ...draft, titleLines: [draft.titleLines[0], line, draft.titleLines[2]] })
        }
      />
      <AdminFormField
        label="Headline — highlighted line"
        name="what-we-do-title-3"
        value={draft.titleLines[2]}
        onChange={(line) =>
          onChange({ ...draft, titleLines: [draft.titleLines[0], draft.titleLines[1], line] })
        }
        hint="Shown in the accent color"
      />
      <AdminFormField
        label="Description"
        name="what-we-do-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={5}
      />
    </>
  );
}

function WhatWeDoButtonFields({ draft, onChange }: WhatWeDoFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AdminFormField
        label="Main button"
        name="what-we-do-primary"
        value={draft.primaryCta}
        onChange={(primaryCta) => onChange({ ...draft, primaryCta })}
      />
      <AdminJumpTargetField
        label="Main button goes to"
        name="what-we-do-primary-href"
        value={draft.primaryCtaHref}
        onChange={(primaryCtaHref) => onChange({ ...draft, primaryCtaHref })}
      />
      <AdminFormField
        label="Second button"
        name="what-we-do-secondary"
        value={draft.secondaryCta}
        onChange={(secondaryCta) => onChange({ ...draft, secondaryCta })}
      />
      <AdminJumpTargetField
        label="Second button goes to"
        name="what-we-do-secondary-href"
        value={draft.secondaryCtaHref}
        onChange={(secondaryCtaHref) => onChange({ ...draft, secondaryCtaHref })}
      />
    </div>
  );
}

type WhatWeDoReelUploadsProps = {
  readonly reelUrl: string;
  readonly reelPosterUrl: string;
  readonly onReelUrl: (reelUrl: string) => void;
  readonly onPosterUrl: (reelPosterUrl: string) => void;
};

function WhatWeDoReelUploads({
  reelUrl,
  reelPosterUrl,
  onReelUrl,
  onPosterUrl,
}: WhatWeDoReelUploadsProps) {
  const [uploadingKey, setUploadingKey] = useState<"reel" | "poster" | null>(null);

  async function uploadField(key: "reel" | "poster", file: File): Promise<void> {
    setUploadingKey(key);
    try {
      const uploaded = await uploadAdminImage(file);
      if (key === "reel") {
        onReelUrl(uploaded.publicUrl);
        return;
      }
      onPosterUrl(uploaded.publicUrl);
    } finally {
      setUploadingKey(null);
    }
  }

  return (
    <>
      <AdminVideoUploader
        label="Video"
        previewUrl={normalizePublicAssetUrl(reelUrl)}
        posterUrl={normalizePublicAssetUrl(reelPosterUrl)}
        uploading={uploadingKey === "reel"}
        onUpload={(file) => uploadField("reel", file)}
      />
      <AdminImageUploader
        label="Cover image"
        previewUrl={normalizePublicAssetUrl(reelPosterUrl)}
        uploading={uploadingKey === "poster"}
        onUpload={(file) => uploadField("poster", file)}
      />
    </>
  );
}

/** Admin editor for the homepage What We Do block. */
export function AdminWhatWeDoCopyForm({ initial, onSaved }: AdminWhatWeDoCopyFormProps) {
  return (
    <AdminSiteCopyForm
      description="The homepage intro: headline on the left, reel on the right."
      copyKey={SITE_COPY_KEYS.whatWeDo}
      initial={initial}
      saveLabel="Save this section"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminCopySection title="Text" description="What visitors read next to the video.">
            <WhatWeDoTitleFields draft={draft} onChange={setDraft} />
          </AdminCopySection>
          <AdminCopySection title="Buttons" description="Button label, then where it should go.">
            <WhatWeDoButtonFields draft={draft} onChange={setDraft} />
          </AdminCopySection>
          <AdminCopySection
            title="Reel"
            description="Upload the video and a still image. No links to type."
          >
            <AdminFormField
              label="Badge on the video"
              name="what-we-do-reel"
              value={draft.reelLabel}
              onChange={(reelLabel) => setDraft({ ...draft, reelLabel })}
            />
            <WhatWeDoReelUploads
              reelUrl={draft.reelUrl}
              reelPosterUrl={draft.reelPosterUrl}
              onReelUrl={(reelUrl) => setDraft({ ...draft, reelUrl })}
              onPosterUrl={(reelPosterUrl) => setDraft({ ...draft, reelPosterUrl })}
            />
          </AdminCopySection>
        </>
      )}
    </AdminSiteCopyForm>
  );
}
