import Link from "next/link";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  SUPERSUDO_PANEL_HOME_HERO_PATH,
  SUPERSUDO_PANEL_HOMEPAGE_COPY_PATH,
  SUPERSUDO_PANEL_MARKETING_COPY_PATH,
  SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
} from "@/features/admin/lib/admin-paths";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

const CONTENT_LINKS = [
  {
    href: SUPERSUDO_PANEL_HOME_HERO_PATH,
    title: "Home Hero",
    description: "Hero text, buttons, and slider images — same copy on every slide, or unique copy per image.",
  },
  {
    href: SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
    title: "Studio services",
    description: "Edit service section copy, images, and buttons.",
  },
  {
    href: SUPERSUDO_PANEL_MARKETING_COPY_PATH,
    title: "Marketing copy",
    description: "Homepage intro, Web Pages, and Contact — words, buttons, and the reel.",
  },
  {
    href: SUPERSUDO_PANEL_HOMEPAGE_COPY_PATH,
    title: "Homepage sections",
    description: "Stats, offerings, team, process, before/after, and other homepage copy.",
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
