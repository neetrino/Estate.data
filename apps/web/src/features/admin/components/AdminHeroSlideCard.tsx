"use client";

import { useState } from "react";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import {
  deleteAdminHeroSlide,
  updateAdminHeroSlide,
  uploadAdminHomeHeroImage,
} from "@/features/admin/services/admin-api";
import type { AdminHeroSlide } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const UPLOAD_FAILED_MESSAGE = "Upload failed";
const MOBILE_IMAGE_HINT =
  "Optional. For phones. If empty, the large picture is used.";

type SlideImageKind = "desktop" | "mobile";

type AdminHeroSlideCardProps = {
  readonly slide: AdminHeroSlide;
  readonly perSlide: boolean;
  readonly sharedTitle: string;
  readonly sharedDescription: string;
  readonly onChanged: () => void;
};

async function replaceSlideImage(
  slideId: string,
  file: File,
  kind: SlideImageKind,
): Promise<void> {
  const uploaded = await uploadAdminHomeHeroImage(file);
  if (kind === "desktop") {
    await updateAdminHeroSlide(slideId, {
      imageUrl: uploaded.publicUrl,
      thumbUrl: uploaded.publicUrl,
      imageKey: uploaded.objectKey,
    });
    return;
  }

  await updateAdminHeroSlide(slideId, {
    mobileImageUrl: uploaded.publicUrl,
    mobileImageKey: uploaded.objectKey,
  });
}

export function AdminHeroSlideCard({
  slide,
  perSlide,
  sharedTitle,
  sharedDescription,
  onChanged,
}: AdminHeroSlideCardProps) {
  const [alt, setAlt] = useState(slide.alt);
  const [title, setTitle] = useState(slide.title ?? "");
  const [description, setDescription] = useState(slide.description ?? "");
  const [uploadingKind, setUploadingKind] = useState<SlideImageKind | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const busy = uploadingKind !== null;

  async function handleImage(file: File, kind: SlideImageKind) {
    setUploadingKind(kind);
    setReplaceError(null);
    try {
      await replaceSlideImage(slide.id, file, kind);
      onChanged();
    } catch (uploadError) {
      setReplaceError(uploadError instanceof Error ? uploadError.message : UPLOAD_FAILED_MESSAGE);
    } finally {
      setUploadingKind(null);
    }
  }

  return (
    <li className={ADMIN_CARD_CLASS}>
      {replaceError ? <AdminErrorState message={replaceError} /> : null}
      <HeroSlideImageFields
        slide={slide}
        uploadingKind={uploadingKind}
        onUpload={handleImage}
        onChanged={onChanged}
      />
      <HeroSlideCopyFields
        slideId={slide.id}
        perSlide={perSlide}
        alt={alt}
        title={title}
        description={description}
        onAltChange={setAlt}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onFillDefault={() => {
          setTitle(sharedTitle);
          setDescription(sharedDescription);
        }}
        fillDisabled={busy}
      />
      <HeroSlideActions
        slide={slide}
        alt={alt}
        title={title}
        description={description}
        disabled={busy}
        onChanged={onChanged}
      />
    </li>
  );
}

function HeroSlideImageFields({
  slide,
  uploadingKind,
  onUpload,
  onChanged,
}: {
  readonly slide: AdminHeroSlide;
  readonly uploadingKind: SlideImageKind | null;
  readonly onUpload: (file: File, kind: SlideImageKind) => Promise<void>;
  readonly onChanged: () => void;
}) {
  return (
    <>
      <AdminImageUploader
        label="Desktop image"
        previewUrl={normalizePublicAssetUrl(slide.imageUrl)}
        uploading={uploadingKind === "desktop"}
        onUpload={(file) => onUpload(file, "desktop")}
      />
      <div className="mt-4">
        <AdminImageUploader
          label="Mobile image"
          hint={MOBILE_IMAGE_HINT}
          previewUrl={
            slide.mobileImageUrl ? normalizePublicAssetUrl(slide.mobileImageUrl) : null
          }
          uploading={uploadingKind === "mobile"}
          showClear={Boolean(slide.mobileImageUrl)}
          clearLabel="Remove mobile image"
          placeholderText="No phone picture — the large picture will be used"
          onUpload={(file) => onUpload(file, "mobile")}
          onClear={() => {
            void updateAdminHeroSlide(slide.id, {
              mobileImageUrl: null,
              mobileImageKey: null,
            }).then(onChanged);
          }}
        />
      </div>
    </>
  );
}

function HeroSlideCopyFields({
  slideId,
  perSlide,
  alt,
  title,
  description,
  onAltChange,
  onTitleChange,
  onDescriptionChange,
  onFillDefault,
  fillDisabled,
}: {
  readonly slideId: string;
  readonly perSlide: boolean;
  readonly alt: string;
  readonly title: string;
  readonly description: string;
  readonly onAltChange: (value: string) => void;
  readonly onTitleChange: (value: string) => void;
  readonly onDescriptionChange: (value: string) => void;
  readonly onFillDefault: () => void;
  readonly fillDisabled: boolean;
}) {
  return (
    <div className="mt-4 space-y-4">
      {perSlide ? (
        <>
          <AdminFormField
            label="Title for this slide"
            name={`title-${slideId}`}
            value={title}
            onChange={onTitleChange}
            multiline
            rows={3}
            hint="Leave empty to use the default title"
          />
          <AdminFormField
            label="Description for this slide"
            name={`description-${slideId}`}
            value={description}
            onChange={onDescriptionChange}
            multiline
            rows={3}
            hint="Leave empty to use the default description"
          />
          <AdminButton variant="secondary" disabled={fillDisabled} onClick={onFillDefault}>
            Fill from default text
          </AdminButton>
        </>
      ) : null}
      <AdminFormField
        label="Short description of the picture"
        name={`alt-${slideId}`}
        value={alt}
        onChange={onAltChange}
        hint="For people who cannot see the image"
      />
    </div>
  );
}

function HeroSlideActions({
  slide,
  alt,
  title,
  description,
  disabled,
  onChanged,
}: {
  readonly slide: AdminHeroSlide;
  readonly alt: string;
  readonly title: string;
  readonly description: string;
  readonly disabled: boolean;
  readonly onChanged: () => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <AdminButton
        disabled={disabled}
        onClick={() =>
          void updateAdminHeroSlide(slide.id, {
            alt,
            title: title.trim() ? title : null,
            description: description.trim() ? description : null,
          }).then(onChanged)
        }
      >
        Save
      </AdminButton>
      <AdminButton
        variant="secondary"
        disabled={disabled}
        onClick={() =>
          void updateAdminHeroSlide(slide.id, { published: !slide.published }).then(onChanged)
        }
      >
        {slide.published ? "Hide on website" : "Show on website"}
      </AdminButton>
      <AdminButton
        variant="danger"
        disabled={disabled}
        onClick={() => void deleteAdminHeroSlide(slide.id).then(onChanged)}
      >
        Delete
      </AdminButton>
    </div>
  );
}
