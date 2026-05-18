import { PhoneIcon } from "@/shared/components/navbar/PhoneIcon";
import { NAV_CTA_LINKS } from "@/shared/components/navbar/navConfig";
import { NAV_ITEM_TEXT_CLASS } from "@/shared/lib/constants";

const PHONE_ICON_CLASS = "size-6 shrink-0 text-black";

const PHONE_LINK_CLASS = `${NAV_ITEM_TEXT_CLASS} inline-flex items-center gap-2 text-black transition-colors hover:text-black/80`;

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
      <PhoneIcon className={PHONE_ICON_CLASS} />
      {NAV_CTA_LINKS.phone.label}
    </a>
  );
}
