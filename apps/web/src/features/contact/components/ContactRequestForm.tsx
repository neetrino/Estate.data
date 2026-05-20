"use client";

import { CONTACT_FORM_COPY } from "@/features/contact/content/contactFormCopy";
import { ContactServiceSelect } from "@/features/contact/components/ContactServiceSelect";
import { clientVoicesButtonClassName } from "@/shared/ui/button";
import type { FormEvent, ReactNode } from "react";

const CONTACT_FORM_CARD_CLASS =
  "rounded-2xl border border-foreground/10 bg-white p-6 shadow-[var(--client-voices-card-shadow)] sm:p-8";

const CONTACT_FORM_LABEL_CLASS = "text-sm font-semibold text-black";

const CONTACT_FORM_CONTROL_CLASS =
  "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base text-black placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-client-voices-accent/40";

const CONTACT_FORM_ROW_CLASS = "grid gap-5 sm:grid-cols-2";

type ContactFormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
};

function ContactFormField({ id, label, children }: ContactFormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={CONTACT_FORM_LABEL_CLASS}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export function ContactRequestForm() {
  const { fields, submitLabel } = CONTACT_FORM_COPY;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      className={CONTACT_FORM_CARD_CLASS}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={CONTACT_FORM_ROW_CLASS}>
        <ContactFormField id="contact-name" label={fields.name.label}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={fields.name.placeholder}
            className={CONTACT_FORM_CONTROL_CLASS}
          />
        </ContactFormField>
        <ContactFormField id="contact-email" label={fields.email.label}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={fields.email.placeholder}
            className={CONTACT_FORM_CONTROL_CLASS}
          />
        </ContactFormField>
      </div>

      <div className="mt-5">
        <ContactFormField
          id="contact-property-address"
          label={fields.propertyAddress.label}
        >
          <input
            id="contact-property-address"
            name="propertyAddress"
            type="text"
            autoComplete="street-address"
            required
            placeholder={fields.propertyAddress.placeholder}
            className={CONTACT_FORM_CONTROL_CLASS}
          />
        </ContactFormField>
      </div>

      <div className={`mt-5 ${CONTACT_FORM_ROW_CLASS}`}>
        <ContactFormField id="contact-service" label={fields.service.label}>
          <ContactServiceSelect
            id="contact-service"
            placeholder={fields.service.placeholder}
          />
        </ContactFormField>
        <ContactFormField
          id="contact-preferred-date"
          label={fields.preferredDate.label}
        >
          <input
            id="contact-preferred-date"
            name="preferredDate"
            type="date"
            className={CONTACT_FORM_CONTROL_CLASS}
          />
        </ContactFormField>
      </div>

      <div className="mt-5">
        <ContactFormField
          id="contact-project-details"
          label={fields.projectDetails.label}
        >
          <textarea
            id="contact-project-details"
            name="projectDetails"
            rows={5}
            placeholder={fields.projectDetails.placeholder}
            className={`${CONTACT_FORM_CONTROL_CLASS} resize-y`}
          />
        </ContactFormField>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className={`${clientVoicesButtonClassName} w-full sm:w-auto`}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
