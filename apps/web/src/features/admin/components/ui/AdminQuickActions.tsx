"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminNavIconId } from "@/features/admin/config/admin-nav";
import { AdminLucideIcon } from "@/features/admin/lib/admin-lucide-icons";
import { adminFadeUpItem, adminStaggerContainer } from "@/features/admin/lib/admin-motion";
import {
  ADMIN_DASHBOARD_PANEL_BODY_CLASS,
  ADMIN_DASHBOARD_PANEL_CLASS,
  ADMIN_DASHBOARD_PANEL_HEADER_CLASS,
  ADMIN_DASHBOARD_PANEL_TITLE_CLASS,
  ADMIN_QUICK_ACTION_CHEVRON_CLASS,
  ADMIN_QUICK_ACTION_COPY_CLASS,
  ADMIN_QUICK_ACTION_HINT_CLASS,
  ADMIN_QUICK_ACTION_ICON_CLASS,
  ADMIN_QUICK_ACTION_LABEL_CLASS,
  ADMIN_QUICK_ACTION_LINK_CLASS,
  ADMIN_QUICK_ACTION_LIST_CLASS,
} from "@/features/admin/styles/admin-dashboard-classes";

export type AdminQuickAction = {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: AdminNavIconId;
};

type AdminQuickActionsProps = {
  readonly actions: readonly AdminQuickAction[];
};

export function AdminQuickActions({ actions }: AdminQuickActionsProps) {
  return (
    <motion.div variants={adminFadeUpItem}>
      <Card className={ADMIN_DASHBOARD_PANEL_CLASS}>
        <CardHeader className={ADMIN_DASHBOARD_PANEL_HEADER_CLASS}>
          <CardTitle className={ADMIN_DASHBOARD_PANEL_TITLE_CLASS}>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className={ADMIN_DASHBOARD_PANEL_BODY_CLASS}>
          <motion.ul
            className={ADMIN_QUICK_ACTION_LIST_CLASS}
            variants={adminStaggerContainer}
            initial="hidden"
            animate="show"
          >
            {actions.map((action) => (
              <motion.li key={action.id} variants={adminFadeUpItem}>
                <Link href={action.href} className={ADMIN_QUICK_ACTION_LINK_CLASS}>
                  <span className={ADMIN_QUICK_ACTION_ICON_CLASS}>
                    <AdminLucideIcon id={action.icon} className="size-[18px]" />
                  </span>
                  <span className={ADMIN_QUICK_ACTION_COPY_CLASS}>
                    <span className={ADMIN_QUICK_ACTION_LABEL_CLASS}>{action.label}</span>
                    <span className={ADMIN_QUICK_ACTION_HINT_CLASS}>{action.description}</span>
                  </span>
                  <ChevronRight className={ADMIN_QUICK_ACTION_CHEVRON_CLASS} aria-hidden />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
