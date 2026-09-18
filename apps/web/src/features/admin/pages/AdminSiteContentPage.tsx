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
    title: "Homepage top",
    description: "The big pictures and words at the very top of the homepage.",
  },
  {
    href: SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
    title: "Services",
    description: "Photography, video, tours, and the other service blocks. Click one to edit it.",
  },
  {
    href: SUPERSUDO_PANEL_MARKETING_COPY_PATH,
    title: "What We Do, Web Pages, Contact",
    description: "The intro, the property-website offer, and the contact block at the bottom.",
  },
  {
    href: SUPERSUDO_PANEL_HOMEPAGE_COPY_PATH,
    title: "Other homepage blocks",
    description: "Numbers, team, process, prices heading, and the rest — one tab at a time.",
  },
] as const;

export function AdminSiteContentPage() {
  return (
    <>
      <AdminPageHeader
        title="Other homepage text"
        description="Choose a card. Each one is a part of the homepage. Change the words, then Save."
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
