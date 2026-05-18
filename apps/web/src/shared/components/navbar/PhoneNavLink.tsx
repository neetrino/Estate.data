import { PhoneIcon } from "@/shared/components/navbar/PhoneIcon";
import { NAV_CTA_LINKS } from "@/shared/components/navbar/navConfig";
import { NAV_ITEM_TEXT_CLASS } from "@/shared/lib/constants";

const PHONE_LINK_CLASS = `${NAV_ITEM_TEXT_CLASS} inline-flex items-center gap-2 text-zinc-800 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300`;

type PhoneNavLinkProps = {
  className?: string;
  onNavigate?: () => void;
};

export function PhoneNavLink({ className, onNavigate }: PhoneNavLinkProps) {
  const mergedClassName = className
    ? `${PHONE_LINK_CLASS} ${className}`
    : PHONE_LINK_CLASS;

  return (
    <a
      href={NAV_CTA_LINKS.phone.href}
      className={mergedClassName}
      onClick={onNavigate}
    >
      <PhoneIcon className="size-4 shrink-0 text-zinc-600 dark:text-zinc-400" />
      {NAV_CTA_LINKS.phone.label}
    </a>
  );
}
