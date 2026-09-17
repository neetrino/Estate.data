"use client";

import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import {
  ADMIN_VIDEO_ACCEPT,
  ADMIN_VIDEO_UPLOAD_HINT,
  validateAdminVideoFile,
} from "@/shared/lib/adminVideoUpload";

type AdminVideoUploaderProps = {
  readonly label: string;
  readonly previewUrl: string | null;
  readonly posterUrl?: string | null;
  readonly uploading: boolean;
  readonly error?: string | null;
  readonly onUpload: (file: File) => Promise<void>;
};

/** Shared admin video field — preview plus file picker, no manual URL entry. */
export function AdminVideoUploader({
  label,
  previewUrl,
  posterUrl,
  uploading,
  error,
  onUpload,
}: AdminVideoUploaderProps) {
  return (
    <AdminImageUploader
      label={label}
      previewUrl={previewUrl}
      posterUrl={posterUrl}
      uploading={uploading}
      error={error}
      accept={ADMIN_VIDEO_ACCEPT}
      fileHint={ADMIN_VIDEO_UPLOAD_HINT}
      previewKind="video"
      validateFile={validateAdminVideoFile}
      placeholderText="No video uploaded"
      buttonLabel="Upload video"
      onUpload={onUpload}
    />
  );
}
