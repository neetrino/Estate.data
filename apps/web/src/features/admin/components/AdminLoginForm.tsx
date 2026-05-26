"use client";

import { AdminLoginCardHeader } from "@/features/admin/components/AdminLoginCardHeader";
import {
  AdminLoginArrowIcon,
  AdminLoginEyeIcon,
  AdminLoginEyeOffIcon,
  AdminLoginLockIcon,
  AdminLoginMailIcon,
  AdminLoginSecureLockIcon,
} from "@/features/admin/components/AdminLoginIcons";
import {
  ADMIN_LOGIN_COPY,
  ADMIN_LOGIN_REMEMBER_EMAIL_KEY,
} from "@/features/admin/content/adminCopy";
import {
  ADMIN_LOGIN_CARD_CLASS,
  ADMIN_LOGIN_CONTROL_CLASS,
  ADMIN_LOGIN_ERROR_CLASS,
  ADMIN_LOGIN_FIELD_CLASS,
  ADMIN_LOGIN_FORGOT_CLASS,
  ADMIN_LOGIN_INPUT_ICON_CLASS,
  ADMIN_LOGIN_INPUT_WRAP_CLASS,
  ADMIN_LOGIN_LABEL_CLASS,
  ADMIN_LOGIN_OPTIONS_CLASS,
  ADMIN_LOGIN_REMEMBER_CLASS,
  ADMIN_LOGIN_SECURE_CLASS,
  ADMIN_LOGIN_SPINNER_CLASS,
  ADMIN_LOGIN_SUBMIT_CLASS,
  ADMIN_LOGIN_SUBMIT_INNER_CLASS,
  ADMIN_LOGIN_TOGGLE_CLASS,
} from "@/features/admin/lib/admin-login-styles";
import { SUPERSUDO_PANEL_PATH } from "@/features/admin/lib/admin-paths";
import { adminLoginFormSchema } from "@/features/admin/schemas/admin-login-schema";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { isApiError } from "@/shared/api";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";

type FormStatus = "idle" | "submitting" | "error";

function readRememberedEmail(): string {
  if (typeof window === "undefined") {
    return "";
  }
  try {
    return window.localStorage.getItem(ADMIN_LOGIN_REMEMBER_EMAIL_KEY) ?? "";
  } catch {
    return "";
  }
}

function persistRememberedEmail(email: string, shouldRemember: boolean): void {
  try {
    if (shouldRemember) {
      window.localStorage.setItem(ADMIN_LOGIN_REMEMBER_EMAIL_KEY, email);
      return;
    }
    window.localStorage.removeItem(ADMIN_LOGIN_REMEMBER_EMAIL_KEY);
  } catch {
    /* storage unavailable — UI-only preference */
  }
}

export function AdminLoginForm() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState(readRememberedEmail);
  const [rememberMe, setRememberMe] = useState(() => readRememberedEmail() !== "");

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
      persistRememberedEmail(parsed.data.email, rememberMe);
      router.replace(SUPERSUDO_PANEL_PATH);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        isApiError(error) ? error.message : ADMIN_LOGIN_COPY.genericError,
      );
    }
  }

  const isSubmitting = status === "submitting";
  const passwordToggleLabel = isPasswordVisible
    ? ADMIN_LOGIN_COPY.hidePasswordLabel
    : ADMIN_LOGIN_COPY.showPasswordLabel;

  return (
    <form
      className={`${ADMIN_LOGIN_CARD_CLASS} admin-login-card--enter`}
      onSubmit={handleSubmit}
      noValidate
    >
      <AdminLoginCardHeader />

      {status === "error" ? (
        <p role="alert" className={ADMIN_LOGIN_ERROR_CLASS}>
          {errorMessage}
        </p>
      ) : null}

      <div className="admin-login-card__fields">
        <AdminLoginField id="admin-email" label={ADMIN_LOGIN_COPY.emailLabel}>
          <div className={ADMIN_LOGIN_INPUT_WRAP_CLASS}>
            <span className={ADMIN_LOGIN_INPUT_ICON_CLASS}>
              <AdminLoginMailIcon />
            </span>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={ADMIN_LOGIN_COPY.emailPlaceholder}
              className={ADMIN_LOGIN_CONTROL_CLASS}
            />
          </div>
        </AdminLoginField>

        <AdminLoginField id="admin-password" label={ADMIN_LOGIN_COPY.passwordLabel}>
          <div className={ADMIN_LOGIN_INPUT_WRAP_CLASS}>
            <span className={ADMIN_LOGIN_INPUT_ICON_CLASS}>
              <AdminLoginLockIcon />
            </span>
            <input
              id="admin-password"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="current-password"
              required
              minLength={8}
              disabled={isSubmitting}
              placeholder={ADMIN_LOGIN_COPY.passwordPlaceholder}
              className={ADMIN_LOGIN_CONTROL_CLASS}
            />
            <button
              type="button"
              className={ADMIN_LOGIN_TOGGLE_CLASS}
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              disabled={isSubmitting}
              aria-label={passwordToggleLabel}
            >
              {isPasswordVisible ? <AdminLoginEyeOffIcon /> : <AdminLoginEyeIcon />}
            </button>
          </div>
        </AdminLoginField>

        <div className={ADMIN_LOGIN_OPTIONS_CLASS}>
          <label className={ADMIN_LOGIN_REMEMBER_CLASS}>
            <input
              type="checkbox"
              name="remember"
              checked={rememberMe}
              disabled={isSubmitting}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <span>{ADMIN_LOGIN_COPY.rememberMeLabel}</span>
          </label>
          <button type="button" className={ADMIN_LOGIN_FORGOT_CLASS}>
            {ADMIN_LOGIN_COPY.forgotPasswordLabel}
          </button>
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className={ADMIN_LOGIN_SUBMIT_CLASS}>
        <span className={ADMIN_LOGIN_SUBMIT_INNER_CLASS}>
          {isSubmitting ? (
            <>
              <span className={ADMIN_LOGIN_SPINNER_CLASS} aria-hidden />
              {ADMIN_LOGIN_COPY.submittingLabel}
            </>
          ) : (
            <>
              {ADMIN_LOGIN_COPY.submitLabel}
              <AdminLoginArrowIcon />
            </>
          )}
        </span>
      </button>

      <p className={ADMIN_LOGIN_SECURE_CLASS}>
        <AdminLoginSecureLockIcon />
        {ADMIN_LOGIN_COPY.securePortalLabel}
      </p>
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
    <div className={ADMIN_LOGIN_FIELD_CLASS}>
      <label htmlFor={id} className={ADMIN_LOGIN_LABEL_CLASS}>
        {label}
      </label>
      {children}
    </div>
  );
}
