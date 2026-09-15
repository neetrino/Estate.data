"use client";

import { useState, type FormEvent } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { updateAdminSiteCopy } from "@/features/admin/services/admin-api";
import { HOME_HERO_SAVE_BUTTON_CLASS } from "@/features/admin/styles/admin-home-hero-classes";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { SITE_COPY_KEYS, type WhatWeDoCopy } from "@/server/features/site-copy/site-copy.schema";

type AdminWhatWeDoCopyFormProps = {
  readonly initial: WhatWeDoCopy;
  readonly onSaved: () => void;
};

type WhatWeDoFieldsProps = {
  readonly draft: WhatWeDoCopy;
  readonly onChange: (next: WhatWeDoCopy) => void;
};

function WhatWeDoFields({ draft, onChange }: WhatWeDoFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Eyebrow"
        name="what-we-do-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
      />
      <AdminFormField
        label="Title line 1"
        name="what-we-do-title-1"
        value={draft.titleLines[0]}
        onChange={(line) =>
          onChange({
            ...draft,
            titleLines: [line, draft.titleLines[1], draft.titleLines[2]],
          })
        }
      />
      <AdminFormField
        label="Title line 2"
        name="what-we-do-title-2"
        value={draft.titleLines[1]}
        onChange={(line) =>
          onChange({ ...draft, titleLines: [draft.titleLines[0], line, draft.titleLines[2]] })
        }
      />
      <AdminFormField
        label="Title line 3 (accent)"
        name="what-we-do-title-3"
        value={draft.titleLines[2]}
        onChange={(line) =>
          onChange({ ...draft, titleLines: [draft.titleLines[0], draft.titleLines[1], line] })
        }
      />
      <AdminFormField
        label="Body"
        name="what-we-do-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={5}
      />
      <AdminFormField
        label="Primary CTA"
        name="what-we-do-primary"
        value={draft.primaryCta}
        onChange={(primaryCta) => onChange({ ...draft, primaryCta })}
      />
      <AdminFormField
        label="Primary CTA href"
        name="what-we-do-primary-href"
        value={draft.primaryCtaHref}
        onChange={(primaryCtaHref) => onChange({ ...draft, primaryCtaHref })}
      />
      <AdminFormField
        label="Secondary CTA"
        name="what-we-do-secondary"
        value={draft.secondaryCta}
        onChange={(secondaryCta) => onChange({ ...draft, secondaryCta })}
      />
      <AdminFormField
        label="Secondary CTA href"
        name="what-we-do-secondary-href"
        value={draft.secondaryCtaHref}
        onChange={(secondaryCtaHref) => onChange({ ...draft, secondaryCtaHref })}
      />
      <AdminFormField
        label="Reel label"
        name="what-we-do-reel"
        value={draft.reelLabel}
        onChange={(reelLabel) => onChange({ ...draft, reelLabel })}
      />
    </>
  );
}

/** Admin editor for the homepage What We Do block. */
export function AdminWhatWeDoCopyForm({ initial, onSaved }: AdminWhatWeDoCopyFormProps) {
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateAdminSiteCopy({ key: SITE_COPY_KEYS.whatWeDo, value: draft });
      onSaved();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`${ADMIN_CARD_CLASS} space-y-4`}>
      <h2 className="text-base font-semibold text-brand-navy">What We Do</h2>
      <WhatWeDoFields draft={draft} onChange={setDraft} />
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={saving} className={HOME_HERO_SAVE_BUTTON_CLASS}>
        {saving ? "Saving…" : "Save What We Do"}
      </button>
    </form>
  );
}
