"use client";

import type { NavLink } from "@/shared/components/navbar/navConfig";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { NAV_ITEM_TEXT_CLASS } from "@/shared/lib/constants";
import type { ServiceCatalogItem } from "@/shared/lib/serviceCatalog";

type NavTone = "light" | "dark";

type NavDesktopItemProps = {
  readonly link: NavLink;
  readonly active: boolean;
  readonly tone: NavTone;
  readonly serviceLinks?: readonly ServiceCatalogItem[];
  readonly onNavigate?: () => void;
  readonly useOverlayStyle?: boolean;
};

export function NavDesktopItem({
  link,
  active,
  tone,
  serviceLinks,
  onNavigate,
  useOverlayStyle = false,
}: NavDesktopItemProps) {
  const hasServiceDropdown = Boolean(link.hasServicesDropdown && serviceLinks?.length);

  return (
    <li className={hasServiceDropdown ? "group relative" : undefined}>
      <HomeSectionLink
        href={link.href}
        className={desktopNavLinkClass(active, tone, useOverlayStyle)}
        ariaCurrent={active ? "page" : undefined}
        onNavigate={onNavigate}
      >
        {link.label}
      </HomeSectionLink>
      {hasServiceDropdown ? (
        <ServicesDropdown services={serviceLinks ?? []} onNavigate={onNavigate} />
      ) : null}
    </li>
  );
}

function ServicesDropdown({
  services,
  onNavigate,
}: {
  readonly services: readonly ServiceCatalogItem[];
  readonly onNavigate?: () => void;
}) {
  return (
    <div className="pointer-events-none invisible absolute left-1/2 top-full z-[130] mt-3 w-72 -translate-x-1/2 border border-studio-border bg-studio-card p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
      <ul className="space-y-1" aria-label="Services">
        {services
          .filter((service) => service.enabled)
          .map((service) => (
            <li key={service.id}>
              <HomeSectionLink
                href={service.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-studio-fg transition-colors hover:bg-studio-bg hover:text-studio-accent"
                onNavigate={onNavigate}
              >
                {service.label}
              </HomeSectionLink>
            </li>
          ))}
      </ul>
    </div>
  );
}

function desktopNavLinkClass(
  active: boolean,
  tone: NavTone,
  useOverlayStyle: boolean,
): string {
  if (useOverlayStyle) {
    const base = [
      "relative inline-flex items-center whitespace-nowrap pb-1",
      "border-b border-transparent text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
      "transition-colors focus-visible:outline-none focus-visible:text-studio-accent",
    ].join(" ");

    if (active) {
      return `${base} border-studio-accent text-studio-accent`;
    }

    return `${base} text-studio-fg/80 hover:text-studio-fg`;
  }

  const base = [
    NAV_ITEM_TEXT_CLASS,
    "relative inline-flex items-center whitespace-nowrap transition-colors",
    "hover:text-brand-purple-light focus-visible:text-brand-purple-light focus-visible:outline-none",
  ].join(" ");

  if (active) {
    return `${base} text-accent`;
  }
  if (tone === "light") {
    return `${base} text-white`;
  }
  return `${base} text-slate-900`;
}
