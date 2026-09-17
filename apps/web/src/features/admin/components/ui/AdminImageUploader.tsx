"use client";

import { useEffect, useRef, useState } from "react";
import {
  HOME_HERO_CLEAR_BUTTON_CLASS,
  HOME_HERO_FIELD_ERROR_CLASS,
  HOME_HERO_HINT_CLASS,
  HOME_HERO_IMAGE_ACTIONS_CLASS,
  HOME_HERO_IMAGE_PLACEHOLDER_CLASS,
  HOME_HERO_IMAGE_PREVIEW_CLASS,
  HOME_HERO_IMAGE_PREVIEW_IMG_CLASS,
  HOME_HERO_IMAGE_ROW_CLASS,
  HOME_HERO_LABEL_CLASS,
  HOME_HERO_UPLOAD_BUTTON_CLASS,
  HOME_HERO_UPLOAD_SPINNER_CLASS,
} from "@/features/admin/styles/admin-home-hero-classes";
import {
  ADMIN_IMAGE_ACCEPT,
  ADMIN_IMAGE_UPLOAD_HINT,
  validateAdminImageFile,
} from "@/shared/lib/adminImageUpload";

type AdminImageUploaderProps = {
  readonly label: string;
  readonly previewUrl: string | null;
  readonly uploading: boolean;
  readonly hint?: string;
  readonly error?: string | null;
  readonly required?: boolean;
  readonly placeholderText?: string;
  readonly showClear?: boolean;
  readonly multiple?: boolean;
  readonly resetPreviewOnSuccess?: boolean;
  readonly reverseFiles?: boolean;
  readonly buttonLabel?: string;
  readonly onUpload: (file: File) => Promise<void>;
  readonly onClear?: () => void;
};

function revokeIfBlob(url: string | null): void {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}

/** Shared admin image field — preview plus file picker, no manual URL entry. */
export function AdminImageUploader({
  label,
  previewUrl,
  uploading,
  hint,
  error,
  required = false,
  placeholderText = "No image uploaded",
  showClear = false,
  multiple = false,
  resetPreviewOnSuccess = false,
  reverseFiles = false,
  buttonLabel = "Upload image",
  onUpload,
  onClear,
}: AdminImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(null);
  const displayError = error ?? localError;
  const displayUrl = localPreviewUrl ?? previewUrl;

  useEffect(() => {
    return () => revokeIfBlob(localPreviewUrl);
  }, [localPreviewUrl]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (files.length === 0) {
      return;
    }

    const firstInvalid = files
      .map((file) => validateAdminImageFile(file))
      .find((message) => message !== null);
    if (firstInvalid) {
      setLocalError(firstInvalid);
      return;
    }

    setLocalError(null);
    const previewFile = files[files.length - 1];
    if (previewFile) {
      const blobUrl = URL.createObjectURL(previewFile);
      setLocalPreviewUrl((current) => {
        revokeIfBlob(current);
        return blobUrl;
      });
    }

    try {
      const queue = reverseFiles ? files.slice().reverse() : files;
      for (const file of queue) {
        await onUpload(file);
      }
    } catch {
      return;
    }

    if (!resetPreviewOnSuccess) {
      return;
    }

    setLocalPreviewUrl((current) => {
      revokeIfBlob(current);
      return null;
    });
  }

  return (
    <div className={HOME_HERO_IMAGE_ROW_CLASS}>
      <div className="min-w-0 flex-1">
        <label className={HOME_HERO_LABEL_CLASS}>
          {label}
          {required ? " (required)" : ""}
        </label>
        <p className={HOME_HERO_HINT_CLASS}>
          {hint ? `${hint} · ${ADMIN_IMAGE_UPLOAD_HINT}` : ADMIN_IMAGE_UPLOAD_HINT}
        </p>
        <div className={HOME_HERO_IMAGE_PREVIEW_CLASS}>
          {displayUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview for blob + R2 URLs
            <img
              src={displayUrl}
              alt=""
              referrerPolicy="no-referrer"
              className={HOME_HERO_IMAGE_PREVIEW_IMG_CLASS}
            />
          ) : (
            <div className={HOME_HERO_IMAGE_PLACEHOLDER_CLASS}>{placeholderText}</div>
          )}
        </div>
        {displayError ? <p className={HOME_HERO_FIELD_ERROR_CLASS}>{displayError}</p> : null}
      </div>

      <div className={HOME_HERO_IMAGE_ACTIONS_CLASS}>
        <input
          ref={inputRef}
          type="file"
          accept={ADMIN_IMAGE_ACCEPT}
          multiple={multiple}
          className="hidden"
          onChange={(event) => void handleFileChange(event)}
        />
        <button
          type="button"
          className={HOME_HERO_UPLOAD_BUTTON_CLASS}
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <>
              <span className={HOME_HERO_UPLOAD_SPINNER_CLASS} aria-hidden />
              Uploading…
            </>
          ) : (
            buttonLabel
          )}
        </button>
        {showClear && displayUrl && onClear ? (
          <button
            type="button"
            className={HOME_HERO_CLEAR_BUTTON_CLASS}
            disabled={uploading}
            onClick={() => {
              setLocalPreviewUrl((current) => {
                revokeIfBlob(current);
                return null;
              });
              onClear();
            }}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
