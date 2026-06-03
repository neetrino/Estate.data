type AdminCheckboxFieldProps = {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
};

export function AdminCheckboxField({ label, checked, onChange }: AdminCheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-navy">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 rounded border-foreground/20 text-brand-purple focus-visible:ring-brand-purple"
      />
      {label}
    </label>
  );
}
