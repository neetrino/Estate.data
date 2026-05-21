import Link from "next/link";
import type { ComponentProps } from "react";
import {
  ESTATE_CTA_BUTTON_CLASS,
  ESTATE_CTA_BUTTON_PADDING_CLASS,
  ESTATE_CTA_ICON_DISC_OFFSET_CLASS,
  ESTATE_CTA_LABEL_OFFSET_CLASS,
} from "@/shared/lib/constants";

const ACCENT_BUTTON_TEXT_CLASS = "text-sm font-semibold leading-snug";

const ESTATE_PILL_BUTTON_TEXT_CLASS = "text-sm font-bold leading-6 sm:text-base";

/** Estate.data pill CTA — purple surface, icon disc + arrow (Figma 305:2096, compact). */
export const estatePillButtonClassName = [
  ESTATE_CTA_BUTTON_CLASS,
  "inline-flex max-w-full items-center gap-2 whitespace-nowrap",
  "bg-estate-cta text-estate-cta-foreground",
  ESTATE_CTA_BUTTON_PADDING_CLASS,
  "cursor-pointer transition-opacity hover:opacity-90",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ESTATE_PILL_BUTTON_TEXT_CLASS,
].join(" ");

const ESTATE_CTA_ICON_DISC_CLASS =
  "flex size-9 shrink-0 items-center justify-center rounded-full bg-estate-cta-icon-surface text-estate-cta-icon-foreground";

/** shadcn-style accent CTA — matches design system reference. */
export const accentButtonClassName =
  `inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-button px-4 ${ACCENT_BUTTON_TEXT_CLASS} text-black shadow transition-colors bg-accent hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`;

/** Navbar “Book a Shoot” — #C364BE (`--accent`), white label. */
export const navbarBookShootButtonClassName =
  `inline-flex h-9 cursor-pointer items-center justify-center whitespace-nowrap rounded-button px-5 ${ACCENT_BUTTON_TEXT_CLASS} font-semibold text-white shadow bg-accent transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`;

/** Light landing — purple outline secondary (hero, sections on white). */
export const landingOutlineButtonClassName = [
  "inline-flex h-12 cursor-pointer items-center justify-center gap-1 whitespace-nowrap",
  "rounded-[15px] border-2 border-brand-purple/30 bg-white px-6",
  "text-sm font-semibold text-brand-purple sm:text-base",
  "transition-colors hover:border-brand-purple hover:bg-brand-purple/5",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-light",
].join(" ");

/** Light landing — yellow primary on purple gradient panel. */
export const landingGradientPrimaryButtonClassName = [
  "inline-flex h-12 cursor-pointer items-center justify-center whitespace-nowrap",
  "rounded-[15px] bg-brand-yellow px-6 text-sm font-bold text-brand-navy shadow-md sm:text-base",
  "transition-opacity hover:opacity-90",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow",
].join(" ");

/** Light landing — white outline on purple gradient panel. */
export const landingGradientOutlineButtonClassName = [
  "inline-flex h-12 cursor-pointer items-center justify-center whitespace-nowrap",
  "rounded-[15px] border-2 border-white/70 px-6",
  "text-sm font-semibold text-white sm:text-base",
  "transition-colors hover:bg-white/10",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
].join(" ");

const ESTATE_PILL_FULL_WIDTH_CLASS = "w-full max-w-full sm:w-auto";

const CLIENT_VOICES_BUTTON_TEXT_CLASS = "text-base font-semibold leading-snug";

/** Orange CTA — `client-voices-accent` (contact form submit). */
export const clientVoicesButtonClassName =
  `inline-flex h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-button px-8 ${CLIENT_VOICES_BUTTON_TEXT_CLASS} text-white shadow transition-colors bg-client-voices-accent hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`;

type ButtonLinkProps = ComponentProps<typeof Link> & {
  /** Show trailing arrow (hero CTA). Navbar uses `false`. */
  showArrow?: boolean;
};

export function AccentButtonLink({
  className,
  children,
  showArrow = true,
  ...props
}: ButtonLinkProps) {
  const mergedClassName = className
    ? `${accentButtonClassName} ${className}`
    : accentButtonClassName;

  return (
    <Link className={mergedClassName} {...props}>
      {children}
      {showArrow ? <CtaArrowIcon /> : null}
    </Link>
  );
}

function CtaArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

type EstatePillButtonLinkProps = ComponentProps<typeof Link> & {
  /** Stretch pill on mobile; auto width from sm+. */
  fullWidth?: boolean;
};

export function EstatePillButtonLink({
  className,
  children,
  fullWidth = false,
  ...props
}: EstatePillButtonLinkProps) {
  const widthClass = fullWidth ? ESTATE_PILL_FULL_WIDTH_CLASS : "";
  const mergedClassName = [estatePillButtonClassName, widthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={mergedClassName} {...props}>
      <span className={ESTATE_CTA_LABEL_OFFSET_CLASS}>{children}</span>
      <span
        className={`${ESTATE_CTA_ICON_DISC_CLASS} ${ESTATE_CTA_ICON_DISC_OFFSET_CLASS}`}
        aria-hidden
      >
        <EstatePillArrowIcon />
      </span>
    </Link>
  );
}

type LandingOutlineButtonLinkProps = ComponentProps<typeof Link> & {
  showArrow?: boolean;
  fullWidth?: boolean;
};

export function LandingOutlineButtonLink({
  className,
  children,
  showArrow = true,
  fullWidth = false,
  ...props
}: LandingOutlineButtonLinkProps) {
  const widthClass = fullWidth ? ESTATE_PILL_FULL_WIDTH_CLASS : "";
  const mergedClassName = [landingOutlineButtonClassName, widthClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={mergedClassName} {...props}>
      {children}
      {showArrow ? <span aria-hidden>→</span> : null}
    </Link>
  );
}

type LandingGradientButtonLinkProps = ComponentProps<typeof Link> & {
  fullWidth?: boolean;
};

export function LandingGradientPrimaryButtonLink({
  className,
  children,
  fullWidth = false,
  ...props
}: LandingGradientButtonLinkProps) {
  const widthClass = fullWidth ? ESTATE_PILL_FULL_WIDTH_CLASS : "";
  const mergedClassName = [landingGradientPrimaryButtonClassName, widthClass, className]
    .filter(Boolean)
    .join(" ");

  return <Link className={mergedClassName} {...props}>{children}</Link>;
}

export function LandingGradientOutlineButtonLink({
  className,
  children,
  fullWidth = false,
  ...props
}: LandingGradientButtonLinkProps) {
  const widthClass = fullWidth ? ESTATE_PILL_FULL_WIDTH_CLASS : "";
  const mergedClassName = [landingGradientOutlineButtonClassName, widthClass, className]
    .filter(Boolean)
    .join(" ");

  return <Link className={mergedClassName} {...props}>{children}</Link>;
}

/** Diagonal arrow in the icon disc (Figma 305:2100, −45°). */
function EstatePillArrowIcon() {
  return (
    <svg
      className="size-4"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 13 13 3" />
      <path d="M6 3h7v7" />
    </svg>
  );
}
