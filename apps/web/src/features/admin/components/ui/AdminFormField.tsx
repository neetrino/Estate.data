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
  readonly error?: string;
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
  error,
}: AdminFormFieldProps) {
  const inputId = `admin-field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <label htmlFor={inputId} className="block space-y-1.5">
      <span className="text-sm font-medium text-brand-navy">
        {label}
        {required ? " *" : ""}
      </span>
      {multiline ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
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
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={ADMIN_INPUT_CLASS}
        />
      )}
      {error ? (
        <span id={errorId} role="alert" className="text-xs text-red-700">
          {error}
        </span>
      ) : null}
      {!error && hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </label>
  );
}
