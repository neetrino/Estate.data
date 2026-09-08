import { createElement } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  FolderKanban,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Palette,
  Tags,
} from "lucide-react";
import type { AdminNavIconId } from "@/features/admin/config/admin-nav";

const ADMIN_LUCIDE_ICON_MAP: Record<AdminNavIconId, LucideIcon> = {
  dashboard: LayoutDashboard,
  portfolio: FolderKanban,
  pricing: Tags,
  faq: CircleHelp,
  "contact-inquiries": Mail,
  "site-content": Palette,
  "home-hero": ImageIcon,
  logout: LogOut,
};

/** Lucide icon for an admin nav id (dashboard UI). Sidebar keeps custom SVG icons. */
export function getAdminLucideIcon(id: AdminNavIconId): LucideIcon {
  return ADMIN_LUCIDE_ICON_MAP[id] ?? Home;
}

type AdminLucideIconProps = {
  readonly id: AdminNavIconId;
  readonly className?: string;
};

export function AdminLucideIcon({ id, className }: AdminLucideIconProps) {
  return createElement(getAdminLucideIcon(id), {
    className,
    "aria-hidden": true,
  });
}
