"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { formatPipeTable, parsePipeTable } from "@/features/admin/lib/admin-site-copy-lines";
import { SITE_COPY_KEYS } from "@/server/features/site-copy/site-copy.schema";
import type {
  OfferingsCopy,
  ProcessCopy,
  StatsCopy,
} from "@/server/features/site-copy/site-copy.schema";

type Saved = { readonly onSaved: () => void };

const STATS_HINT = "One per line: 40% | Faster property sales";
const OFFERINGS_HINT = "One per line: 01 | Photography | Short description";
const STEPS_HINT = "One per line: Book | Tell us about the property.";

const OFFERINGS_TABS = [
  { id: "words", label: "Words", hint: "Headline above the numbered service cards." },
  { id: "cards", label: "Cards", hint: "The numbered cards: photography, video, and the rest." },
] as const satisfies readonly AdminTabItem<"words" | "cards">[];

const PROCESS_TABS = [
  { id: "words", label: "Words", hint: "Headline above the steps." },
  { id: "steps", label: "Steps", hint: "Book, Capture, Create, and the other steps visitors see." },
] as const satisfies readonly AdminTabItem<"words" | "steps">[];

export function AdminStatsCopyForm({ initial, onSaved }: Saved & { readonly initial: StatsCopy }) {
  return (
    <AdminSiteCopyForm
      title="Numbers"
      copyKey={SITE_COPY_KEYS.stats}
      initial={initial}
      saveLabel="Save numbers"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <AdminFormField
          label="Number cards"
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

function OfferingsTabFields({
  draft,
  onChange,
}: {
  readonly draft: OfferingsCopy;
  readonly onChange: (next: OfferingsCopy) => void;
}) {
  const [tab, setTab] = useState<(typeof OFFERINGS_TABS)[number]["id"]>("words");

  return (
    <>
      <AdminTabs items={OFFERINGS_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <AdminFormField
          label="Small label"
          name="offerings-eyebrow"
          value={draft.eyebrow}
          onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
          hint="Tiny line above the headline"
        />
        <AdminFormField
          label="Title"
          name="offerings-title"
          value={draft.title}
          onChange={(title) => onChange({ ...draft, title })}
        />
      </div>
      <div className={adminTabHidden(tab === "cards")}>
        <AdminFormField
          label="Service cards"
          name="offerings-items"
          value={formatPipeTable(draft.items.map((item) => [item.id, item.title, item.body]))}
          onChange={(text) =>
            onChange({
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
      </div>
    </>
  );
}

export function AdminOfferingsCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: OfferingsCopy }) {
  return (
    <AdminSiteCopyForm
      title="What we offer"
      copyKey={SITE_COPY_KEYS.offerings}
      initial={initial}
      saveLabel="Save offerings"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <OfferingsTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}

function ProcessTabFields({
  draft,
  onChange,
}: {
  readonly draft: ProcessCopy;
  readonly onChange: (next: ProcessCopy) => void;
}) {
  const [tab, setTab] = useState<(typeof PROCESS_TABS)[number]["id"]>("words");

  return (
    <>
      <AdminTabs items={PROCESS_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "words")}>
        <AdminFormField
          label="Small label"
          name="process-eyebrow"
          value={draft.eyebrow}
          onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
          hint="Tiny line above the headline"
        />
        <AdminFormField
          label="Title"
          name="process-title"
          value={draft.title}
          onChange={(title) => onChange({ ...draft, title })}
        />
      </div>
      <div className={adminTabHidden(tab === "steps")}>
        <AdminFormField
          label="Steps visitors see"
          name="process-steps"
          value={formatPipeTable(draft.steps.map((step) => [step.title, step.body]))}
          onChange={(text) =>
            onChange({
              ...draft,
              steps: parsePipeTable(text, 2).map(([title = "", body = ""]) => ({ title, body })),
            })
          }
          multiline
          rows={6}
          hint={STEPS_HINT}
        />
      </div>
    </>
  );
}

export function AdminProcessCopyForm({
  initial,
  onSaved,
}: Saved & { readonly initial: ProcessCopy }) {
  return (
    <AdminSiteCopyForm
      title="How we work"
      copyKey={SITE_COPY_KEYS.process}
      initial={initial}
      saveLabel="Save process"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <ProcessTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}
