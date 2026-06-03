type AdminBadgeProps = {
  readonly label: string;
  readonly tone?: "default" | "success" | "warning" | "muted";
};

const TONE_CLASS = {
  default: "bg-brand-purple/10 text-brand-purple",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-800",
  muted: "bg-neutral-100 text-muted-foreground",
} as const;

export function AdminBadge({ label, tone = "default" }: AdminBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE_CLASS[tone]}`}
    >
      {label}
    </span>
  );
}
