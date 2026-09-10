"use client";

import { CONTACT_FORM_COPY } from "@/features/contact/content/contactFormCopy";
import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import { ContactDatePicker } from "@/features/contact/components/ContactDatePicker";
import { ContactServiceCheckboxGroup } from "@/features/contact/components/ContactServiceCheckboxGroup";
import { ContactSuccessPanel } from "@/features/contact/components/ContactSuccessPanel";
import {
  CONTACT_PROPERTY_TYPE_OPTIONS,
  MIN_SELECTED_SERVICES,
} from "@/features/contact/content/contactFieldConfig";
import {
  contactFormToPayload,
  submitContactInquiry,
} from "@/features/contact/services/submitContactInquiry";
import {
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
  CONTACT_FORM_SUBMIT_BUTTON_CLASS,
} from "@/shared/lib/constants";
import { isApiError } from "@/shared/api";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

const CONTACT_FORM_CARD_CLASS =
  "border border-studio-border bg-studio-card p-6 sm:p-8";

const CONTACT_FORM_LABEL_CLASS = "studio-label mb-2 block text-studio-muted";

const CONTACT_FORM_CONTROL_CLASS = [
  "w-full border border-studio-border bg-transparent px-4 py-3.5 text-sm text-studio-fg",
  "outline-none transition-colors placeholder:text-studio-muted/70 focus:border-studio-accent",
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
].join(" ");

const CONTACT_FORM_STATUS_ERROR_CLASS =
  "border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200";

const CONTACT_FORM_STATUS_SCROLL_OPTIONS: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "center",
};

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactRequestFormProps = {
  readonly fields: readonly ContactFieldSetting[];
};

export function ContactRequestForm({ fields }: ContactRequestFormProps) {
  const { submitLabel, submittingLabel, errorMessage } = CONTACT_FORM_COPY;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const visibleFields = fields.filter((field) => field.mode !== "hidden");
  const isSubmitting = status === "submitting";
  const servicesRequired = fields.some(
    (field) => field.fieldKey === "service" && field.mode === "required",
  );
  const statusRef = useRef<HTMLElement | null>(null);
  const setStatusRef = (node: HTMLElement | null) => {
    statusRef.current = node;
  };

  useEffect(() => {
    if (status !== "success" && status !== "error") {
      return;
    }

    statusRef.current?.scrollIntoView(CONTACT_FORM_STATUS_SCROLL_OPTIONS);
    statusRef.current?.focus({ preventScroll: true });
  }, [status, formError]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = contactFormToPayload(form);

    if (servicesRequired && payload.services.length < MIN_SELECTED_SERVICES) {
      setStatus("error");
      setFormError(CONTACT_FORM_COPY.servicesRequiredMessage);
      return;
    }

    setStatus("submitting");
    setFormError(null);

    try {
      await submitContactInquiry(payload);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setFormError(isApiError(error) ? error.message : errorMessage);
    }
  }

  if (status === "success") {
    return <ContactSuccessPanel panelRef={setStatusRef} />;
  }

  return (
    <form className={CONTACT_FORM_CARD_CLASS} onSubmit={handleSubmit} noValidate>
      {status === "error" ? (
        <p
          ref={setStatusRef}
          tabIndex={-1}
          role="alert"
          className={`${CONTACT_FORM_STATUS_ERROR_CLASS} mb-5 outline-none`}
        >
          {formError ?? errorMessage}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        {visibleFields.map((field) =>
          field.fieldKey === "service" ? (
            <ContactServiceCheckboxGroup
              key={field.fieldKey}
              legend={field.label}
              disabled={isSubmitting}
            />
          ) : (
            <div
              key={field.fieldKey}
              className={isFullWidthField(field.fieldKey) ? "sm:col-span-2" : undefined}
            >
              <ContactFormField id={`contact-${field.fieldKey}`} label={fieldLabel(field)}>
                <ContactFieldControl field={field} disabled={isSubmitting} />
              </ContactFormField>
            </div>
          ),
        )}

        <div className="sm:col-span-2">
          <button type="submit" disabled={isSubmitting} className={CONTACT_FORM_SUBMIT_BUTTON_CLASS}>
            <span>{isSubmitting ? submittingLabel : submitLabel}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

function fieldLabel(field: ContactFieldSetting): string {
  return field.mode === "required" ? `${field.label}*` : field.label;
}

const FULL_WIDTH_FIELD_KEYS = ["propertyAddress", "preferredDate", "projectDetails"];

function isFullWidthField(fieldKey: string): boolean {
  return FULL_WIDTH_FIELD_KEYS.includes(fieldKey);
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
      {children}
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

  if (field.fieldKey === "propertyType") {
    return (
      <select
        id={id}
        name={field.fieldKey}
        required={required}
        disabled={disabled}
        defaultValue={CONTACT_PROPERTY_TYPE_OPTIONS[0]}
        className={CONTACT_FORM_CONTROL_CLASS}
      >
        {CONTACT_PROPERTY_TYPE_OPTIONS.map((option) => (
          <option key={option} value={option} className="bg-studio-bg">
            {option}
          </option>
        ))}
      </select>
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
        rows={4}
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
      inputMode={field.fieldKey === "squareFootage" ? "numeric" : undefined}
      required={required}
      disabled={disabled}
      placeholder={field.placeholder}
      className={CONTACT_FORM_CONTROL_CLASS}
    />
  );
}
