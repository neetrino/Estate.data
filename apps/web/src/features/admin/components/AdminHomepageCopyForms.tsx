"use client";

import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { formatPipeTable, parsePipeTable } from "@/features/admin/lib/admin-site-copy-lines";
import { SITE_COPY_KEYS } from "@/server/features/site-copy/site-copy.schema";
import type {
  OfferingsCopy,
  ProcessCopy,
  ServiceAreaCopy,
  StatsCopy,
  WhyUsCopy,
} from "@/server/features/site-copy/site-copy.schema";

type Saved = { readonly onSaved: () => void };

const STATS_HINT = "One per line: 40% | Faster property sales";
const OFFERINGS_HINT = "One per line: 01 | Photography | Short description";
const STEPS_HINT = "One per line: Book | Tell us about the property.";

export function AdminStatsCopyForm({ initial, onSaved }: Saved & { readonly initial: StatsCopy }) {
  return (
    <AdminSiteCopyForm
      title="Stats"
      copyKey={SITE_COPY_KEYS.stats}
      initial={initial}
      saveLabel="Save stats"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <AdminFormField
          label="Stat cards"
          name="stats-items"
          value={formatPipeTable(draft.items.map((item) => [item.value, item.label]))}
          onChange={(text) =>
            setDraft({
              items: parsePipeTable(text, 2).map(([value = "", label = ""]) => ({ value, label })),
            })
          }
          multiline
          rows={6}
          hint={STATS_HINT}
        />
      )}
    </AdminSiteCopyForm>
  );
}

export function AdminOfferingsCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: OfferingsCopy }) {
  return (
    <AdminSiteCopyForm
      title="Offerings"
      copyKey={SITE_COPY_KEYS.offerings}
      initial={initial}
      saveLabel="Save offerings"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="offerings-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="offerings-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Cards"
            name="offerings-items"
            value={formatPipeTable(draft.items.map((item) => [item.id, item.title, item.body]))}
            onChange={(text) =>
              setDraft({
                ...draft,
                items: parsePipeTable(text, 3).map(([id = "", title = "", body = ""]) => ({
                  id,
                  title,
                  body,
                })),
              })
            }
            multiline
            rows={6}
            hint={OFFERINGS_HINT}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}

export function AdminProcessCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: ProcessCopy }) {
  return (
    <AdminSiteCopyForm
      title="Process"
      copyKey={SITE_COPY_KEYS.process}
      initial={initial}
      saveLabel="Save process"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="process-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="process-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Steps"
            name="process-steps"
            value={formatPipeTable(draft.steps.map((step) => [step.title, step.body]))}
            onChange={(text) =>
              setDraft({
                ...draft,
                steps: parsePipeTable(text, 2).map(([title = "", body = ""]) => ({ title, body })),
              })
            }
            multiline
            rows={6}
            hint={STEPS_HINT}
          />
        </>
      )}
    </AdminSiteCopyForm>
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
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="why-us-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="why-us-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Body"
            name="why-us-body"
            value={draft.body}
            onChange={(body) => setDraft({ ...draft, body })}
            multiline
            rows={4}
          />
          <AdminFormField
            label="Tags"
            name="why-us-tags"
            value={draft.tags.join("\n")}
            onChange={(text) => setDraft({ ...draft, tags: parseIncludedLines(text) })}
            multiline
            rows={6}
            hint="One tag per line"
          />
          <AdminFormField
            label="Statements"
            name="why-us-points"
            value={draft.points.join("\n")}
            onChange={(text) => setDraft({ ...draft, points: parseIncludedLines(text) })}
            multiline
            rows={6}
            hint="One statement per line"
          />
        </>
      )}
    </AdminSiteCopyForm>
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
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Eyebrow"
            name="service-area-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="service-area-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Body"
            name="service-area-body"
            value={draft.body}
            onChange={(body) => setDraft({ ...draft, body })}
            multiline
            rows={4}
          />
          <AdminFormField
            label="Cities"
            name="service-area-cities"
            value={draft.cities.join("\n")}
            onChange={(text) => setDraft({ ...draft, cities: parseIncludedLines(text) })}
            multiline
            rows={8}
            hint="One city per line"
          />
          <AdminFormField
            label="Note"
            name="service-area-note"
            value={draft.note}
            onChange={(note) => setDraft({ ...draft, note })}
          />
          <AdminFormField
            label="CTA"
            name="service-area-cta"
            value={draft.cta}
            onChange={(cta) => setDraft({ ...draft, cta })}
          />
          <AdminFormField
            label="CTA href"
            name="service-area-cta-href"
            value={draft.ctaHref}
            onChange={(ctaHref) => setDraft({ ...draft, ctaHref })}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}

