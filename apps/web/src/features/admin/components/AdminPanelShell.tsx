"use client";

import { ADMIN_PANEL_COPY } from "@/features/admin/content/adminCopy";
import { SUPERSUDO_PATH } from "@/features/admin/lib/admin-paths";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { useRouter } from "next/navigation";

const ADMIN_PANEL_HEADER_CLASS =
  "flex flex-col gap-4 border-b border-foreground/10 pb-6 sm:flex-row sm:items-center sm:justify-between";

const ADMIN_PANEL_LOGOUT_CLASS = [
  "inline-flex h-10 cursor-pointer items-center justify-center rounded-button px-5",
  "text-sm font-semibold text-brand-navy transition-colors",
  "border border-foreground/15 bg-white hover:bg-neutral-50",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
].join(" ");

const ADMIN_PANEL_SECTION_CARD_CLASS = [
  "rounded-2xl border border-foreground/10 bg-white p-5 shadow-sm",
  "transition-shadow hover:shadow-md",
].join(" ");

type AdminPanelShellProps = {
  readonly children?: React.ReactNode;
};

export function AdminPanelShell({ children }: AdminPanelShellProps) {
  const router = useRouter();
  const { logout } = useAdminAuth();

  function handleLogout() {
    logout();
    router.replace(SUPERSUDO_PATH);
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className={ADMIN_PANEL_HEADER_CLASS}>
        <div>
          <h1 className="text-2xl font-bold text-brand-navy sm:text-3xl">
            {ADMIN_PANEL_COPY.title}
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            {ADMIN_PANEL_COPY.subtitle}
          </p>
        </div>
        <button type="button" onClick={handleLogout} className={ADMIN_PANEL_LOGOUT_CLASS}>
          {ADMIN_PANEL_COPY.logoutLabel}
        </button>
      </header>

      {children ?? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-brand-navy">
            {ADMIN_PANEL_COPY.sectionsTitle}
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {ADMIN_PANEL_COPY.sections.map((section) => (
              <li key={section.id} className={ADMIN_PANEL_SECTION_CARD_CLASS}>
                <h3 className="text-base font-semibold text-brand-navy">
                  {section.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
