"use client";

import { useState, type FormEvent } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import {
  formatPricingLines,
  parseIncludedLines,
  parsePricingLines,
} from "@/features/admin/lib/admin-studio-service-draft";
import { updateAdminSiteCopy } from "@/features/admin/services/admin-api";
import { HOME_HERO_SAVE_BUTTON_CLASS } from "@/features/admin/styles/admin-home-hero-classes";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { SITE_COPY_KEYS, type WebPagesCopy } from "@/server/features/site-copy/site-copy.schema";

type AdminWebPagesCopyFormProps = {
  readonly initial: WebPagesCopy;
  readonly onSaved: () => void;
};

/** Admin editor for Web Pages marketing copy (home teaser + `/web-pages`). */
export function AdminWebPagesCopyForm({ initial, onSaved }: AdminWebPagesCopyFormProps) {
  const [draft, setDraft] = useState(initial);
  const [includedText, setIncludedText] = useState(initial.included.join("\n"));
  const [pricingText, setPricingText] = useState(formatPricingLines(initial.pricing));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAdminSiteCopy({
        key: SITE_COPY_KEYS.webPages,
        value: {
          ...draft,
          included: parseIncludedLines(includedText),
          pricing: parsePricingLines(pricingText),
        },
      });
      onSaved();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`${ADMIN_CARD_CLASS} space-y-4`}>
      <h2 className="text-base font-semibold text-brand-navy">Web Pages</h2>
      <AdminFormField
        label="Eyebrow"
        name="web-pages-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => setDraft((current) => ({ ...current, eyebrow }))}
      />
      <AdminFormField
        label="Title"
        name="web-pages-title"
        value={draft.title}
        onChange={(title) => setDraft((current) => ({ ...current, title }))}
      />
      <AdminFormField
        label="Body"
        name="web-pages-body"
        value={draft.body}
        onChange={(body) => setDraft((current) => ({ ...current, body }))}
        multiline
        rows={5}
      />
      <AdminFormField
        label="CTA label"
        name="web-pages-cta"
        value={draft.ctaLabel}
        onChange={(ctaLabel) => setDraft((current) => ({ ...current, ctaLabel }))}
      />
      <AdminFormField
        label="CTA href"
        name="web-pages-href"
        value={draft.href}
        onChange={(href) => setDraft((current) => ({ ...current, href }))}
      />
      <AdminFormField
        label="Starting price"
        name="web-pages-price"
        value={draft.startingPrice}
        onChange={(startingPrice) => setDraft((current) => ({ ...current, startingPrice }))}
      />
      <AdminFormField
        label="Included list"
        name="web-pages-included"
        value={includedText}
        onChange={setIncludedText}
        multiline
        rows={8}
        hint="One item per line"
      />
      <AdminFormField
        label="Pricing rows"
        name="web-pages-pricing"
        value={pricingText}
        onChange={setPricingText}
        multiline
        rows={6}
        hint="label|price per line"
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={saving} className={HOME_HERO_SAVE_BUTTON_CLASS}>
        {saving ? "Saving…" : "Save Web Pages"}
      </button>
    </form>
  );
}
