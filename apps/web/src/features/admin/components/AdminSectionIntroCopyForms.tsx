"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminExampleFields } from "@/features/admin/components/AdminExampleFields";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { SITE_COPY_KEYS } from "@/server/features/site-copy/site-copy.schema";
import type {
  FaqIntroCopy,
  FloorPlansCopy,
  PackagesIntroCopy,
  PortfolioIntroCopy,
} from "@/server/features/site-copy/site-copy.schema";

type Saved = { readonly onSaved: () => void };

export function AdminPackagesIntroCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: PackagesIntroCopy }) {
  return (
    <AdminSiteCopyForm
      title="Packages intro"
      copyKey={SITE_COPY_KEYS.packagesIntro}
      initial={initial}
      saveLabel="Save packages intro"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Small label"
            name="packages-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
            hint="Tiny line above the headline"
          />
          <AdminFormField
            label="Title"
            name="packages-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="“Starting at” label"
            name="packages-starting"
            value={draft.startingAt}
            onChange={(startingAt) => setDraft({ ...draft, startingAt })}
          />
          <AdminFormField
            label="“Built for” label"
            name="packages-built-for"
            value={draft.builtForLabel}
            onChange={(builtForLabel) => setDraft({ ...draft, builtForLabel })}
          />
          <AdminFormField
            label="Custom package description"
            name="packages-custom"
            value={draft.customDescription}
            onChange={(customDescription) => setDraft({ ...draft, customDescription })}
            multiline
            rows={3}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}

export function AdminPortfolioIntroCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: PortfolioIntroCopy }) {
  return (
    <AdminSiteCopyForm
      title="Portfolio intro"
      copyKey={SITE_COPY_KEYS.portfolioIntro}
      initial={initial}
      saveLabel="Save portfolio intro"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Small label"
            name="portfolio-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
            hint="Tiny line above the headline"
          />
          <AdminFormField
            label="Title"
            name="portfolio-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Button text"
            name="portfolio-cta"
            value={draft.cta}
            onChange={(cta) => setDraft({ ...draft, cta })}
          />
          <AdminFormField
            label="Name of the filter buttons (screen readers)"
            name="portfolio-filters-aria"
            value={draft.filtersAriaLabel}
            onChange={(filtersAriaLabel) => setDraft({ ...draft, filtersAriaLabel })}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}

export function AdminFaqIntroCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: FaqIntroCopy }) {
  return (
    <AdminSiteCopyForm
      title="FAQ intro"
      copyKey={SITE_COPY_KEYS.faqIntro}
      initial={initial}
      saveLabel="Save FAQ intro"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Small label"
            name="faq-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
            hint="Tiny line above the headline"
          />
          <AdminFormField
            label="Title"
            name="faq-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}

export function AdminFloorPlansCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: FloorPlansCopy }) {
  return (
    <AdminSiteCopyForm
      title="Floor plans"
      copyKey={SITE_COPY_KEYS.floorPlans}
      initial={initial}
      saveLabel="Save floor plans"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <FloorPlansTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}

const FLOOR_PLANS_TABS = [
  { id: "words", label: "Words", hint: "Headline visitors read in the floor-plans block." },
  { id: "included", label: "Included", hint: "What is included in a floor-plan order." },
  { id: "example", label: "Example", hint: "The popup visitors see when they press View Example on floor plans." },
] as const satisfies readonly AdminTabItem<"words" | "included" | "example">[];

type FloorPlansFieldsProps = {
  readonly draft: FloorPlansCopy;
  readonly onChange: (next: FloorPlansCopy) => void;
};

function FloorPlansWordsFields({ draft, onChange }: FloorPlansFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="floor-plans-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Title"
        name="floor-plans-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="floor-plans-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={4}
      />
    </>
  );
}

function FloorPlansTabFields({ draft, onChange }: FloorPlansFieldsProps) {
  const [tab, setTab] = useState<(typeof FLOOR_PLANS_TABS)[number]["id"]>("words");

  return (
    <>
      <AdminTabs items={FLOOR_PLANS_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <FloorPlansWordsFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "included")}>
        <AdminFormField
          label="What’s included"
          name="floor-plans-included"
          value={draft.included.join("\n")}
          onChange={(text) => onChange({ ...draft, included: parseIncludedLines(text) })}
          multiline
          rows={5}
          hint="One item per line"
        />
      </div>
      <div className={adminTabHidden(tab === "example")}>
        <AdminExampleFields
          idPrefix="floor-plans-example"
          value={draft.example}
          onChange={(example) => onChange({ ...draft, example })}
          showEmbed
        />
      </div>
    </>
  );
}
