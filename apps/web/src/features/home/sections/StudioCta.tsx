import type { ReactNode } from "react";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";

export type StudioCtaVariant = "solid" | "outline" | "ghost";

const CTA_BASE_CLASS = [
  "group inline-flex items-center justify-center gap-3 px-7 py-4",
  "text-[0.7rem] font-semibold uppercase tracking-[0.22em]",
  "transition-all duration-500",
].join(" ");

const CTA_VARIANT_CLASS: Record<StudioCtaVariant, string> = {
  solid: "bg-studio-accent text-studio-accent-fg hover:bg-studio-accent/85",
  outline:
    "border border-studio-border text-studio-fg hover:border-studio-accent hover:text-studio-accent",
  ghost: "text-studio-muted hover:text-studio-fg",
};

const CTA_ARROW_CLASS = "inline-block transition-transform duration-500 group-hover:translate-x-1";

type StudioCtaProps = {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: StudioCtaVariant;
  readonly className?: string;
  readonly onNavigate?: () => void;
};

/** Section call to action — arrow slides right on hover. */
export function StudioCta({
  href,
  children,
  variant = "solid",
  className = "",
  onNavigate,
}: StudioCtaProps) {
  return (
    <HomeSectionLink
      href={href}
      onNavigate={onNavigate}
      className={`${CTA_BASE_CLASS} ${CTA_VARIANT_CLASS[variant]} ${className}`.trim()}
    >
      {children}
      <span aria-hidden className={CTA_ARROW_CLASS}>
        →
      </span>
    </HomeSectionLink>
  );
}
