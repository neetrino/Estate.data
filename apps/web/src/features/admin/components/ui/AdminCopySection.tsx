import type { ReactNode } from "react";
import {
  ADMIN_COPY_SECTION_CLASS,
  ADMIN_COPY_SECTION_HINT_CLASS,
  ADMIN_COPY_SECTION_TITLE_CLASS,
} from "@/features/admin/styles/admin-panel-classes";

type AdminCopySectionProps = {
  readonly title: string;
  readonly description: string;
  readonly children: ReactNode;
};

/** Visual group for related marketing-copy fields. */
export function AdminCopySection({ title, description, children }: AdminCopySectionProps) {
  return (
    <section className={ADMIN_COPY_SECTION_CLASS}>
      <header>
        <h3 className={ADMIN_COPY_SECTION_TITLE_CLASS}>{title}</h3>
        <p className={ADMIN_COPY_SECTION_HINT_CLASS}>{description}</p>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
