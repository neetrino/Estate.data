import Link from "next/link";
import { SolutionsRoleCard } from "@/features/solutions/components/SolutionsRoleCard";
import {
  SOLUTIONS_PAGE_CTA,
  SOLUTIONS_ROLES,
} from "@/features/solutions/content/solutionsRolesCopy";
import { SOLUTIONS_PAGE_CTA_CLASS, WHAT_WE_DO_CARD_GRID_GAP_CLASS } from "@/shared/lib/constants";

const SOLUTIONS_ROLES_GRID_CLASS = `mt-14 grid grid-cols-1 items-start md:grid-cols-2 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`;

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
      <Link href={href} className={SOLUTIONS_PAGE_CTA_CLASS}>
        {label}
      </Link>
    </section>
  );
}
