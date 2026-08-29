"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH } from "@/features/admin/lib/admin-paths";
import { adminFadeUpItem } from "@/features/admin/lib/admin-motion";
import type { AdminContactInquiry } from "@/features/admin/types/admin-data";
import {
  ADMIN_DASHBOARD_PANEL_BODY_CLASS,
  ADMIN_DASHBOARD_PANEL_CLASS,
  ADMIN_DASHBOARD_PANEL_HEADER_CLASS,
  ADMIN_DASHBOARD_PANEL_LINK_CLASS,
  ADMIN_DASHBOARD_PANEL_TITLE_CLASS,
  ADMIN_INQUIRY_AVATAR_CLASS,
  ADMIN_INQUIRY_COPY_CLASS,
  ADMIN_INQUIRY_EMPTY_CLASS,
  ADMIN_INQUIRY_EMPTY_HINT_CLASS,
  ADMIN_INQUIRY_EMPTY_ICON_CLASS,
  ADMIN_INQUIRY_EMPTY_TITLE_CLASS,
  ADMIN_INQUIRY_LIST_CLASS,
  ADMIN_INQUIRY_META_CLASS,
  ADMIN_INQUIRY_NAME_CLASS,
  ADMIN_INQUIRY_NAME_ROW_CLASS,
  ADMIN_INQUIRY_ROW_CLASS,
  ADMIN_INQUIRY_TIME_CLASS,
  ADMIN_STAT_ICON_SIZE_CLASS,
} from "@/features/admin/styles/admin-dashboard-classes";

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const WEEK_DAYS = 7;

type AdminLatestInquiriesProps = {
  readonly inquiries: readonly AdminContactInquiry[];
};

function inquiryInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  const initials = `${first}${last}`.toUpperCase();

  return initials || "?";
}

function formatRelativeTime(iso: string): string {
  const delta = Date.now() - new Date(iso).getTime();

  if (delta < MINUTE_MS) {
    return "Just now";
  }
  if (delta < HOUR_MS) {
    return `${Math.floor(delta / MINUTE_MS)}m ago`;
  }
  if (delta < DAY_MS) {
    return `${Math.floor(delta / HOUR_MS)}h ago`;
  }
  if (delta < WEEK_DAYS * DAY_MS) {
    return `${Math.floor(delta / DAY_MS)}d ago`;
  }

  return new Date(iso).toLocaleDateString();
}

function InquiryRow({ inquiry }: { readonly inquiry: AdminContactInquiry }) {
  const timestamp = new Date(inquiry.createdAt).toLocaleString();

  return (
    <li className={ADMIN_INQUIRY_ROW_CLASS}>
      <Avatar size="default">
        <AvatarFallback className={ADMIN_INQUIRY_AVATAR_CLASS}>
          {inquiryInitials(inquiry.name)}
        </AvatarFallback>
      </Avatar>
      <div className={ADMIN_INQUIRY_COPY_CLASS}>
        <div className={ADMIN_INQUIRY_NAME_ROW_CLASS}>
          <p className={ADMIN_INQUIRY_NAME_CLASS}>{inquiry.name}</p>
          <Badge variant="secondary">{inquiry.service}</Badge>
        </div>
        <p className={ADMIN_INQUIRY_META_CLASS}>{inquiry.email}</p>
      </div>
      <time className={ADMIN_INQUIRY_TIME_CLASS} dateTime={inquiry.createdAt} title={timestamp}>
        {formatRelativeTime(inquiry.createdAt)}
      </time>
    </li>
  );
}

export function AdminLatestInquiries({ inquiries }: AdminLatestInquiriesProps) {
  return (
    <motion.div variants={adminFadeUpItem}>
      <Card className={ADMIN_DASHBOARD_PANEL_CLASS}>
        <CardHeader className={ADMIN_DASHBOARD_PANEL_HEADER_CLASS}>
          <CardTitle className={ADMIN_DASHBOARD_PANEL_TITLE_CLASS}>Latest inquiries</CardTitle>
          <Link
            href={SUPERSUDO_PANEL_CONTACT_INQUIRIES_PATH}
            className={ADMIN_DASHBOARD_PANEL_LINK_CLASS}
          >
            View all
          </Link>
        </CardHeader>
        <Separator />
        <CardContent className={ADMIN_DASHBOARD_PANEL_BODY_CLASS}>
          {inquiries.length === 0 ? (
            <div className={ADMIN_INQUIRY_EMPTY_CLASS}>
              <span className={ADMIN_INQUIRY_EMPTY_ICON_CLASS}>
                <Mail className={ADMIN_STAT_ICON_SIZE_CLASS} aria-hidden />
              </span>
              <p className={ADMIN_INQUIRY_EMPTY_TITLE_CLASS}>No inquiries yet</p>
              <p className={ADMIN_INQUIRY_EMPTY_HINT_CLASS}>
                New contact form submissions will appear here.
              </p>
            </div>
          ) : (
            <ul className={ADMIN_INQUIRY_LIST_CLASS}>
              {inquiries.map((inquiry) => (
                <InquiryRow key={inquiry.id} inquiry={inquiry} />
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
