"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import type { AdminNavIconId } from "@/features/admin/config/admin-nav";
import { useCountUp } from "@/features/admin/hooks/useCountUp";
import { AdminLucideIcon } from "@/features/admin/lib/admin-lucide-icons";
import { adminFadeUpItem } from "@/features/admin/lib/admin-motion";
import {
  ADMIN_STAT_CARD_CLASS,
  ADMIN_STAT_CARD_COPY_CLASS,
  ADMIN_STAT_CARD_INNER_CLASS,
  ADMIN_STAT_CARD_LABEL_CLASS,
  ADMIN_STAT_CARD_ROW_CLASS,
  ADMIN_STAT_CARD_SUBLABEL_CLASS,
  ADMIN_STAT_CARD_VALUE_CLASS,
  ADMIN_STAT_ICON_SIZE_CLASS,
  ADMIN_STAT_ICON_TONE_CLASS,
  ADMIN_STAT_ICON_WRAP_CLASS,
  type AdminStatIconTone,
} from "@/features/admin/styles/admin-dashboard-classes";

type AdminStatCardProps = {
  readonly label: string;
  readonly value: number;
  readonly href?: string;
  readonly sublabel?: string;
  readonly icon?: AdminNavIconId;
  readonly tone?: AdminStatIconTone;
};

export function AdminStatCard({
  label,
  value,
  href,
  sublabel,
  icon,
  tone = "purple",
}: AdminStatCardProps) {
  const reduceMotion = useReducedMotion();
  const displayValue = useCountUp(value);

  const content = (
    <Card className={ADMIN_STAT_CARD_CLASS}>
      <CardContent className={ADMIN_STAT_CARD_INNER_CLASS}>
        <div className={ADMIN_STAT_CARD_ROW_CLASS}>
          <div className={ADMIN_STAT_CARD_COPY_CLASS}>
            <p className={ADMIN_STAT_CARD_LABEL_CLASS}>{label}</p>
            <p className={ADMIN_STAT_CARD_VALUE_CLASS}>{displayValue}</p>
            {sublabel ? <p className={ADMIN_STAT_CARD_SUBLABEL_CLASS}>{sublabel}</p> : null}
          </div>
          {icon ? (
            <span className={`${ADMIN_STAT_ICON_WRAP_CLASS} ${ADMIN_STAT_ICON_TONE_CLASS[tone]}`}>
              <AdminLucideIcon id={icon} className={ADMIN_STAT_ICON_SIZE_CLASS} />
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );

  const wrapped = href ? (
    <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/40 rounded-2xl">
      {content}
    </Link>
  ) : (
    content
  );

  return (
    <motion.div
      variants={adminFadeUpItem}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      {wrapped}
    </motion.div>
  );
}
