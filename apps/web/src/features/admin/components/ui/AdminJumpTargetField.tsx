"use client";

import { adminJumpTargetsFor } from "@/features/admin/lib/admin-jump-targets";
import { ADMIN_INPUT_CLASS } from "@/features/admin/styles/admin-panel-classes";

type AdminJumpTargetFieldProps = {
  readonly label: string;
  readonly name: string;
  readonly value: string;
  readonly onChange: (href: string) => void;
};

/** Dropdown of named site sections instead of a raw URL field. */
export function AdminJumpTargetField({
  label,
  name,
  value,
  onChange,
}: AdminJumpTargetFieldProps) {
  const inputId = `admin-field-${name}`;
  const targets = adminJumpTargetsFor(value);

  return (
    <label htmlFor={inputId} className="block space-y-1.5">
      <span className="text-sm font-medium text-brand-navy">{label}</span>
      <select
        id={inputId}
        name={name}
        value={value}
        className={ADMIN_INPUT_CLASS}
        onChange={(event) => onChange(event.target.value)}
      >
        {targets.map((target) => (
          <option key={target.href} value={target.href}>
            {target.label}
          </option>
        ))}
      </select>
      <span className="text-xs text-muted-foreground">Where this button takes the visitor</span>
    </label>
  );
}
