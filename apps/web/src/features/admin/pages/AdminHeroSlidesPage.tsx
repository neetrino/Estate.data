"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminHeroSlideCard } from "@/features/admin/components/AdminHeroSlideCard";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import {
  createAdminHeroSlide,
  fetchAdminHeroSlides,
  uploadAdminHomeHeroImage,
} from "@/features/admin/services/admin-api";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import type { AdminHeroSlide } from "@/features/admin/types/admin-data";
import type { HomeHeroCopyMode } from "@/shared/lib/homeHeroCopyMode";

const UPLOAD_FAILED_MESSAGE = "Upload failed";

type AdminHeroSlidesPanelProps = {
  readonly copyMode: HomeHeroCopyMode;
  readonly sharedTitle: string;
  readonly sharedDescription: string;
};

async function createSlideFromFile(file: File): Promise<void> {
  const uploaded = await uploadAdminHomeHeroImage(file);
  await createAdminHeroSlide({
    imageUrl: uploaded.publicUrl,
    thumbUrl: uploaded.publicUrl,
    imageKey: uploaded.objectKey,
    alt: file.name,
    published: true,
  });
}

/** Hero slide images: desktop plus optional mobile, with optional per-slide text. */
export function AdminHeroSlidesPanel({
  copyMode,
  sharedTitle,
  sharedDescription,
}: AdminHeroSlidesPanelProps) {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminHeroSlides(), []);
  const slides = data ?? [];
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const perSlide = copyMode === "perSlide";

  async function handleUpload(file: File) {
    setBusy(true);
    setFormError(null);
    try {
      await createSlideFromFile(file);
      reload();
    } catch (uploadError) {
      setFormError(uploadError instanceof Error ? uploadError.message : UPLOAD_FAILED_MESSAGE);
      throw uploadError;
    } finally {
      setBusy(false);
    }
  }

  return (
    <AdminHeroSlidesPanelView
      loading={loading}
      error={error}
      formError={formError}
      busy={busy}
      perSlide={perSlide}
      slides={slides}
      sharedTitle={sharedTitle}
      sharedDescription={sharedDescription}
      onRetry={reload}
      onUpload={handleUpload}
      onChanged={reload}
    />
  );
}

function AdminHeroSlidesPanelView({
  loading,
  error,
  formError,
  busy,
  perSlide,
  slides,
  sharedTitle,
  sharedDescription,
  onRetry,
  onUpload,
  onChanged,
}: {
  readonly loading: boolean;
  readonly error: string | null;
  readonly formError: string | null;
  readonly busy: boolean;
  readonly perSlide: boolean;
  readonly slides: readonly AdminHeroSlide[];
  readonly sharedTitle: string;
  readonly sharedDescription: string;
  readonly onRetry: () => void;
  readonly onUpload: (file: File) => Promise<void>;
  readonly onChanged: () => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#414141]/70">
        Slides
      </h2>
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={onRetry} /> : null}
      {formError ? <AdminErrorState message={formError} /> : null}
      <p className="text-sm text-muted-foreground">
        {perSlide
          ? "Each slide can have its own text. Leave a field empty to use the default text above."
          : "These images rotate behind the default text above."}{" "}
        Add a mobile image on a slide when it should look different on small screens.
      </p>
      <div className={ADMIN_CARD_CLASS}>
        <AdminImageUploader
          label="Add slides"
          previewUrl={null}
          uploading={busy}
          multiple
          resetPreviewOnSuccess
          reverseFiles
          buttonLabel="Add images"
          hint="Select one or several files. Each file becomes a new desktop slide"
          placeholderText="Upload one or more images to add slides"
          onUpload={onUpload}
        />
      </div>
      <ul className="grid gap-4">
        {slides.map((slide) => (
          <AdminHeroSlideCard
            key={slide.id}
            slide={slide}
            perSlide={perSlide}
            sharedTitle={sharedTitle}
            sharedDescription={sharedDescription}
            onChanged={onChanged}
          />
        ))}
      </ul>
    </div>
  );
}

/** @deprecated Combined into Home Hero — kept for the redirected route. */
export function AdminHeroSlidesPage() {
  return <AdminHeroSlidesPanel copyMode="shared" sharedTitle="" sharedDescription="" />;
}
