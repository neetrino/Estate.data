import { SolutionsDeliverableIcon } from "@/features/solutions/components/SolutionsDeliverableIcon";
import { SolutionsRoleIcon } from "@/features/solutions/components/SolutionsRoleIcon";
import type { SolutionsRole } from "@/features/solutions/content/solutionsRolesCopy";
import { getSolutionsDeliverableIconColorClass } from "@/shared/lib/constants";

const SOLUTIONS_ROLE_CARD_CLASS = [
  "group relative flex w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/75",
  "bg-[rgba(255,255,255,0.78)] px-7 py-8 text-left backdrop-blur-[18px] sm:px-9 sm:py-9",
  "shadow-[0_24px_70px_rgba(31,41,55,0.1)] transition-all duration-300",
  "hover:-translate-y-1 hover:border-[#D9BEFA] hover:shadow-[0_30px_80px_rgba(139,47,184,0.2)]",
].join(" ");

const SOLUTIONS_ROLE_HEADER_CLASS = "flex items-start gap-4";

const SOLUTIONS_ROLE_TITLE_CLASS = "text-[1.65rem] font-bold leading-tight text-[#8B2FB8] sm:text-[1.8rem]";

const SOLUTIONS_ROLE_DESCRIPTION_CLASS = "mt-5 text-base leading-relaxed text-[#5E617A] sm:text-[1.06rem]";

const SOLUTIONS_ROLE_DIVIDER_CLASS = "mt-6 border-t border-slate-900/8";

const SOLUTIONS_ROLE_FOOTER_CLASS = "mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between";

const SOLUTIONS_ROLE_DELIVERABLES_LABEL_CLASS =
  "text-[0.72rem] font-bold tracking-[0.18em] text-[#798097] uppercase";

const SOLUTIONS_ROLE_DELIVERABLES_LIST_BASE_CLASS =
  "mt-3 flex w-full flex-wrap items-stretch gap-3 sm:flex-nowrap sm:gap-0";

const SOLUTIONS_ROLE_DELIVERABLE_ITEM_CLASS = [
  "flex min-w-[4.4rem] flex-col items-center gap-2 px-2 text-center sm:min-w-0 sm:flex-1 sm:px-2.5",
  "sm:border-r sm:border-slate-900/10 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0",
].join(" ");

const SOLUTIONS_ROLE_DELIVERABLE_LABEL_CLASS =
  "w-full text-[0.68rem] font-bold leading-tight text-[#36415F] sm:text-[0.71rem]";

const SOLUTIONS_ROLE_PRICE_BOX_CLASS = [
  "flex shrink-0 flex-col justify-center rounded-2xl border border-[#E7D8FA]",
  "bg-[rgba(168,85,247,0.08)] px-5 py-4 text-left lg:min-w-[9.2rem]",
].join(" ");

const SOLUTIONS_ROLE_PRICE_LABEL_CLASS =
  "text-[0.66rem] font-bold tracking-[0.16em] text-[#757B92] uppercase";

const SOLUTIONS_ROLE_PRICE_CLASS = "mt-1 text-[1.7rem] font-bold leading-none text-[#8B2FB8] sm:text-[1.92rem]";

type SolutionsRoleCardProps = {
  role: SolutionsRole;
};

export function SolutionsRoleCard({ role }: SolutionsRoleCardProps) {
  return (
    <article className={SOLUTIONS_ROLE_CARD_CLASS}>
      <div className={SOLUTIONS_ROLE_HEADER_CLASS}>
        <SolutionsRoleIcon icon={role.icon} />
        <div className="min-w-0 pt-1">
          <h3 className={SOLUTIONS_ROLE_TITLE_CLASS}>{role.title}</h3>
        </div>
      </div>
      <p className={SOLUTIONS_ROLE_DESCRIPTION_CLASS}>{role.description}</p>
      <hr className={SOLUTIONS_ROLE_DIVIDER_CLASS} />
      <div className={SOLUTIONS_ROLE_FOOTER_CLASS}>
        <div className="min-w-0 flex-1">
          <p className={SOLUTIONS_ROLE_DELIVERABLES_LABEL_CLASS}>{role.deliverablesLabel}</p>
          <ul className={SOLUTIONS_ROLE_DELIVERABLES_LIST_BASE_CLASS}>
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
