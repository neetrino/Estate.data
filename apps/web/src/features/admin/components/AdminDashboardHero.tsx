"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useAdminAuth } from "@/features/admin/providers/AdminAuthProvider";
import { adminHeroBlobTransition } from "@/features/admin/lib/admin-motion";
import { Button } from "@/components/ui/button";
import {
  ADMIN_DASHBOARD_HERO_ACCENT_CLASS,
  ADMIN_DASHBOARD_HERO_BLOB_PRIMARY_CLASS,
  ADMIN_DASHBOARD_HERO_BLOB_SECONDARY_CLASS,
  ADMIN_DASHBOARD_HERO_BODY_CLASS,
  ADMIN_DASHBOARD_HERO_CLASS,
  ADMIN_DASHBOARD_HERO_CTA_CLASS,
  ADMIN_DASHBOARD_HERO_DECOR_CLASS,
  ADMIN_DASHBOARD_HERO_EYEBROW_CLASS,
  ADMIN_DASHBOARD_HERO_SUBTITLE_CLASS,
  ADMIN_DASHBOARD_HERO_TITLE_CLASS,
} from "@/features/admin/styles/admin-dashboard-classes";

function greetingName(email: string | null): string | null {
  const localPart = email?.split("@")[0]?.trim();
  if (!localPart) {
    return null;
  }

  return localPart;
}

export function AdminDashboardHero() {
  const { email } = useAdminAuth();
  const reduceMotion = useReducedMotion();
  const name = greetingName(email);
  const title = name ? `Welcome back, ${name}` : "Welcome back";

  return (
    <motion.section
      className={ADMIN_DASHBOARD_HERO_CLASS}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={ADMIN_DASHBOARD_HERO_DECOR_CLASS} aria-hidden>
        <motion.span
          className={ADMIN_DASHBOARD_HERO_BLOB_PRIMARY_CLASS}
          animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, 12, 0] }}
          transition={adminHeroBlobTransition}
        />
        <motion.span
          className={ADMIN_DASHBOARD_HERO_BLOB_SECONDARY_CLASS}
          animate={reduceMotion ? undefined : { x: [0, 14, 0], y: [0, -10, 0] }}
          transition={{ ...adminHeroBlobTransition, duration: 10 }}
        />
      </div>
      <div className={ADMIN_DASHBOARD_HERO_BODY_CLASS}>
        <div>
          <p className={ADMIN_DASHBOARD_HERO_EYEBROW_CLASS}>Admin overview</p>
          <h1 className={ADMIN_DASHBOARD_HERO_TITLE_CLASS}>{title}</h1>
          <p className={ADMIN_DASHBOARD_HERO_SUBTITLE_CLASS}>
            Track content, inquiries, and payments from one command center.
          </p>
          <div className={ADMIN_DASHBOARD_HERO_ACCENT_CLASS} />
        </div>
        <Button asChild size="lg" className={ADMIN_DASHBOARD_HERO_CTA_CLASS}>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            View live site
            <ExternalLink className="size-3.5" aria-hidden />
          </Link>
        </Button>
      </div>
    </motion.section>
  );
}
