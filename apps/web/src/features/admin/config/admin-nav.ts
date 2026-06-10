import { ADMIN_PANEL_FEATURES } from "@/features/admin/config/admin-panel-features";

export type AdminNavIconId =
  | "dashboard"
  | "portfolio"
  | "pricing"
  | "articles"
  | "faq"
  | "contact-inquiries"
  | "payments"
  | "site-content"
  | "home-hero"
  | "logout";
import {
  SUPERSUDO_PANEL_ARTICLES_PATH,
  SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
  SUPERSUDO_PANEL_FAQ_PATH,
  SUPERSUDO_PANEL_HOME_HERO_PATH,
  SUPERSUDO_PANEL_PATH,
  SUPERSUDO_PANEL_PAYMENTS_PATH,
  SUPERSUDO_PANEL_PORTFOLIO_PATH,
  SUPERSUDO_PANEL_PRICING_PATH,
  SUPERSUDO_PANEL_SITE_CONTENT_PATH,
} from "@/features/admin/lib/admin-paths";

export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
  icon: AdminNavIconId;
};

export type AdminNavGroup = {
  id: string;
  label: string;
  items: AdminNavItem[];
};

const CONTENT_NAV_ITEMS: AdminNavItem[] = [
  { id: "portfolio", label: "Portfolio", href: SUPERSUDO_PANEL_PORTFOLIO_PATH, icon: "portfolio" },
  { id: "pricing", label: "Pricing", href: SUPERSUDO_PANEL_PRICING_PATH, icon: "pricing" },
  { id: "articles", label: "Articles", href: SUPERSUDO_PANEL_ARTICLES_PATH, icon: "articles" },
  { id: "faq", label: "FAQ", href: SUPERSUDO_PANEL_FAQ_PATH, icon: "faq" },
  {
    id: "home-hero",
    label: "Home Hero",
    href: SUPERSUDO_PANEL_HOME_HERO_PATH,
    icon: "home-hero",
  },
];

const SITE_CONTENT_NAV_ITEM: AdminNavItem = {
  id: "site-content",
  label: "Site content",
  href: SUPERSUDO_PANEL_SITE_CONTENT_PATH,
  icon: "site-content",
};

function buildContentNavItems(): AdminNavItem[] {
  if (!ADMIN_PANEL_FEATURES.showSiteContentInNav) {
    return CONTENT_NAV_ITEMS;
  }

  return [...CONTENT_NAV_ITEMS, SITE_CONTENT_NAV_ITEM];
}

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
    items: buildContentNavItems(),
  },
  {
    id: "inbox",
    label: "Inbox",
    items: [
      {
        id: "contact-inquiries",
        label: "Contact inquiries",
        href: SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH,
        icon: "contact-inquiries",
      },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        id: "payments",
        label: "Payments",
        href: SUPERSUDO_PANEL_PAYMENTS_PATH,
        icon: "payments",
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
