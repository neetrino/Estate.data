"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { formatPipeTable, parsePipeTable } from "@/features/admin/lib/admin-site-copy-lines";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { SITE_COPY_KEYS, type ScanToBimCopy } from "@/server/features/site-copy/site-copy.schema";

const SCAN_TABS = [
  { id: "labels", label: "Labels", hint: "Headings visitors read in the Scan-to-BIM block." },
  { id: "chain", label: "Chain", hint: "The Real Property → Revit steps across the top." },
  { id: "workflow", label: "Workflow", hint: "Numbered steps in the first column." },
  { id: "lists", label: "Lists", hint: "Deliverables and what the final price depends on." },
] as const satisfies readonly AdminTabItem<"labels" | "chain" | "workflow" | "lists">[];

type AdminScanToBimCopyFormProps = {
  readonly initial: ScanToBimCopy;
  readonly onSaved: () => void;
};

type ScanFieldsProps = {
  readonly draft: ScanToBimCopy;
  readonly onChange: (next: ScanToBimCopy) => void;
};

function ScanLabelFields({ draft, onChange }: ScanFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Photo description"
        name="scan-image-alt"
        value={draft.imageAlt}
        onChange={(imageAlt) => onChange({ ...draft, imageAlt })}
      />
      <AdminFormField
        label="Workflow heading"
        name="scan-workflow-label"
        value={draft.workflowLabel}
        onChange={(workflowLabel) => onChange({ ...draft, workflowLabel })}
      />
      <AdminFormField
        label="Deliverables heading"
        name="scan-deliverables-label"
        value={draft.deliverablesLabel}
        onChange={(deliverablesLabel) => onChange({ ...draft, deliverablesLabel })}
      />
      <AdminFormField
        label="Pricing heading"
        name="scan-pricing-label"
        value={draft.pricingLabel}
        onChange={(pricingLabel) => onChange({ ...draft, pricingLabel })}
      />
      <AdminFormField
        label="Pricing-factors heading"
        name="scan-factors-label"
        value={draft.pricingFactorsLabel}
        onChange={(pricingFactorsLabel) => onChange({ ...draft, pricingFactorsLabel })}
      />
    </>
  );
}

function ScanListFields({ draft, onChange }: ScanFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Deliverables"
        name="scan-deliverables"
        value={draft.deliverables.join("\n")}
        onChange={(text) => onChange({ ...draft, deliverables: parseIncludedLines(text) })}
        multiline
        rows={8}
        hint="One item per line"
      />
      <AdminFormField
        label="What the price depends on"
        name="scan-factors"
        value={draft.pricingFactors.join("\n")}
        onChange={(text) => onChange({ ...draft, pricingFactors: parseIncludedLines(text) })}
        multiline
        rows={8}
        hint="One chip per line"
      />
    </>
  );
}

function ScanToBimTabFields({ draft, onChange }: ScanFieldsProps) {
  const [tab, setTab] = useState<(typeof SCAN_TABS)[number]["id"]>("labels");

  return (
    <>
      <AdminTabs items={SCAN_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "labels")}>
        <ScanLabelFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "chain")}>
        <AdminFormField
          label="Process chain"
          name="scan-chain"
          value={draft.chain.join("\n")}
          onChange={(text) => onChange({ ...draft, chain: parseIncludedLines(text) })}
          multiline
          rows={6}
          hint="One step per line, left to right"
        />
      </div>
      <div className={adminTabHidden(tab === "workflow")}>
        <AdminFormField
          label="Workflow steps"
          name="scan-workflow"
          value={formatPipeTable(draft.workflow.map((entry) => [entry.step, entry.label]))}
          onChange={(text) =>
            onChange({
              ...draft,
              workflow: parsePipeTable(text, 2).map(([step = "", label = ""]) => ({ step, label })),
            })
          }
          multiline
          rows={8}
          hint="One per line: 01 | On-site 3D laser scanning"
        />
      </div>
      <div className={adminTabHidden(tab === "lists")}>
        <ScanListFields draft={draft} onChange={onChange} />
      </div>
    </>
  );
}

export function AdminScanToBimCopyForm({ initial, onSaved }: AdminScanToBimCopyFormProps) {
  return (
    <AdminSiteCopyForm
      title="Scan-to-BIM extras"
      copyKey={SITE_COPY_KEYS.scanToBim}
      initial={initial}
      saveLabel="Save Scan-to-BIM extras"
      onSaved={onSaved}
    >
      {(draft, setDraft) => <ScanToBimTabFields draft={draft} onChange={setDraft} />}
    </AdminSiteCopyForm>
  );
}
