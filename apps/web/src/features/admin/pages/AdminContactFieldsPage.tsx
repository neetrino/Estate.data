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

  return (
    <>
      <AdminPageHeader
        title="Contact fields"
        description="Choose which fields are required, optional, or hidden on the public form."
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
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{field.fieldKey}</p>
            <AdminFormField
              label="Label"
              name={`label-${field.fieldKey}`}
              value={field.label}
              onChange={(value) =>
                setDraft((current) =>
                  (current ?? data ?? []).map((item, itemIndex) =>
                    itemIndex === index ? { ...item, label: value } : item,
                  ),
                )
              }
            />
            <label className="mt-2 block text-sm font-medium text-brand-navy">
              Mode
              <select
                className="mt-1 w-full rounded-lg border border-foreground/15 px-3 py-2"
                value={field.mode}
                onChange={(event) =>
                  setDraft((current) =>
                    (current ?? data ?? []).map((item, itemIndex) =>
                      itemIndex === index ? { ...item, mode: event.target.value } : item,
                    ),
                  )
                }
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
