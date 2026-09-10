"use client";

import { useState, type FormEvent } from "react";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { submitContactInquiry } from "@/features/contact/services/submitContactInquiry";
import {
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
  CONTACT_FORM_SUBMIT_BUTTON_CLASS,
} from "@/shared/lib/constants";
import { isApiError } from "@/shared/api";

const LABEL_CLASS = "studio-label mb-2 block text-studio-muted";

const CONTROL_CLASS = [
  "w-full border border-studio-border bg-transparent px-4 py-3.5 text-sm text-studio-fg",
  "outline-none transition-colors placeholder:text-studio-muted/70 focus:border-studio-accent",
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
].join(" ");

const ERROR_CLASS = "border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200";

const SUCCESS_CLASS =
  "border border-studio-accent/40 bg-studio-accent/10 px-4 py-3 text-sm text-studio-fg";

const GENERAL_INQUIRY_ADDRESS = "General inquiry";
const GENERAL_SERVICE = "other" as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

/** Compact Name / Email / Message form for the Talk to the studio section. */
export function StudioTalkForm() {
  const copy = STUDIO_PAGE_COPY.talk;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    setStatus("submitting");
    setErrorMessage(null);

    try {
      await submitContactInquiry({
        name,
        email,
        propertyAddress: GENERAL_INQUIRY_ADDRESS,
        services: [GENERAL_SERVICE],
        projectDetails: message,
      });
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(isApiError(error) ? error.message : copy.errorMessage);
    }
  }

  if (status === "success") {
    return (
      <div className={SUCCESS_CLASS} role="status">
        <p className="font-semibold text-studio-fg">{copy.successTitle}</p>
        <p className="mt-1 text-studio-muted">{copy.successBody}</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={(event) => void handleSubmit(event)} noValidate>
      {status === "error" && errorMessage ? (
        <p className={ERROR_CLASS} role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL_CLASS}>{copy.nameLabel}</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            disabled={isSubmitting}
            className={CONTROL_CLASS}
          />
        </label>
        <label className="block">
          <span className={LABEL_CLASS}>{copy.emailFieldLabel}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            disabled={isSubmitting}
            className={CONTROL_CLASS}
          />
        </label>
      </div>

      <label className="block">
        <span className={LABEL_CLASS}>{copy.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={copy.messagePlaceholder}
          disabled={isSubmitting}
          className={`${CONTROL_CLASS} min-h-[8.5rem] resize-y`}
        />
      </label>

      <button type="submit" disabled={isSubmitting} className={CONTACT_FORM_SUBMIT_BUTTON_CLASS}>
        {isSubmitting ? copy.submittingLabel : copy.submitLabel}
      </button>
    </form>
  );
}
