import Link from "next/link";
import { SolutionsRoleCard } from "@/features/solutions/components/SolutionsRoleCard";
import { SOLUTIONS_PAGE_COPY } from "@/features/solutions/content/solutionsPageCopy";
import {
  SOLUTIONS_PAGE_CTA,
  SOLUTIONS_ROLES,
} from "@/features/solutions/content/solutionsRolesCopy";
import { WHAT_WE_DO_CARD_GRID_GAP_CLASS } from "@/shared/lib/constants";

const SOLUTIONS_SECTION_CLASS = [
  "relative pb-8 sm:pb-10 lg:pb-12",
].join(" ");

const SOLUTIONS_ROLES_GRID_CLASS = `mt-10 grid grid-cols-1 items-start md:mt-14 md:grid-cols-2 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`;

const SOLUTIONS_HEADER_EYEBROW_CLASS =
  "text-sm font-bold tracking-[0.24em] text-[#A855F7] uppercase sm:text-base";

const SOLUTIONS_HEADER_TITLE_CLASS = [
  "mt-4 max-w-[20ch] font-extrabold tracking-tight text-[#07142F]",
  "text-[2.2rem] leading-[1.08] sm:text-[2.65rem] md:text-[3rem] lg:text-[3.3rem] xl:text-[3.8rem]",
].join(" ");

const SOLUTIONS_HEADER_SUBTITLE_CLASS =
  "mt-5 max-w-[48.75rem] text-base leading-relaxed text-[#5D5A7C] sm:text-lg lg:text-[1.35rem]";

const SOLUTIONS_CTA_CLASS = [
  "mt-10 inline-flex h-14 items-center justify-center gap-2.5 rounded-full px-9",
  "bg-[linear-gradient(90deg,#B855D4_0%,#8B2FB8_100%)] text-base font-semibold text-white",
  "shadow-[0_14px_38px_rgba(139,47,184,0.35)] transition-all duration-300",
  "hover:-translate-y-0.5 hover:shadow-[0_18px_46px_rgba(139,47,184,0.45)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B855D4]/35",
  "max-[430px]:w-full max-[430px]:px-6",
].join(" ");

export function SolutionsRolesSection() {
  const { label, href } = SOLUTIONS_PAGE_CTA;
  const { eyebrow, title, subtitleSegments } = SOLUTIONS_PAGE_COPY;
  const subtitle = subtitleSegments.map((segment) => segment.text).join("");

  return (
    <section className={SOLUTIONS_SECTION_CLASS} aria-labelledby="solutions-roles-heading">
      <div className="relative z-10">
        <header>
          <p className={SOLUTIONS_HEADER_EYEBROW_CLASS}>{eyebrow}</p>
          <h2 id="solutions-roles-heading" className={SOLUTIONS_HEADER_TITLE_CLASS}>
            {title}
          </h2>
          <p className={SOLUTIONS_HEADER_SUBTITLE_CLASS}>{subtitle}</p>
        </header>
        <ul className={SOLUTIONS_ROLES_GRID_CLASS}>
          {SOLUTIONS_ROLES.map((role) => (
            <li key={role.id} className="min-w-0">
              <SolutionsRoleCard role={role} />
            </li>
          ))}
        </ul>
        <Link href={href} className={SOLUTIONS_CTA_CLASS}>
          <span>{label}</span>
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 shrink-0"
            aria-hidden
          >
            <path d="M4 10h12" />
            <path d="m11 6 4 4-4 4" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
