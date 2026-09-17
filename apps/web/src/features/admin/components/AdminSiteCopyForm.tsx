"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { updateAdminSiteCopy } from "@/features/admin/services/admin-api";
import { HOME_HERO_SAVE_BUTTON_CLASS } from "@/features/admin/styles/admin-home-hero-classes";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import type { SiteCopyKey } from "@/server/features/site-copy/site-copy.schema";

type AdminSiteCopyFormProps<T> = {
  readonly title: string;
  readonly copyKey: SiteCopyKey;
  readonly initial: T;
  readonly saveLabel: string;
  readonly onSaved: () => void;
  readonly children: (draft: T, setDraft: (next: T) => void) => ReactNode;
};

/** Shared save shell for one SiteCopy key. */
export function AdminSiteCopyForm<T>({
  title,
  copyKey,
  initial,
  saveLabel,
  onSaved,
  children,
}: AdminSiteCopyFormProps<T>) {
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAdminSiteCopy({ key: copyKey, value: draft });
      onSaved();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`${ADMIN_CARD_CLASS} space-y-4`}>
      <h2 className="text-base font-semibold text-brand-navy">{title}</h2>
      {children(draft, setDraft)}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={saving} className={HOME_HERO_SAVE_BUTTON_CLASS}>
        {saving ? "Saving…" : saveLabel}
      </button>
    </form>
  );
}
