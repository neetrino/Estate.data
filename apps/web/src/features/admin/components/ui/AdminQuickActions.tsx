import Link from "next/link";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

export type AdminQuickAction = {
  id: string;
  label: string;
  href: string;
};

type AdminQuickActionsProps = {
  readonly actions: readonly AdminQuickAction[];
};

export function AdminQuickActions({ actions }: AdminQuickActionsProps) {
  return (
    <div className={ADMIN_CARD_CLASS}>
      <h2 className="text-base font-semibold text-brand-navy">Quick actions</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions.map((action) => (
          <li key={action.id}>
            <Link
              href={action.href}
              className="flex rounded-lg border border-foreground/10 px-3 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-purple/30 hover:bg-brand-purple/5"
            >
              {action.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
