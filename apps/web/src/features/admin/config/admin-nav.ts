import {
  SUPERSUDO_PANEL_ANALYTICS_PATH,
  SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  SUPERSUDO_PANEL_FAQ_PATH,
  SUPERSUDO_PANEL_HOME_HERO_PATH,
  SUPERSUDO_PANEL_PATH,
  SUPERSUDO_PANEL_PORTFOLIO_PATH,
  SUPERSUDO_PANEL_PRICING_PATH,
  SUPERSUDO_PANEL_SITE_CONTENT_PATH,
  SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
} from "@/features/admin/lib/admin-paths";

export type AdminNavIconId =
  | "dashboard"
  | "portfolio"
  | "pricing"
  | "services"
  | "faq"
  | "contact-inquiries"
  | "site-content"
  | "home-hero"
  | "analytics"
  | "logout";

export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  icon: AdminNavIconId;
  external?: boolean;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

const CONTENT_NAV_ITEMS: AdminNavItem[] = [
  { id: "portfolio", label: "Portfolio", href: SUPERSUDO_PANEL_PORTFOLIO_PATH, icon: "portfolio" },
  {
    id: "services",
    label: "Services",
    href: SUPERSUDO_PANEL_STUDIO_SERVICES_PATH,
    icon: "services",
  },
  { id: "pricing", label: "Pricing", href: SUPERSUDO_PANEL_PRICING_PATH, icon: "pricing" },
  { id: "faq", label: "FAQ", href: SUPERSUDO_PANEL_FAQ_PATH, icon: "faq" },
  {
    id: "home-hero",
    label: "Home Hero",
    href: SUPERSUDO_PANEL_HOME_HERO_PATH,
    icon: "home-hero",
  },
  {
    id: "site-content",
    label: "Site content",
    href: SUPERSUDO_PANEL_SITE_CONTENT_PATH,
    icon: "site-content",
  },
];

/** Scrollable sidebar sections (logout is rendered separately at the bottom). */
export const ADMIN_NAV_GROUPS: AdminNavGroup[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", href: SUPERSUDO_PANEL_PATH, icon: "dashboard" },
    ],
  },
  {
    id: "content",
    label: "Content",
    items: CONTENT_NAV_ITEMS,
  },
  {
    id: "inbox",
    label: "Inbox",
    items: [
      {
        id: "contact-inquiries",
        label: "Inquiries",
        href: SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
        icon: "contact-inquiries",
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    items: [
      {
        id: "analytics",
        label: "Analytics",
        href: SUPERSUDO_PANEL_ANALYTICS_PATH,
        icon: "analytics",
      },
    ],
  },
];

export const ADMIN_SIDEBAR_LOGOUT_ITEM: AdminNavItem = {
  id: "logout",
  label: "Logout",
  href: "#logout",
  icon: "logout",
};

/** Internal page hrefs used to pick a single active sidebar item. */
export const ADMIN_NAV_PAGE_HREFS: readonly string[] = ADMIN_NAV_GROUPS.flatMap((group) =>
  group.items.filter((item) => !item.external).map((item) => item.href),
);
