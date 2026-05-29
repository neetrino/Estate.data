import { DATA_BIM_PATH } from "@/shared/lib/routes";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";

export type FooterNavLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

export const FOOTER_BRAND_TAGLINE =
  "High-impact visual marketing and actionable property intelligence — built for Los Angeles.";

export const FOOTER_SERVICES_LINKS = [
  { id: "photography-video", label: "Photography & Video", href: "/services" },
  { id: "drone-tours", label: "Drone & 3D Tours", href: "/services" },
  { id: "scan-to-bim", label: "Scan to BIM", href: DATA_BIM_PATH },
  { id: "market-reports", label: "Market Reports", href: "/solutions" },
] as const satisfies readonly FooterNavLink[];

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
