import { SolutionsRoleIcon } from "@/features/solutions/components/SolutionsRoleIcon";
import type { SolutionsRole } from "@/features/solutions/content/solutionsRolesCopy";
import { SOLUTIONS_ROLE_CARD_SHELL_CLASS } from "@/shared/lib/constants";

const SOLUTIONS_ROLE_CARD_CLASS =
  "relative flex w-full flex-col overflow-hidden px-6 py-5 text-left sm:px-7 sm:py-6";

const SOLUTIONS_ROLE_HEADER_CLASS = "flex items-center gap-3";

const SOLUTIONS_ROLE_TITLE_CLASS = "text-lg font-bold text-property-intelligence-navy";

const SOLUTIONS_ROLE_DESCRIPTION_CLASS =
  "mt-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base";

const SOLUTIONS_ROLE_META_GRID_CLASS = "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-end";

const SOLUTIONS_ROLE_META_LABEL_CLASS = "text-xs font-medium text-muted-foreground sm:text-sm";

const SOLUTIONS_ROLE_DELIVERABLES_CLASS =
  "mt-0.5 text-sm leading-snug text-property-intelligence-navy sm:text-base";

const SOLUTIONS_ROLE_PRICE_CLASS = "mt-0.5 text-xl font-bold text-home-listing-cta-book sm:text-2xl";

type SolutionsRoleCardProps = {
  role: SolutionsRole;
};

export function SolutionsRoleCard({ role }: SolutionsRoleCardProps) {
  return (
    <article className={`${SOLUTIONS_ROLE_CARD_SHELL_CLASS} ${SOLUTIONS_ROLE_CARD_CLASS}`}>
      <div className={SOLUTIONS_ROLE_HEADER_CLASS}>
        <SolutionsRoleIcon icon={role.icon} />
        <h3 className={SOLUTIONS_ROLE_TITLE_CLASS}>{role.title}</h3>
      </div>
      <p className={SOLUTIONS_ROLE_DESCRIPTION_CLASS}>{role.description}</p>
      <div className={SOLUTIONS_ROLE_META_GRID_CLASS}>
        <div>
          <p className={SOLUTIONS_ROLE_META_LABEL_CLASS}>{role.deliverablesLabel}</p>
          <p className={SOLUTIONS_ROLE_DELIVERABLES_CLASS}>{role.deliverables}</p>
        </div>
        <div>
          <p className={SOLUTIONS_ROLE_META_LABEL_CLASS}>{role.priceLabel}</p>
          <p className={SOLUTIONS_ROLE_PRICE_CLASS}>{role.price}</p>
        </div>
      </div>
    </article>
  );
}
