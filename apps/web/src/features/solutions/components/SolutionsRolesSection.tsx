import Link from "next/link";
import { SolutionsRoleCard } from "@/features/solutions/components/SolutionsRoleCard";
import {
  SOLUTIONS_PAGE_CTA,
  SOLUTIONS_ROLES,
} from "@/features/solutions/content/solutionsRolesCopy";
import { WHAT_WE_DO_CARD_GRID_GAP_CLASS } from "@/shared/lib/constants";

const SOLUTIONS_ROLES_GRID_CLASS = `mt-14 grid grid-cols-1 items-start md:grid-cols-2 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`;

const SOLUTIONS_ROLES_CTA_CLASS =
  "mt-10 inline-flex h-12 items-center justify-center rounded-button bg-client-voices-accent px-8 text-base font-semibold text-white shadow transition-colors hover:bg-home-listing-cta-book hover:text-home-listing-cta-book-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function SolutionsRolesSection() {
  const { label, href } = SOLUTIONS_PAGE_CTA;

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20" aria-labelledby="solutions-roles-heading">
      <h2 id="solutions-roles-heading" className="sr-only">
        Solutions by role
      </h2>
      <ul className={SOLUTIONS_ROLES_GRID_CLASS}>
        {SOLUTIONS_ROLES.map((role) => (
          <li key={role.id} className="min-w-0">
            <SolutionsRoleCard role={role} />
          </li>
        ))}
      </ul>
      <Link href={href} className={SOLUTIONS_ROLES_CTA_CLASS}>
        {label}
      </Link>
    </section>
  );
}
