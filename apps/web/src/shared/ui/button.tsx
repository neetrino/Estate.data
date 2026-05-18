import Link from "next/link";
import type { ComponentProps } from "react";
const ACCENT_BUTTON_TEXT_CLASS = "text-sm font-semibold leading-snug";

/** shadcn-style accent CTA — matches design system reference. */
export const accentButtonClassName =
  `inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-button px-4 ${ACCENT_BUTTON_TEXT_CLASS} text-black shadow transition-colors bg-accent hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`;

type ButtonLinkProps = ComponentProps<typeof Link>;

export function AccentButtonLink({
  className,
  ...props
}: ButtonLinkProps) {
  const mergedClassName = className
    ? `${accentButtonClassName} ${className}`
    : accentButtonClassName;

  return <Link className={mergedClassName} {...props} />;
}
