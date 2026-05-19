import Link from "next/link";
import type { ComponentProps } from "react";

const ACCENT_BUTTON_TEXT_CLASS = "text-sm font-semibold leading-snug";

/** shadcn-style accent CTA — matches design system reference. */
export const accentButtonClassName =
  `inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-button px-4 ${ACCENT_BUTTON_TEXT_CLASS} text-black shadow transition-colors bg-accent hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`;

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
