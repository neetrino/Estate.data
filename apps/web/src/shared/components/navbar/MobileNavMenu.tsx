"use client";

import { useState } from "react";
import {
  MOBILE_NAV_PRIMARY_LINKS,
  SERVICE_NAV_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";
import {
  mobileNavLinkClassName,
  mobileNavMoreToggleClassName,
} from "@/shared/components/navbar/mobileNavLinkStyles";
import {
  NAVBAR_MOBILE_NAV_LIST_CLASS,
  NAVBAR_MOBILE_PANEL_SCROLL_CLASS,
} from "@/shared/lib/constants";
import type { ServiceCatalogItem } from "@/shared/lib/serviceCatalog";

type MobileNavMenuProps = {
  pathname: string;
  hash?: string;
  onNavigate: () => void;
};

export function MobileNavMenu({ pathname, hash = "", onNavigate }: MobileNavMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(true);

  return (
    <div className={NAVBAR_MOBILE_PANEL_SCROLL_CLASS}>
      <nav className={NAVBAR_MOBILE_NAV_LIST_CLASS} aria-label="Mobile">
        <div className="flex flex-col py-0">
          <button
            type="button"
            className={mobileNavMoreToggleClassName(false)}
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((open) => !open)}
          >
            Services
            <ChevronDownIcon open={servicesOpen} />
          </button>
          {servicesOpen ? (
            <div className="flex flex-col">
              {SERVICE_NAV_LINKS.filter((service) => service.enabled).map((service) => (
                <MobileServiceNavLink
                  key={service.id}
                  service={service}
                  active={isNavbarActivePath(pathname, service.href, hash)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : null}
        </div>

        {MOBILE_NAV_PRIMARY_LINKS.map((link) => (
          <MobileNavLink
            key={link.href}
            link={link}
            active={isNavbarActivePath(pathname, link.href, hash)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
}

type MobileNavLinkProps = {
  link: NavLink;
  active: boolean;
  onNavigate: () => void;
};

function MobileNavLink({ link, active, onNavigate }: MobileNavLinkProps) {
  return (
    <HomeSectionLink
      href={link.href}
      className={mobileNavLinkClassName(active)}
      ariaCurrent={active ? "page" : undefined}
      onNavigate={onNavigate}
    >
      {link.label}
    </HomeSectionLink>
  );
}

type MobileServiceNavLinkProps = {
  service: ServiceCatalogItem;
  active: boolean;
  onNavigate: () => void;
};

function MobileServiceNavLink({
  service,
  active,
  onNavigate,
}: MobileServiceNavLinkProps) {
  if (!service.enabled) {
    return (
      <span className={`${mobileNavLinkClassName(active)} cursor-not-allowed opacity-60`}>
        {service.label}
      </span>
    );
  }

  return (
    <HomeSectionLink
      href={service.href}
      className={mobileNavLinkClassName(active)}
      ariaCurrent={active ? "page" : undefined}
      onNavigate={onNavigate}
    >
      {service.label}
    </HomeSectionLink>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
