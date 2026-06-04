import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { SUPERSUDO_PANEL_HOME_HERO_PATH } from "@/features/admin/lib/admin-paths";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

export function AdminSiteContentPage() {
  return (
    <>
      <AdminPageHeader
        title="Site content"
        description="Marketing copy and homepage sections managed from the database."
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        <li>
          <Link href={SUPERSUDO_PANEL_HOME_HERO_PATH} className={`block ${ADMIN_CARD_CLASS}`}>
            <h2 className="text-base font-semibold text-brand-navy">Home Hero</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Edit the homepage hero title, description, and call-to-action buttons.
            </p>
          </Link>
        </li>
      </ul>
    </>
  );
}
