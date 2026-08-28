import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  SUPERSUDO_PANEL_CONTACT_FIELDS_PATH,
  SUPERSUDO_PANEL_HERO_SLIDES_PATH,
  SUPERSUDO_PANEL_HOME_HERO_PATH,
  SUPERSUDO_PANEL_SITE_COPY_PATH,
  SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
} from "@/features/admin/lib/admin-paths";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

const CONTENT_LINKS = [
  {
    href: SUPERSUDO_PANEL_HOME_HERO_PATH,
    title: "Home Hero",
    description: "Edit hero title, description, and CTA buttons.",
  },
  {
    href: SUPERSUDO_PANEL_HERO_SLIDES_PATH,
    title: "Hero slides",
    description: "Upload, replace, delete, and reorder slider images.",
  },
  {
    href: SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
    title: "Studio services",
    description: "Edit service section copy, images, and buttons.",
  },
  {
    href: SUPERSUDO_PANEL_CONTACT_FIELDS_PATH,
    title: "Contact fields",
    description: "Mark each form field required, optional, or hidden.",
  },
  {
    href: SUPERSUDO_PANEL_SITE_COPY_PATH,
    title: "Site copy",
    description: "Edit remaining marketing strings and the Analytics URL.",
  },
] as const;

export function AdminSiteContentPage() {
  return (
    <>
      <AdminPageHeader
        title="Site content"
        description="Marketing copy and homepage sections managed from the database."
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        {CONTENT_LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`block ${ADMIN_CARD_CLASS}`}>
              <h2 className="text-base font-semibold text-brand-navy">{link.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {link.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
