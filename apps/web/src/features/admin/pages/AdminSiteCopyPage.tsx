"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { fetchAdminSiteCopy, saveAdminSiteCopy } from "@/features/admin/services/admin-api";
import type { AdminSiteCopyItem } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

export function AdminSiteCopyPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminSiteCopy(), []);
  const [draft, setDraft] = useState<AdminSiteCopyItem[] | null>(null);
  const items = draft ?? data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Site copy"
        description="Key-value marketing copy, including the Google Analytics URL (analytics.url)."
        actions={
          <AdminButton onClick={() => void saveAdminSiteCopy(items)}>Save copy</AdminButton>
        }
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      <ul className="grid gap-3">
        {items.map((item, index) => (
          <li key={item.key} className={ADMIN_CARD_CLASS}>
            <p className="text-xs font-medium text-muted-foreground">{item.key}</p>
            <AdminFormField
              label="Value"
              name={`copy-${item.key}`}
              value={item.value}
              multiline
              onChange={(value) =>
                setDraft((current) =>
                  (current ?? data ?? []).map((entry, entryIndex) =>
                    entryIndex === index ? { ...entry, value } : entry,
                  ),
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}
