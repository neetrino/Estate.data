import { SolutionsRevealListItem } from "@/features/solutions/components/SolutionsRevealListItem";
import { SolutionsRoleCard } from "@/features/solutions/components/SolutionsRoleCard";
import { SOLUTIONS_PAGE_COPY } from "@/features/solutions/content/solutionsPageCopy";
import {
  SOLUTIONS_PAGE_CTA,
  SOLUTIONS_ROLES,
} from "@/features/solutions/content/solutionsRolesCopy";
import {
  ESTATE_PILL_CONTENT_WIDTH_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
  WHAT_WE_DO_CARD_GRID_GAP_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";
import "@/features/solutions/styles/solutions-roles-section.css";

const SOLUTIONS_SECTION_CLASS = [
  "relative pb-8 sm:pb-10 lg:pb-12",
].join(" ");

const SOLUTIONS_ROLES_GRID_CLASS = `mt-10 grid grid-cols-1 items-start md:mt-14 md:grid-cols-2 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`;

const SOLUTIONS_HEADER_EYEBROW_CLASS =
  "text-sm font-bold tracking-[0.24em] text-[#A855F7] uppercase sm:text-base";

const SOLUTIONS_HEADER_TITLE_CLASS = [
  "mt-4 max-w-[20ch] font-extrabold tracking-tight text-[#2E4873] lg:max-w-none lg:whitespace-nowrap",
  "text-3xl leading-[1.08] sm:text-4xl md:text-5xl lg:text-[3rem]",
].join(" ");

const SOLUTIONS_HEADER_SUBTITLE_CLASS =
  "mt-5 max-w-[48.75rem] text-base leading-relaxed text-[#5D5A7C] sm:text-lg lg:text-[1.35rem]";

const SOLUTIONS_CTA_CLASS = [
  "mt-8",
  "relative z-20",
  ESTATE_PILL_CONTENT_WIDTH_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
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
          {SOLUTIONS_ROLES.map((role, index) => (
            <SolutionsRevealListItem key={role.id} index={index}>
              <SolutionsRoleCard role={role} />
            </SolutionsRevealListItem>
          ))}
        </ul>
        <EstatePillButtonLink href={href} className={SOLUTIONS_CTA_CLASS}>
          {label}
        </EstatePillButtonLink>
      </div>
    </section>
  );
}
