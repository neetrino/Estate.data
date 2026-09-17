"use client";

import { AdminCopySection } from "@/features/admin/components/ui/AdminCopySection";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminPairListField } from "@/features/admin/components/ui/AdminPairListField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { toMailtoHref, toTelHref } from "@/features/admin/lib/admin-contact-href";
import {
  SITE_COPY_KEYS,
  type ContactMarketingCopy,
} from "@/server/features/site-copy/site-copy.schema";

type AdminContactCopyFormProps = {
  readonly initial: ContactMarketingCopy;
  readonly onSaved: () => void;
};

type ContactFieldsProps = {
  readonly draft: ContactMarketingCopy;
  readonly onChange: (next: ContactMarketingCopy) => void;
};

function ContactHeadingFields({ draft, onChange }: ContactFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="contact-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Headline"
        name="contact-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="contact-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={4}
      />
    </>
  );
}

function ContactDetailsFields({ draft, onChange }: ContactFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Phone"
        name="contact-phone"
        value={draft.phoneLabel}
        onChange={(phoneLabel) =>
          onChange({ ...draft, phoneLabel, phoneHref: toTelHref(phoneLabel) })
        }
        hint="Shown on the site. The call link is created automatically."
      />
      <AdminFormField
        label="Email"
        name="contact-email"
        value={draft.emailLabel}
        onChange={(emailLabel) =>
          onChange({ ...draft, emailLabel, emailHref: toMailtoHref(emailLabel) })
        }
        hint="Shown on the site. The mail link is created automatically."
      />
      <AdminFormField
        label="Hours"
        name="contact-hours"
        value={draft.hours}
        onChange={(hours) => onChange({ ...draft, hours })}
      />
      <AdminFormField
        label="Service area"
        name="contact-address"
        value={draft.address}
        onChange={(address) => onChange({ ...draft, address })}
      />
    </>
  );
}

function filterSocial(draft: ContactMarketingCopy): ContactMarketingCopy {
  return {
    ...draft,
    social: draft.social.filter((item) => item.label.trim().length > 0 && item.href.trim().length > 0),
  };
}

/** Admin editor for Contact / Request Service heading copy and links. */
export function AdminContactCopyForm({ initial, onSaved }: AdminContactCopyFormProps) {
  return (
    <AdminSiteCopyForm
      description="Contact block at the bottom of the homepage: heading, phone, email, and socials."
      copyKey={SITE_COPY_KEYS.contact}
      initial={initial}
      saveLabel="Save this section"
      onSaved={onSaved}
      beforeSave={filterSocial}
    >
      {(draft, setDraft) => (
        <>
          <AdminCopySection title="Text" description="Heading visitors see above the form.">
            <ContactHeadingFields draft={draft} onChange={setDraft} />
          </AdminCopySection>
          <AdminCopySection title="Details" description="How people reach the studio.">
            <ContactDetailsFields draft={draft} onChange={setDraft} />
          </AdminCopySection>
          <AdminCopySection title="Social" description="Network name and its page.">
            <AdminPairListField
              label="Social links"
              hint="Name on the left, page address on the right"
              leftPlaceholder="Instagram"
              rightPlaceholder="https://"
              addLabel="Add a social link"
              rows={draft.social.map((item) => ({ left: item.label, right: item.href }))}
              onChange={(rows) =>
                setDraft({
                  ...draft,
                  social: rows.map((row) => ({ label: row.left, href: row.right })),
                })
              }
            />
          </AdminCopySection>
        </>
      )}
    </AdminSiteCopyForm>
  );
}
