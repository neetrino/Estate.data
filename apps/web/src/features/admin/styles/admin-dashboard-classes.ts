export const ADMIN_DASHBOARD_PAGE_CLASS =
  "relative space-y-6 rounded-2xl bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgba(135,60,131,0.07),transparent_55%),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(253,186,44,0.08),transparent_50%),linear-gradient(180deg,#f8f9fc_0%,#ffffff_48%)] p-1 sm:p-2";

export const ADMIN_DASHBOARD_HERO_CLASS =
  "relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-[#3a3d7a] to-brand-purple px-6 py-8 text-white shadow-[0_20px_50px_rgba(46,72,115,0.28)]";

export const ADMIN_DASHBOARD_HERO_DECOR_CLASS = "pointer-events-none absolute inset-0";

export const ADMIN_DASHBOARD_HERO_BLOB_PRIMARY_CLASS =
  "absolute -top-20 -right-16 size-64 rounded-full bg-brand-yellow/25 blur-2xl";

export const ADMIN_DASHBOARD_HERO_BLOB_SECONDARY_CLASS =
  "absolute -bottom-24 -left-12 size-52 rounded-full bg-white/15 blur-2xl";

export const ADMIN_DASHBOARD_HERO_BODY_CLASS =
  "relative z-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between";

export const ADMIN_DASHBOARD_HERO_EYEBROW_CLASS =
  "inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/90 uppercase backdrop-blur-sm";

export const ADMIN_DASHBOARD_HERO_TITLE_CLASS =
  "mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl";

export const ADMIN_DASHBOARD_HERO_SUBTITLE_CLASS =
  "mt-2 max-w-xl text-sm leading-relaxed text-white/75";

export const ADMIN_DASHBOARD_HERO_ACCENT_CLASS =
  "mt-4 h-1 w-16 rounded-full bg-brand-yellow shadow-[0_0_16px_rgba(253,186,44,0.55)]";

export const ADMIN_DASHBOARD_HERO_CTA_CLASS =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-yellow px-4 py-2.5 text-sm font-bold text-brand-navy shadow-md transition-colors hover:bg-white";

export const ADMIN_DASHBOARD_STATS_GRID_CLASS =
  "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

export const ADMIN_STAT_CARD_CLASS =
  "group relative block overflow-hidden rounded-2xl border-0 bg-card/95 p-0 shadow-[0_8px_30px_rgba(46,72,115,0.08)] ring-1 ring-brand-navy/8 transition-shadow hover:shadow-[0_16px_40px_rgba(46,72,115,0.14)]";

export const ADMIN_STAT_CARD_INNER_CLASS = "relative p-5";

export const ADMIN_STAT_CARD_ROW_CLASS = "flex items-start justify-between gap-3";

export const ADMIN_STAT_CARD_COPY_CLASS = "min-w-0";

export const ADMIN_STAT_CARD_LABEL_CLASS =
  "text-xs font-semibold tracking-wide text-muted-foreground uppercase";

export const ADMIN_STAT_CARD_VALUE_CLASS =
  "mt-2 font-display text-3xl font-bold tracking-tight text-brand-navy tabular-nums";

export const ADMIN_STAT_CARD_SUBLABEL_CLASS = "mt-1 text-xs text-muted-foreground";

export const ADMIN_STAT_ICON_WRAP_CLASS =
  "flex size-11 shrink-0 items-center justify-center rounded-xl";

export const ADMIN_STAT_ICON_SIZE_CLASS = "size-5";

export const ADMIN_STAT_ICON_TONE_CLASS = {
  purple: "bg-brand-purple/10 text-brand-purple",
  navy: "bg-brand-navy/10 text-brand-navy",
  cyan: "bg-brand-cyan/15 text-brand-navy",
  gold: "bg-brand-yellow/25 text-brand-navy",
  orange: "bg-brand-orange/10 text-brand-orange",
} as const;

export type AdminStatIconTone = keyof typeof ADMIN_STAT_ICON_TONE_CLASS;

export const ADMIN_DASHBOARD_PANELS_GRID_CLASS = "grid gap-6 lg:grid-cols-2";

export const ADMIN_DASHBOARD_PANEL_CLASS =
  "rounded-2xl border-0 bg-card/95 p-0 shadow-[0_8px_30px_rgba(46,72,115,0.08)] ring-1 ring-brand-navy/8";

export const ADMIN_DASHBOARD_PANEL_HEADER_CLASS =
  "mb-0 flex items-center justify-between gap-2 border-b border-brand-navy/6 px-5 py-4";

export const ADMIN_DASHBOARD_PANEL_TITLE_CLASS =
  "font-display text-base font-semibold tracking-tight text-brand-navy";

export const ADMIN_DASHBOARD_PANEL_LINK_CLASS =
  "rounded-full px-3 py-1 text-xs font-semibold text-brand-purple transition-colors hover:bg-brand-purple/10 hover:text-brand-navy";

export const ADMIN_DASHBOARD_PANEL_BODY_CLASS = "px-5 py-4";

export const ADMIN_QUICK_ACTION_LIST_CLASS = "space-y-2";

export const ADMIN_QUICK_ACTION_LINK_CLASS =
  "group flex items-center gap-3 rounded-xl border border-transparent bg-landing-surface/80 px-3 py-3 transition-all hover:border-brand-purple/20 hover:bg-brand-purple/5 hover:shadow-sm";

export const ADMIN_QUICK_ACTION_ICON_CLASS =
  "flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-purple shadow-sm ring-1 ring-brand-navy/6";

export const ADMIN_QUICK_ACTION_COPY_CLASS = "min-w-0";

export const ADMIN_QUICK_ACTION_LABEL_CLASS =
  "block text-sm font-semibold text-brand-navy";

export const ADMIN_QUICK_ACTION_HINT_CLASS = "block text-xs text-muted-foreground";

export const ADMIN_QUICK_ACTION_CHEVRON_CLASS =
  "ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-purple";

export const ADMIN_INQUIRY_LIST_CLASS = "divide-y divide-brand-navy/6";

export const ADMIN_INQUIRY_ROW_CLASS =
  "flex items-center gap-3 py-3 first:pt-0 last:pb-0";

export const ADMIN_INQUIRY_AVATAR_CLASS =
  "bg-brand-purple/12 text-xs font-bold text-brand-purple";

export const ADMIN_INQUIRY_COPY_CLASS = "min-w-0";

export const ADMIN_INQUIRY_NAME_CLASS = "text-sm font-semibold text-brand-navy";

export const ADMIN_INQUIRY_META_CLASS = "mt-0.5 truncate text-xs text-muted-foreground";

export const ADMIN_INQUIRY_TIME_CLASS =
  "ml-auto shrink-0 text-[11px] text-muted-foreground";

export const ADMIN_INQUIRY_NAME_ROW_CLASS = "flex flex-wrap items-center gap-2";

export const ADMIN_INQUIRY_EMPTY_CLASS =
  "flex flex-col items-center justify-center gap-2 py-10 text-center";

export const ADMIN_INQUIRY_EMPTY_ICON_CLASS =
  "flex size-12 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple";

export const ADMIN_INQUIRY_EMPTY_TITLE_CLASS = "text-sm font-medium text-brand-navy";

export const ADMIN_INQUIRY_EMPTY_HINT_CLASS = "text-xs text-muted-foreground";
