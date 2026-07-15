import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import { SERVICE_CATALOG } from "@/shared/lib/serviceCatalog";

export type FooterNavLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly disabled?: boolean;
};

export const FOOTER_BRAND_TAGLINE =
  "High-impact visual marketing for real estate teams across Los Angeles.";

export const FOOTER_SERVICES_LINKS = SERVICE_CATALOG.map((service) => ({
  id: service.id,
  label: service.enabled ? service.label : `${service.label} (Coming Soon)`,
  href: service.href,
  disabled: !service.enabled,
})) as readonly FooterNavLink[];

export const FOOTER_COMPANY_LINKS = [
  { id: "about", label: "About", href: "/about" },
  { id: "portfolio", label: "Portfolio", href: "/portfolio" },
  { id: "resources", label: "Resources", href: "/resources" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const satisfies readonly FooterNavLink[];

export const FOOTER_STUDIO = STUDIO_CONTACT;

export const FOOTER_COPYRIGHT = {
  year: 2026,
  companyName: "Neetrino IT Company",
  companyHref: "https://neetrino.com/",
  suffix: "All Rights Reserved.",
} as const;
