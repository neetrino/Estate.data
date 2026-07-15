"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MOBILE_NAV_MORE_LINKS,
  MOBILE_NAV_PRIMARY_LINKS,
  SERVICE_NAV_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
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
  onNavigate: () => void;
};

function isMoreSectionActive(pathname: string): boolean {
  return MOBILE_NAV_MORE_LINKS.some((link) => isNavbarActivePath(pathname, link.href));
}

function isServicesSectionActive(pathname: string): boolean {
  return SERVICE_NAV_LINKS.some((service) => isNavbarActivePath(pathname, service.href));
}

export function MobileNavMenu({ pathname, onNavigate }: MobileNavMenuProps) {
  const moreSectionActive = isMoreSectionActive(pathname);
  const servicesSectionActive = isServicesSectionActive(pathname);
  const primaryLinks = MOBILE_NAV_PRIMARY_LINKS.filter((link) => link.href !== "/services");
  const [moreOpen, setMoreOpen] = useState(() => moreSectionActive);
  const [prevMoreSectionActive, setPrevMoreSectionActive] = useState(moreSectionActive);
  const [servicesOpen, setServicesOpen] = useState(() => servicesSectionActive);
  const [prevServicesSectionActive, setPrevServicesSectionActive] =
    useState(servicesSectionActive);

  if (moreSectionActive !== prevMoreSectionActive) {
    setPrevMoreSectionActive(moreSectionActive);
    if (moreSectionActive) {
      setMoreOpen(true);
    }
  }

  if (servicesSectionActive !== prevServicesSectionActive) {
    setPrevServicesSectionActive(servicesSectionActive);
    if (servicesSectionActive) {
      setServicesOpen(true);
    }
  }

  return (
    <div className={NAVBAR_MOBILE_PANEL_SCROLL_CLASS}>
      <nav className={NAVBAR_MOBILE_NAV_LIST_CLASS} aria-label="Mobile">
        {primaryLinks.map((link) => (
          <MobileNavLink
            key={link.href}
            link={link}
            active={isNavbarActivePath(pathname, link.href)}
            onNavigate={onNavigate}
          />
        ))}

        <div className="flex flex-col py-0">
          <button
            type="button"
            className={mobileNavMoreToggleClassName(servicesSectionActive)}
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((open) => !open)}
          >
            Services
            <ChevronDownIcon open={servicesOpen} />
          </button>

          {servicesOpen ? (
            <div className="flex flex-col">
              {SERVICE_NAV_LINKS.map((service) => (
                <MobileServiceNavLink
                  key={service.id}
                  service={service}
                  active={isNavbarActivePath(pathname, service.href)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col py-0">
          <button
            type="button"
            className={mobileNavMoreToggleClassName(moreSectionActive)}
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((open) => !open)}
          >
            More
            <ChevronDownIcon open={moreOpen} />
          </button>

          {moreOpen ? (
            <div className="flex flex-col">
              {MOBILE_NAV_MORE_LINKS.map((link) => (
                <MobileNavLink
                  key={link.href}
                  link={link}
                  active={isNavbarActivePath(pathname, link.href)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : null}
        </div>
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
    <Link
      href={link.href}
      className={mobileNavLinkClassName(active)}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}

type MobileServiceNavLinkProps = {
  service: ServiceCatalogItem;
  active: boolean;
  onNavigate: () => void;
};

function MobileServiceNavLink({ service, active, onNavigate }: MobileServiceNavLinkProps) {
  if (!service.enabled) {
    return (
      <span className={`${mobileNavLinkClassName(active)} cursor-not-allowed opacity-60`} aria-disabled>
        {service.label}
        {service.comingSoon ? (
          <span className="ml-2 rounded-full border border-zinc-300 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-500">
            Coming Soon
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <Link
      href={service.href}
      className={mobileNavLinkClassName(active)}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {service.label}
    </Link>
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
