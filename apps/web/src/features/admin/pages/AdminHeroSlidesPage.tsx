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
  createAdminHeroSlide,
  deleteAdminHeroSlide,
  fetchAdminHeroSlides,
  updateAdminHeroSlide,
  uploadAdminHomeHeroImage,
} from "@/features/admin/services/admin-api";
import type { AdminHeroSlide } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const UPLOAD_FAILED_MESSAGE = "Upload failed";

export function AdminHeroSlidesPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminHeroSlides(), []);
  const slides = data ?? [];
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setBusy(true);
    setFormError(null);
    try {
      const uploaded = await uploadAdminHomeHeroImage(file);
      await createAdminHeroSlide({
        imageUrl: uploaded.publicUrl,
        thumbUrl: uploaded.publicUrl,
        alt: file.name,
        sortOrder: slides.length,
        published: true,
      });
      reload();
    } catch (uploadError) {
      setFormError(uploadError instanceof Error ? uploadError.message : UPLOAD_FAILED_MESSAGE);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Hero slides"
        description="Upload, reorder, replace, or remove homepage slider images."
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {formError ? <AdminErrorState message={formError} /> : null}
      <div className={`${ADMIN_CARD_CLASS} mb-4`}>
        <AdminImageUploader
          label="New slide"
          previewUrl={null}
          uploading={busy}
          placeholderText="Upload an image to add a slide"
          onUpload={handleUpload}
        />
      </div>
      <ul className="grid gap-4">
        {slides.map((slide) => (
          <HeroSlideCard key={slide.id} slide={slide} onChanged={reload} />
        ))}
      </ul>
    </>
  );
}

function HeroSlideCard({
  slide,
  onChanged,
}: {
  slide: AdminHeroSlide;
  onChanged: () => void;
}) {
  const [alt, setAlt] = useState(slide.alt);
  const [sortOrder, setSortOrder] = useState(String(slide.sortOrder));
  const [replacing, setReplacing] = useState(false);
  const [replaceError, setReplaceError] = useState<string | null>(null);

  async function handleReplace(file: File) {
    setReplacing(true);
    setReplaceError(null);

    try {
      const uploaded = await uploadAdminHomeHeroImage(file);
      await updateAdminHeroSlide(slide.id, {
        imageUrl: uploaded.publicUrl,
        thumbUrl: uploaded.publicUrl,
      });
      onChanged();
    } catch (uploadError) {
      setReplaceError(uploadError instanceof Error ? uploadError.message : UPLOAD_FAILED_MESSAGE);
    } finally {
      setReplacing(false);
    }
  }

  return (
    <li className={ADMIN_CARD_CLASS}>
      {replaceError ? <AdminErrorState message={replaceError} /> : null}
      <AdminImageUploader
        label="Slide image"
        previewUrl={normalizePublicAssetUrl(slide.imageUrl)}
        uploading={replacing}
        onUpload={handleReplace}
      />
      <AdminFormField label="Alt text" name={`alt-${slide.id}`} value={alt} onChange={setAlt} />
      <AdminFormField
        label="Sort order"
        name={`order-${slide.id}`}
        value={sortOrder}
        onChange={setSortOrder}
      />
      <HeroSlideActions
        slide={slide}
        alt={alt}
        sortOrder={sortOrder}
        disabled={replacing}
        onChanged={onChanged}
      />
    </li>
  );
}

function HeroSlideActions({
  slide,
  alt,
  sortOrder,
  disabled,
  onChanged,
}: {
  slide: AdminHeroSlide;
  alt: string;
  sortOrder: string;
  disabled: boolean;
  onChanged: () => void;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <AdminButton
        disabled={disabled}
        onClick={() =>
          void updateAdminHeroSlide(slide.id, {
            alt,
            sortOrder: Number(sortOrder) || 0,
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
        {slide.published ? "Unpublish" : "Publish"}
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
