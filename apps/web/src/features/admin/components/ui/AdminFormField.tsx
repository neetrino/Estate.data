import { ADMIN_INPUT_CLASS } from "@/features/admin/styles/admin-panel-classes";

type AdminFormFieldProps = {
  readonly label: string;
  readonly name: string;
  readonly value: string | number;
  readonly onChange: (value: string) => void;
  readonly type?: "text" | "email" | "number" | "url" | "date";
  readonly required?: boolean;
  readonly multiline?: boolean;
  readonly rows?: number;
  readonly hint?: string;
};

export function AdminFormField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  multiline,
  rows = 4,
  hint,
}: AdminFormFieldProps) {
  const inputId = `admin-field-${name}`;

  return (
    <label htmlFor={inputId} className="block space-y-1.5">
      <span className="text-sm font-medium text-brand-navy">{label}</span>
      {multiline ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          required={required}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          className={`${ADMIN_INPUT_CLASS} min-h-[96px] resize-y`}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={ADMIN_INPUT_CLASS}
        />
      )}
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}
