"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
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
      setFormError(uploadError instanceof Error ? uploadError.message : "Upload failed");
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
      <label className={`${ADMIN_CARD_CLASS} mb-4 block cursor-pointer`}>
        <span className="text-sm font-medium">Upload image</span>
        <input
          type="file"
          accept="image/*"
          className="mt-2 block w-full text-sm"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              void handleUpload(file);
            }
          }}
        />
      </label>
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

  return (
    <li className={ADMIN_CARD_CLASS}>
      <p className="text-xs text-muted-foreground">{slide.imageUrl}</p>
      <AdminFormField label="Alt text" name={`alt-${slide.id}`} value={alt} onChange={setAlt} />
      <AdminFormField
        label="Sort order"
        name={`order-${slide.id}`}
        value={sortOrder}
        onChange={setSortOrder}
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <AdminButton
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
          onClick={() =>
            void updateAdminHeroSlide(slide.id, { published: !slide.published }).then(onChanged)
          }
        >
          {slide.published ? "Unpublish" : "Publish"}
        </AdminButton>
        <AdminButton variant="danger" onClick={() => void deleteAdminHeroSlide(slide.id).then(onChanged)}>
          Delete
        </AdminButton>
      </div>
    </li>
  );
}
