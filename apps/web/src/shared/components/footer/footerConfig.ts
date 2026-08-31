import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import { SERVICE_CATALOG } from "@/shared/lib/serviceCatalog";
import {
  HOME_SECTION_IDS,
  homeSectionHref,
} from "@/shared/lib/homeSectionIds";

export type FooterNavLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly disabled?: boolean;
};

export const FOOTER_BRAND_TAGLINE =
  "CAPTURE SPACE. CREATE EXPERIENCE. Real Estate Media + Digital Reality Capture · Los Angeles, California";

export const FOOTER_SERVICES_LINKS = SERVICE_CATALOG.filter((service) => service.enabled).map(
  (service) => ({
    id: service.id,
    label: service.label,
    href: service.href,
    disabled: !service.enabled,
  }),
) as readonly FooterNavLink[];

export const FOOTER_COMPANY_LINKS = [
  { id: "about", label: "About", href: homeSectionHref(HOME_SECTION_IDS.whyUs) },
  { id: "portfolio", label: "Portfolio", href: homeSectionHref(HOME_SECTION_IDS.portfolio) },
  { id: "team", label: "Team", href: homeSectionHref(HOME_SECTION_IDS.studio) },
  { id: "faq", label: "FAQ", href: homeSectionHref(HOME_SECTION_IDS.faq) },
  { id: "contact", label: "Contact", href: homeSectionHref(HOME_SECTION_IDS.contact) },
] as const satisfies readonly FooterNavLink[];

export const FOOTER_LEGAL_LINKS = [
  { id: "privacy", label: "Privacy Policy", href: homeSectionHref(HOME_SECTION_IDS.contact) },
  { id: "terms", label: "Terms", href: homeSectionHref(HOME_SECTION_IDS.contact) },
  { id: "drone-disclaimer", label: "Drone Disclaimer", href: homeSectionHref(HOME_SECTION_IDS.faq) },
] as const satisfies readonly FooterNavLink[];

export const FOOTER_STUDIO = STUDIO_CONTACT;

export const FOOTER_COPYRIGHT = {
  year: 2026,
  rightsText: "Բոլոր իրավունքները պաշտպանված են",
  createdPrefix: "Ստեղծվել է",
  createdSuffix: "կողմից",
  creatorName: "Neetrino IT Company",
  creatorHref: "https://www.neetrino.com/",
} as const;
