type AdminCheckboxFieldProps = {
  readonly label: string;
  readonly checked: boolean;
  readonly onChange: (checked: boolean) => void;
};

export function AdminCheckboxField({ label, checked, onChange }: AdminCheckboxFieldProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-transparent px-1 py-1.5 text-sm font-medium text-brand-navy transition-colors hover:border-foreground/8 hover:bg-white">
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
