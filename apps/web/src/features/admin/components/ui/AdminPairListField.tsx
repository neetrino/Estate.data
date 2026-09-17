"use client";

import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import {
  ADMIN_INPUT_CLASS,
  ADMIN_PAIR_ROW_CLASS,
  ADMIN_TEXT_BUTTON_CLASS,
} from "@/features/admin/styles/admin-panel-classes";

export type AdminPairRow = {
  readonly left: string;
  readonly right: string;
};

type AdminPairListFieldProps = {
  readonly label: string;
  readonly hint: string;
  readonly leftPlaceholder: string;
  readonly rightPlaceholder: string;
  readonly addLabel: string;
  readonly rows: readonly AdminPairRow[];
  readonly onChange: (rows: AdminPairRow[]) => void;
};

/** Two-column list (name + value) with add/remove — no pipe syntax. */
export function AdminPairListField({
  label,
  hint,
  leftPlaceholder,
  rightPlaceholder,
  addLabel,
  rows,
  onChange,
}: AdminPairListFieldProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-brand-navy">{label}</legend>
      <p className="text-xs text-muted-foreground">{hint}</p>
      {rows.map((row, index) => (
        <div key={`${leftPlaceholder}-${index}`} className={ADMIN_PAIR_ROW_CLASS}>
          <input
            value={row.left}
            placeholder={leftPlaceholder}
            className={ADMIN_INPUT_CLASS}
            onChange={(event) => onChange(replaceRow(rows, index, { left: event.target.value }))}
          />
          <input
            value={row.right}
            placeholder={rightPlaceholder}
            className={ADMIN_INPUT_CLASS}
            onChange={(event) => onChange(replaceRow(rows, index, { right: event.target.value }))}
          />
          <button
            type="button"
            className={ADMIN_TEXT_BUTTON_CLASS}
            onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))}
          >
            Remove
          </button>
        </div>
      ))}
      <AdminButton
        variant="secondary"
        type="button"
        onClick={() => onChange([...rows, { left: "", right: "" }])}
      >
        {addLabel}
      </AdminButton>
    </fieldset>
  );
}

function replaceRow(
  rows: readonly AdminPairRow[],
  index: number,
  patch: Partial<AdminPairRow>,
): AdminPairRow[] {
  return rows.map((row, rowIndex) => (rowIndex === index ? { ...row, ...patch } : row));
}
