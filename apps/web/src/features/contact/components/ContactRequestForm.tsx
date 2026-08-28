"use client";

import { CONTACT_FORM_COPY } from "@/features/contact/content/contactFormCopy";
import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
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
  "border border-studio-border bg-studio-card p-6 sm:p-8";

const CONTACT_FORM_LABEL_CLASS = "text-sm font-semibold text-studio-fg";

const CONTACT_FORM_CONTROL_CLASS = [
  "w-full border border-studio-border bg-studio-bg px-4 py-3 text-base text-studio-fg",
  "placeholder:text-studio-muted focus-visible:outline-none focus-visible:ring-2",
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
].join(" ");

const CONTACT_FORM_STATUS_ERROR_CLASS =
  "border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200";

const CONTACT_FORM_STATUS_SUCCESS_CLASS =
  "border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-100";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactRequestFormProps = {
  readonly fields: readonly ContactFieldSetting[];
};

export function ContactRequestForm({ fields }: ContactRequestFormProps) {
  const { submitLabel, submittingLabel, successMessage, errorMessage } = CONTACT_FORM_COPY;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const visibleFields = fields.filter((field) => field.mode !== "hidden");
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFormError(null);
    const form = event.currentTarget;

    try {
      await submitContactInquiry(contactFormToPayload(form));
      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFormError(isApiError(error) ? error.message : errorMessage);
    }
  }

  return (
    <form className={CONTACT_FORM_CARD_CLASS} onSubmit={handleSubmit} noValidate>
      {status === "error" ? (
        <p role="alert" className={`${CONTACT_FORM_STATUS_ERROR_CLASS} mb-5`}>
          {formError ?? errorMessage}
        </p>
      ) : null}
      {status === "success" ? (
        <p role="status" className={`${CONTACT_FORM_STATUS_SUCCESS_CLASS} mb-5`}>
          {successMessage}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {visibleFields.map((field) => (
          <div
            key={field.fieldKey}
            className={isFullWidthField(field.fieldKey) ? "sm:col-span-2" : undefined}
          >
            <ContactFormField
              id={`contact-${field.fieldKey}`}
              label={fieldLabel(field)}
            >
              <ContactFieldControl field={field} disabled={isSubmitting} />
            </ContactFormField>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting || status === "success"}
          className={CONTACT_FORM_SUBMIT_BUTTON_CLASS}
        >
          <span>{isSubmitting ? submittingLabel : submitLabel}</span>
        </button>
      </div>
    </form>
  );
}

function fieldLabel(field: ContactFieldSetting): string {
  return field.mode === "required" ? `${field.label}*` : field.label;
}

function isFullWidthField(fieldKey: string): boolean {
  return fieldKey === "projectDetails" || fieldKey === "propertyAddress";
}

function ContactFormField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className={CONTACT_FORM_LABEL_CLASS}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ContactFieldControl({
  field,
  disabled,
}: {
  field: ContactFieldSetting;
  disabled: boolean;
}) {
  const required = field.mode === "required";
  const id = `contact-${field.fieldKey}`;

  if (field.fieldKey === "service") {
    return (
      <ContactServiceSelect
        id={id}
        placeholder={field.placeholder}
        disabled={disabled}
        required={required}
      />
    );
  }

  if (field.fieldKey === "preferredDate") {
    return (
      <ContactDatePicker id={id} placeholder={field.placeholder} disabled={disabled} />
    );
  }

  if (field.fieldKey === "projectDetails") {
    return (
      <textarea
        id={id}
        name={field.fieldKey}
        rows={5}
        required={required}
        disabled={disabled}
        placeholder={field.placeholder}
        className={`${CONTACT_FORM_CONTROL_CLASS} resize-y`}
      />
    );
  }

  return (
    <input
      id={id}
      name={field.fieldKey}
      type={field.fieldKey === "email" ? "email" : "text"}
      required={required}
      disabled={disabled}
      placeholder={field.placeholder}
      className={CONTACT_FORM_CONTROL_CLASS}
    />
  );
}
