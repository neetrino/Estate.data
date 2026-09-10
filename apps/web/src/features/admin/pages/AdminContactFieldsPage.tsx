"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  fetchAdminContactFields,
  saveAdminContactFields,
} from "@/features/admin/services/admin-api";
import type { AdminContactField } from "@/features/admin/types/admin-data";
import { CONTACT_FIELD_MODES } from "@/features/contact/content/contactFieldConfig";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

function patchField(
  fields: readonly AdminContactField[],
  index: number,
  patch: Partial<AdminContactField>,
): AdminContactField[] {
  return fields.map((item, itemIndex) =>
    itemIndex === index ? { ...item, ...patch } : item,
  );
}

export function AdminContactFieldsPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminContactFields(), []);
  const [draft, setDraft] = useState<AdminContactField[] | null>(null);
  const [busy, setBusy] = useState(false);
  const fields = draft ?? data ?? [];

  async function handleSave() {
    setBusy(true);
    try {
      const saved = await saveAdminContactFields(fields);
      setDraft(saved);
    } finally {
      setBusy(false);
    }
  }

  function updateField(index: number, patch: Partial<AdminContactField>) {
    setDraft((current) => patchField(current ?? data ?? [], index, patch));
  }

  return (
    <>
      <AdminPageHeader
        title="Contact fields"
        description="Quote form fields on the public site. Set label, placeholder, and required / optional / hidden."
        actions={
          <AdminButton onClick={() => void handleSave()} disabled={busy}>
            Save fields
          </AdminButton>
        }
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      <ul className="grid gap-3">
        {fields.map((field, index) => (
          <li key={field.fieldKey} className={ADMIN_CARD_CLASS}>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {field.fieldKey}
            </p>
            <AdminFormField
              label="Label"
              name={`label-${field.fieldKey}`}
              value={field.label}
              onChange={(value) => updateField(index, { label: value })}
            />
            <AdminFormField
              label="Placeholder"
              name={`placeholder-${field.fieldKey}`}
              value={field.placeholder}
              onChange={(value) => updateField(index, { placeholder: value })}
              hint="Hint text inside the public form field"
            />
            <label className="mt-2 block text-sm font-medium text-brand-navy">
              Mode
              <select
                className="mt-1 w-full rounded-lg border border-foreground/15 px-3 py-2"
                value={field.mode}
                onChange={(event) => updateField(index, { mode: event.target.value })}
              >
                {CONTACT_FIELD_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
