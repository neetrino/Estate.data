"use client";

import { useState, type FormEvent } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import {
  formatLinkLines,
  parseLinkLines,
} from "@/features/admin/lib/admin-studio-service-draft";
import { updateAdminSiteCopy } from "@/features/admin/services/admin-api";
import { HOME_HERO_SAVE_BUTTON_CLASS } from "@/features/admin/styles/admin-home-hero-classes";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import {
  SITE_COPY_KEYS,
  type ContactMarketingCopy,
} from "@/server/features/site-copy/site-copy.schema";

type AdminContactCopyFormProps = {
  readonly initial: ContactMarketingCopy;
  readonly onSaved: () => void;
};

type ContactFieldsProps = {
  readonly draft: ContactMarketingCopy;
  readonly socialText: string;
  readonly onDraftChange: (next: ContactMarketingCopy) => void;
  readonly onSocialTextChange: (value: string) => void;
};

function ContactCopyFields({
  draft,
  socialText,
  onDraftChange,
  onSocialTextChange,
}: ContactFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Eyebrow"
        name="contact-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onDraftChange({ ...draft, eyebrow })}
      />
      <AdminFormField
        label="Title"
        name="contact-title"
        value={draft.title}
        onChange={(title) => onDraftChange({ ...draft, title })}
      />
      <AdminFormField
        label="Body"
        name="contact-body"
        value={draft.body}
        onChange={(body) => onDraftChange({ ...draft, body })}
        multiline
        rows={4}
      />
      <AdminFormField
        label="Phone label"
        name="contact-phone-label"
        value={draft.phoneLabel}
        onChange={(phoneLabel) => onDraftChange({ ...draft, phoneLabel })}
      />
      <AdminFormField
        label="Phone href"
        name="contact-phone-href"
        value={draft.phoneHref}
        onChange={(phoneHref) => onDraftChange({ ...draft, phoneHref })}
      />
      <AdminFormField
        label="Email label"
        name="contact-email-label"
        value={draft.emailLabel}
        onChange={(emailLabel) => onDraftChange({ ...draft, emailLabel })}
      />
      <AdminFormField
        label="Email href"
        name="contact-email-href"
        value={draft.emailHref}
        onChange={(emailHref) => onDraftChange({ ...draft, emailHref })}
      />
      <AdminFormField
        label="Hours"
        name="contact-hours"
        value={draft.hours}
        onChange={(hours) => onDraftChange({ ...draft, hours })}
      />
      <AdminFormField
        label="Service area"
        name="contact-address"
        value={draft.address}
        onChange={(address) => onDraftChange({ ...draft, address })}
      />
      <AdminFormField
        label="Social links"
        name="contact-social"
        value={socialText}
        onChange={onSocialTextChange}
        multiline
        rows={4}
        hint="label | https://url per line"
      />
    </>
  );
}

/** Admin editor for Contact / Request Service heading copy and links. */
export function AdminContactCopyForm({ initial, onSaved }: AdminContactCopyFormProps) {
  const [draft, setDraft] = useState(initial);
  const [socialText, setSocialText] = useState(formatLinkLines(initial.social));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAdminSiteCopy({
        key: SITE_COPY_KEYS.contact,
        value: { ...draft, social: parseLinkLines(socialText) },
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
      <h2 className="text-base font-semibold text-brand-navy">Contact</h2>
      <ContactCopyFields
        draft={draft}
        socialText={socialText}
        onDraftChange={setDraft}
        onSocialTextChange={setSocialText}
      />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={saving} className={HOME_HERO_SAVE_BUTTON_CLASS}>
        {saving ? "Saving…" : "Save Contact"}
      </button>
    </form>
  );
}
