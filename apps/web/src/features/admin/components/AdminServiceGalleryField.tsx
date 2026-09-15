"use client";

import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const THUMB_CLASS = "relative aspect-[4/3] overflow-hidden bg-neutral-100";
const DELETE_BUTTON_CLASS =
  "w-full rounded-md border border-red-200 px-2 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50";

type AdminServiceGalleryFieldProps = {
  readonly serviceId: string;
  readonly galleryText: string;
  readonly uploading: boolean;
  readonly onGalleryTextChange: (value: string) => void;
  readonly onUpload: (file: File) => Promise<void>;
};

function removeGalleryUrl(galleryText: string, index: number): string {
  return parseIncludedLines(galleryText)
    .filter((_, current) => current !== index)
    .join("\n");
}

/** Extra example photos for the public View More lightbox. */
export function AdminServiceGalleryField({
  serviceId,
  galleryText,
  uploading,
  onGalleryTextChange,
  onUpload,
}: AdminServiceGalleryFieldProps) {
  const urls = parseIncludedLines(galleryText);
  const lastUrl = urls[urls.length - 1] ?? null;

  return (
    <div className="space-y-3">
      <AdminFormField
        label="Example gallery"
        name={`gallery-${serviceId}`}
        value={galleryText}
        onChange={onGalleryTextChange}
        multiline
        rows={5}
        hint="One image URL per line. Shown when a visitor opens View More."
      />
      {urls.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {urls.map((url, index) => (
            <li key={`${url}-${index}`} className="space-y-2">
              <div className={THUMB_CLASS}>
                <PublicAssetImage
                  src={normalizePublicAssetUrl(url)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <button
                type="button"
                className={DELETE_BUTTON_CLASS}
                onClick={() => onGalleryTextChange(removeGalleryUrl(galleryText, index))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <AdminImageUploader
        label="Add gallery image"
        previewUrl={lastUrl ? normalizePublicAssetUrl(lastUrl) : null}
        uploading={uploading}
        placeholderText="Upload to append a gallery image"
        onUpload={onUpload}
      />
    </div>
  );
}
