"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminJumpTargetField } from "@/features/admin/components/ui/AdminJumpTargetField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { SITE_COPY_KEYS, type ServiceAreaCopy, type WhyUsCopy } from "@/server/features/site-copy/site-copy.schema";

type Saved = { readonly onSaved: () => void };

const WHY_US_TABS = [
  { id: "words", label: "Words", hint: "Headline visitors read in the Why us block." },
  { id: "tags", label: "Tags", hint: "Short chips under the headline." },
  { id: "reasons", label: "Reasons", hint: "The longer points in the list." },
] as const satisfies readonly AdminTabItem<"words" | "tags" | "reasons">[];

const SERVICE_AREA_TABS = [
  { id: "words", label: "Words", hint: "Headline visitors read in the service-area block." },
  { id: "cities", label: "Cities", hint: "Places you cover, plus the small note under them." },
  { id: "button", label: "Button", hint: "The button at the end of that block." },
] as const satisfies readonly AdminTabItem<"words" | "cities" | "button">[];

type WhyUsFieldsProps = {
  readonly draft: WhyUsCopy;
  readonly onChange: (next: WhyUsCopy) => void;
};

function WhyUsWordFields({ draft, onChange }: WhyUsFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="why-us-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Title"
        name="why-us-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="why-us-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={4}
      />
    </>
  );
}

function WhyUsTabFields({ draft, onChange }: WhyUsFieldsProps) {
  const [tab, setTab] = useState<(typeof WHY_US_TABS)[number]["id"]>("words");

  return (
    <>
      <AdminTabs items={WHY_US_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <WhyUsWordFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "tags")}>
        <AdminFormField
          label="Tags"
          name="why-us-tags"
          value={draft.tags.join("\n")}
          onChange={(text) => onChange({ ...draft, tags: parseIncludedLines(text) })}
          multiline
          rows={6}
          hint="Short chips under the headline — one per line"
        />
      </div>
      <div className={adminTabHidden(tab === "reasons")}>
        <AdminFormField
          label="Reasons"
          name="why-us-points"
          value={draft.points.join("\n")}
          onChange={(text) => onChange({ ...draft, points: parseIncludedLines(text) })}
          multiline
          rows={6}
          hint="Longer points in the list — one per line"
        />
      </div>
    </>
  );
}

export function AdminWhyUsCopyForm({ initial, onSaved }: Saved & { readonly initial: WhyUsCopy }) {
  return (
    <AdminSiteCopyForm
      title="Why us"
      copyKey={SITE_COPY_KEYS.whyUs}
      initial={initial}
      saveLabel="Save Why us"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <WhyUsTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}

type ServiceAreaFieldsProps = {
  readonly draft: ServiceAreaCopy;
  readonly onChange: (next: ServiceAreaCopy) => void;
};

function ServiceAreaWordFields({ draft, onChange }: ServiceAreaFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="service-area-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Title"
        name="service-area-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="service-area-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={4}
      />
    </>
  );
}

function ServiceAreaTabFields({ draft, onChange }: ServiceAreaFieldsProps) {
  const [tab, setTab] = useState<(typeof SERVICE_AREA_TABS)[number]["id"]>("words");

  return (
    <>
      <AdminTabs items={SERVICE_AREA_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <ServiceAreaWordFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "cities")}>
        <AdminFormField
          label="Cities"
          name="service-area-cities"
          value={draft.cities.join("\n")}
          onChange={(text) => onChange({ ...draft, cities: parseIncludedLines(text) })}
          multiline
          rows={8}
          hint="One city per line, as shown on the homepage"
        />
        <AdminFormField
          label="Small note under the cities"
          name="service-area-note"
          value={draft.note}
          onChange={(note) => onChange({ ...draft, note })}
        />
      </div>
      <div className={adminTabHidden(tab === "button")}>
        <AdminFormField
          label="Button text"
          name="service-area-cta"
          value={draft.cta}
          onChange={(cta) => onChange({ ...draft, cta })}
        />
        <AdminJumpTargetField
          label="Button goes to"
          name="service-area-cta-href"
          value={draft.ctaHref}
          onChange={(ctaHref) => onChange({ ...draft, ctaHref })}
        />
      </div>
    </>
  );
}

export function AdminServiceAreaCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: ServiceAreaCopy }) {
  return (
    <AdminSiteCopyForm
      title="Service area"
      copyKey={SITE_COPY_KEYS.serviceArea}
      initial={initial}
      saveLabel="Save service area"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <ServiceAreaTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}
