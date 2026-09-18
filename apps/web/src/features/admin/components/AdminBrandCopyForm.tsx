"use client";

import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { SITE_COPY_KEYS, type BrandCopy } from "@/server/features/site-copy/site-copy.schema";

type AdminBrandCopyFormProps = {
  readonly initial: BrandCopy;
  readonly onSaved: () => void;
};

export function AdminBrandCopyForm({ initial, onSaved }: AdminBrandCopyFormProps) {
  return (
    <AdminSiteCopyForm
      title="Site name"
      copyKey={SITE_COPY_KEYS.brand}
      initial={initial}
      saveLabel="Save site name"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Name next to the logo"
            name="brand-name"
            value={draft.name}
            onChange={(name) => setDraft({ ...draft, name })}
          />
          <AdminFormField
            label="Short line under the name"
            name="brand-kicker"
            value={draft.kicker}
            onChange={(kicker) => setDraft({ ...draft, kicker })}
            hint="Shown under the name at the top of the homepage"
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}
