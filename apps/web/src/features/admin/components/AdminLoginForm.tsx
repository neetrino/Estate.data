"use client";

import { ADMIN_LOGIN_COPY } from "@/features/admin/content/adminCopy";
import { SUPERSUDO_PANEL_PATH } from "@/features/admin/lib/admin-paths";
import { adminLoginFormSchema } from "@/features/admin/schemas/admin-login-schema";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import {
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
  CONTACT_FORM_SUBMIT_BUTTON_CLASS,
} from "@/shared/lib/constants";
import { isApiError } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

const ADMIN_LOGIN_CARD_CLASS =
  "w-full max-w-md rounded-2xl border border-foreground/10 bg-white p-6 shadow-[var(--client-voices-card-shadow)] sm:p-8";

const ADMIN_LOGIN_LABEL_CLASS = "text-sm font-semibold text-black";

const ADMIN_LOGIN_CONTROL_CLASS = [
  "w-full rounded-xl border border-foreground/15 bg-white px-4 py-3 text-base text-black",
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
].join(" ");

const ADMIN_LOGIN_ERROR_CLASS =
  "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800";

type FormStatus = "idle" | "submitting" | "error";

export function AdminLoginForm() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = adminLoginFormSchema.safeParse({
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    });

    if (!parsed.success) {
      setStatus("error");
      setErrorMessage(parsed.error.issues[0]?.message ?? ADMIN_LOGIN_COPY.genericError);
      return;
    }

    try {
      await login(parsed.data.email, parsed.data.password);
      router.replace(SUPERSUDO_PANEL_PATH);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        isApiError(error) ? error.message : ADMIN_LOGIN_COPY.genericError,
      );
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form className={ADMIN_LOGIN_CARD_CLASS} onSubmit={handleSubmit} noValidate>
      {status === "error" ? (
        <p role="alert" className={`${ADMIN_LOGIN_ERROR_CLASS} mb-5`}>
          {errorMessage}
        </p>
      ) : null}

      <AdminLoginField id="admin-email" label={ADMIN_LOGIN_COPY.emailLabel}>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isSubmitting}
          placeholder={ADMIN_LOGIN_COPY.emailPlaceholder}
          className={ADMIN_LOGIN_CONTROL_CLASS}
        />
      </AdminLoginField>

      <div className="mt-5">
        <AdminLoginField id="admin-password" label={ADMIN_LOGIN_COPY.passwordLabel}>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            minLength={8}
            disabled={isSubmitting}
            placeholder={ADMIN_LOGIN_COPY.passwordPlaceholder}
            className={ADMIN_LOGIN_CONTROL_CLASS}
          />
        </AdminLoginField>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${CONTACT_FORM_SUBMIT_BUTTON_CLASS} mt-8`}
      >
        {isSubmitting ? ADMIN_LOGIN_COPY.submittingLabel : ADMIN_LOGIN_COPY.submitLabel}
      </button>
    </form>
  );
}

function AdminLoginField({
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
      <label htmlFor={id} className={ADMIN_LOGIN_LABEL_CLASS}>
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
