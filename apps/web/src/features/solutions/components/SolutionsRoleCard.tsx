import { SolutionsDeliverableIcon } from "@/features/solutions/components/SolutionsDeliverableIcon";
import { SolutionsRoleIcon } from "@/features/solutions/components/SolutionsRoleIcon";
import type { SolutionsRole } from "@/features/solutions/content/solutionsRolesCopy";
import {
  SOLUTIONS_ROLE_CARD_SHELL_CLASS,
  SOLUTIONS_ROLE_DELIVERABLES_LABEL_CLASS,
  SOLUTIONS_ROLE_DELIVERABLES_LIST_OFFSET_CLASS,
  SOLUTIONS_ROLE_DELIVERABLES_LIST_OFFSET_RIGHT_CLASS,
  SOLUTIONS_ROLE_DELIVERABLES_OFFSET_RIGHT_ROLE_ID,
  getSolutionsDeliverableIconColorClass,
  SOLUTIONS_ROLE_PRICE_BOX_CLASS,
  SOLUTIONS_ROLE_PRICE_CLASS,
  SOLUTIONS_ROLE_PRICE_LABEL_CLASS,
  SOLUTIONS_ROLE_TITLE_ACCENT_CLASS,
  SOLUTIONS_ROLE_TITLE_CLASS,
} from "@/shared/lib/constants";

const SOLUTIONS_ROLE_CARD_CLASS =
  "relative flex w-full flex-col overflow-hidden px-7 py-7 text-left sm:px-9 sm:py-8";

const SOLUTIONS_ROLE_HEADER_CLASS = "flex items-start gap-4";

const SOLUTIONS_ROLE_DESCRIPTION_CLASS =
  "mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base";

const SOLUTIONS_ROLE_DIVIDER_CLASS = "mt-6 border-t border-foreground/10";

const SOLUTIONS_ROLE_FOOTER_CLASS =
  "mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between";

const SOLUTIONS_ROLE_DELIVERABLES_LIST_BASE_CLASS =
  "mt-3 flex w-full flex-nowrap items-start justify-between gap-0";

const SOLUTIONS_ROLE_DELIVERABLE_ITEM_CLASS =
  "flex min-w-0 flex-1 flex-col items-center gap-1 border-l border-foreground/10 px-1 text-center first:border-l-0 first:pl-0 last:pr-0 sm:px-1.5";

const SOLUTIONS_ROLE_DELIVERABLE_LABEL_CLASS =
  "line-clamp-2 w-full text-[0.58rem] font-bold leading-tight text-foreground sm:text-[0.65rem]";

type SolutionsRoleCardProps = {
  role: SolutionsRole;
};

function buildDeliverablesListClass(roleId: string): string {
  const offsetRightClass =
    roleId === SOLUTIONS_ROLE_DELIVERABLES_OFFSET_RIGHT_ROLE_ID
      ? SOLUTIONS_ROLE_DELIVERABLES_LIST_OFFSET_RIGHT_CLASS
      : "";

  return [
    SOLUTIONS_ROLE_DELIVERABLES_LIST_BASE_CLASS,
    SOLUTIONS_ROLE_DELIVERABLES_LIST_OFFSET_CLASS,
    offsetRightClass,
  ]
    .filter(Boolean)
    .join(" ");
}

export function SolutionsRoleCard({ role }: SolutionsRoleCardProps) {
  const deliverablesListClass = buildDeliverablesListClass(role.id);

  return (
    <article className={`${SOLUTIONS_ROLE_CARD_SHELL_CLASS} ${SOLUTIONS_ROLE_CARD_CLASS}`}>
      <div className={SOLUTIONS_ROLE_HEADER_CLASS}>
        <SolutionsRoleIcon icon={role.icon} />
        <div className="min-w-0 pt-0.5">
          <h3 className={SOLUTIONS_ROLE_TITLE_CLASS}>{role.title}</h3>
          <span className={SOLUTIONS_ROLE_TITLE_ACCENT_CLASS} aria-hidden />
        </div>
      </div>
      <p className={SOLUTIONS_ROLE_DESCRIPTION_CLASS}>{role.description}</p>
      <hr className={SOLUTIONS_ROLE_DIVIDER_CLASS} />
      <div className={SOLUTIONS_ROLE_FOOTER_CLASS}>
        <div className="min-w-0 flex-1">
          <p className={SOLUTIONS_ROLE_DELIVERABLES_LABEL_CLASS}>{role.deliverablesLabel}</p>
          <ul className={deliverablesListClass}>
            {role.deliverables.map((deliverable, index) => (
              <li key={`${role.id}-${deliverable.icon}`} className={SOLUTIONS_ROLE_DELIVERABLE_ITEM_CLASS}>
                <SolutionsDeliverableIcon
                  icon={deliverable.icon}
                  colorClass={getSolutionsDeliverableIconColorClass(index)}
                />
                <span className={SOLUTIONS_ROLE_DELIVERABLE_LABEL_CLASS}>{deliverable.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={SOLUTIONS_ROLE_PRICE_BOX_CLASS}>
          <p className={SOLUTIONS_ROLE_PRICE_LABEL_CLASS}>{role.priceLabel}</p>
          <p className={SOLUTIONS_ROLE_PRICE_CLASS}>{role.price}</p>
        </div>
      </div>
    </article>
  );
}
