"use client";

import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import {
  SITE_COPY_KEYS,
  type ServicesIntroCopy,
} from "@/server/features/site-copy/site-copy.schema";

type AdminServicesIntroCopyFormProps = {
  readonly initial: ServicesIntroCopy;
  readonly onSaved: () => void;
};

export function AdminServicesIntroCopyForm({
  initial,
  onSaved,
}: AdminServicesIntroCopyFormProps) {
  return (
    <AdminSiteCopyForm
      title="Services heading"
      copyKey={SITE_COPY_KEYS.servicesIntro}
      initial={initial}
      saveLabel="Save services heading"
      onSaved={onSaved}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Small label"
            name="services-intro-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="services-intro-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}
