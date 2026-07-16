import Link from "next/link";
import {
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
} from "@/shared/lib/constants";

type NavBookShootCtaProps = {
  href: string;
  label: string;
  useFigmaHomeDesktopStyle?: boolean;
};

export function NavBookShootCta({
  href,
  label,
  useFigmaHomeDesktopStyle = false,
}: NavBookShootCtaProps) {
  if (useFigmaHomeDesktopStyle) {
    return (
      <Link
        href={href}
        className="inline-flex h-8 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d487c0] to-[#9c69e2] px-6 text-[12px] font-bold uppercase tracking-[1.2px] text-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60"
      >
        <span>{label}</span>
        <span aria-hidden className="text-[18px] leading-none">
          →
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={[
        "inline-flex h-10 items-center justify-center rounded-full px-5",
        "text-sm font-semibold",
        LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
        LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/60",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
