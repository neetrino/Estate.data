"use client";

import {
  ADMIN_BTN_DANGER_CLASS,
  ADMIN_BTN_PRIMARY_CLASS,
  ADMIN_BTN_SECONDARY_CLASS,
} from "@/features/admin/styles/admin-panel-classes";

type AdminButtonVariant = "primary" | "secondary" | "danger";

type AdminButtonProps = {
  readonly variant?: AdminButtonVariant;
  readonly type?: "button" | "submit";
  readonly disabled?: boolean;
  readonly onClick?: () => void;
  readonly children: React.ReactNode;
  readonly className?: string;
};

const VARIANT_CLASS: Record<AdminButtonVariant, string> = {
  primary: ADMIN_BTN_PRIMARY_CLASS,
  secondary: ADMIN_BTN_SECONDARY_CLASS,
  danger: ADMIN_BTN_DANGER_CLASS,
};

export function AdminButton({
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  children,
  className = "",
}: AdminButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${VARIANT_CLASS[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
