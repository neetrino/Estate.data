"use client";

import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
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
      title="Packages headings"
      copyKey={SITE_COPY_KEYS.packagesIntro}
      initial={initial}
      saveLabel="Save packages headings"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="packages-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="packages-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Starting at"
            name="packages-starting"
            value={draft.startingAt}
            onChange={(startingAt) => setDraft({ ...draft, startingAt })}
          />
          <AdminFormField
            label="Built for"
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
      title="Portfolio headings"
      copyKey={SITE_COPY_KEYS.portfolioIntro}
      initial={initial}
      saveLabel="Save portfolio headings"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="portfolio-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="portfolio-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="CTA"
            name="portfolio-cta"
            value={draft.cta}
            onChange={(cta) => setDraft({ ...draft, cta })}
          />
          <AdminFormField
            label="Filters aria label"
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
      title="FAQ headings"
      copyKey={SITE_COPY_KEYS.faqIntro}
      initial={initial}
      saveLabel="Save FAQ headings"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="faq-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
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
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="floor-plans-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="floor-plans-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Body"
            name="floor-plans-body"
            value={draft.body}
            onChange={(body) => setDraft({ ...draft, body })}
            multiline
            rows={4}
          />
          <AdminFormField
            label="Included"
            name="floor-plans-included"
            value={draft.included.join("\n")}
            onChange={(text) => setDraft({ ...draft, included: parseIncludedLines(text) })}
            multiline
            rows={5}
            hint="One item per line"
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}
