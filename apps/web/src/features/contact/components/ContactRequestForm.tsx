"use client";

import { CONTACT_FORM_COPY } from "@/features/contact/content/contactFormCopy";
import { ContactDatePicker } from "@/features/contact/components/ContactDatePicker";
import { ContactServiceSelect } from "@/features/contact/components/ContactServiceSelect";
import {
  contactFormToPayload,
  submitContactInquiry,
} from "@/features/contact/services/submitContactInquiry";
import {
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
  CONTACT_FORM_SUBMIT_BUTTON_CLASS,
} from "@/shared/lib/constants";
import { isApiError } from "@/shared/api";
import { useState, type FormEvent, type ReactNode } from "react";

const CONTACT_FORM_CARD_CLASS =
  "rounded-2xl border border-foreground/10 bg-white p-6 shadow-[var(--client-voices-card-shadow)] sm:p-8";

const CONTACT_FORM_LABEL_CLASS = "text-sm font-semibold text-black";

const CONTACT_FORM_CONTROL_CLASS = [
  "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base text-black",
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
].join(" ");

const CONTACT_FORM_ROW_CLASS = "grid gap-5 sm:grid-cols-2";

const CONTACT_FORM_STATUS_ERROR_CLASS =
  "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800";

const CONTACT_FORM_STATUS_SUCCESS_CLASS =
  "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactFormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
};

function ContactFormField({ id, label, children }: ContactFormFieldProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={CONTACT_FORM_LABEL_CLASS}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ContactFormStatusBanner({
  status,
  errorMessage,
  successMessage,
}: {
  status: FormStatus;
  errorMessage: string;
  successMessage: string;
}) {
  if (status === "error") {
    return (
      <p role="alert" className={`${CONTACT_FORM_STATUS_ERROR_CLASS} mb-5`}>
        {errorMessage}
      </p>
    );
  }

  if (status === "success") {
    return (
      <p role="status" className={`${CONTACT_FORM_STATUS_SUCCESS_CLASS} mb-5`}>
        {successMessage}
      </p>
    );
  }

  return null;
}

export function ContactRequestForm() {
  const { fields, submitLabel, submittingLabel, successMessage, errorMessage } =
    CONTACT_FORM_COPY;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFormError(null);

    const form = event.currentTarget;
    const payload = contactFormToPayload(form);

    try {
      await submitContactInquiry(payload);
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      if (isApiError(error)) {
        setFormError(error.message);
      } else {
        setFormError(errorMessage);
      }
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      className={CONTACT_FORM_CARD_CLASS}
      onSubmit={handleSubmit}
      noValidate
    >
      <ContactFormStatusBanner
        status={status}
        errorMessage={formError ?? errorMessage}
        successMessage={successMessage}
      />

      <div className={CONTACT_FORM_ROW_CLASS}>
        <ContactFormField id="contact-name" label={fields.name.label}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
        </ContactFormField>
        <ContactFormField
          id="contact-preferred-date"
          label={fields.preferredDate.label}
        >
          <ContactDatePicker
            id="contact-preferred-date"
            placeholder={fields.preferredDate.placeholder}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            placeholder={fields.projectDetails.placeholder}
            className={`${CONTACT_FORM_CONTROL_CLASS} resize-y`}
          />
        </ContactFormField>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting || status === "success"}
          className={CONTACT_FORM_SUBMIT_BUTTON_CLASS}
        >
          {isSubmitting ? submittingLabel : submitLabel}
        </button>
      </div>
    </form>
  );
}
