import Link from "next/link";
import {
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
} from "@/shared/lib/constants";

type NavBookShootCtaProps = {
  href: string;
  label: string;
};

export function NavBookShootCta({ href, label }: NavBookShootCtaProps) {
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
