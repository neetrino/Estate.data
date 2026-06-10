"use client";

import { useRef } from "react";
import {
  HOME_HERO_CLEAR_BUTTON_CLASS,
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

type HomeHeroImageUploaderProps = {
  readonly label: string;
  readonly previewUrl: string | null;
  readonly uploading: boolean;
  readonly hint?: string;
  readonly placeholderText?: string;
  readonly showClear?: boolean;
  readonly onUpload: (file: File) => Promise<void>;
  readonly onClear?: () => void;
};

export function HomeHeroImageUploader({
  label,
  previewUrl,
  uploading,
  hint,
  placeholderText = "No image uploaded",
  showClear = false,
  onUpload,
  onClear,
}: HomeHeroImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    await onUpload(file);
  }

  return (
    <div className={HOME_HERO_IMAGE_ROW_CLASS}>
      <div className="min-w-0 flex-1">
        <label className={HOME_HERO_LABEL_CLASS}>{label}</label>
        {hint ? <p className={HOME_HERO_HINT_CLASS}>{hint}</p> : null}
        <div className={HOME_HERO_IMAGE_PREVIEW_CLASS}>
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- admin preview for arbitrary uploaded URLs
            <img src={previewUrl} alt="" className={HOME_HERO_IMAGE_PREVIEW_IMG_CLASS} />
          ) : (
            <div className={HOME_HERO_IMAGE_PLACEHOLDER_CLASS}>{placeholderText}</div>
          )}
        </div>
      </div>

      <div className={HOME_HERO_IMAGE_ACTIONS_CLASS}>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
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
            "Upload image"
          )}
        </button>
        {showClear && previewUrl && onClear ? (
          <button type="button" className={HOME_HERO_CLEAR_BUTTON_CLASS} disabled={uploading} onClick={onClear}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
