import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

type AdminEmptyStateProps = {
  readonly title: string;
  readonly message: string;
};

export function AdminEmptyState({ title, message }: AdminEmptyStateProps) {
  return (
    <div className={`${ADMIN_CARD_CLASS} text-center`}>
      <h3 className="text-base font-semibold text-brand-navy">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
