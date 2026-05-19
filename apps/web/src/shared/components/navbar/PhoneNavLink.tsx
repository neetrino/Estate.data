import { PhoneIcon } from "@/shared/components/navbar/PhoneIcon";
import { NAV_CTA_LINKS } from "@/shared/components/navbar/navConfig";
import { NAV_ITEM_TEXT_CLASS } from "@/shared/lib/constants";

type NavTone = "light" | "dark";

type PhoneNavLinkProps = {
  className?: string;
  tone?: NavTone;
  onNavigate?: () => void;
};

function phoneLinkClass(tone: NavTone): string {
  const base = `${NAV_ITEM_TEXT_CLASS} inline-flex items-center gap-2 transition-colors`;
  if (tone === "light") {
    return `${base} text-white hover:text-white/80`;
  }
  return `${base} text-black hover:text-black/80`;
}

function phoneIconClass(tone: NavTone): string {
  const base = "size-6 shrink-0";
  return tone === "light" ? `${base} text-white` : `${base} text-black`;
}

export function PhoneNavLink({
  className,
  tone = "dark",
  onNavigate,
}: PhoneNavLinkProps) {
  const mergedClassName = className
    ? `${phoneLinkClass(tone)} ${className}`
    : phoneLinkClass(tone);

  return (
    <a
      href={NAV_CTA_LINKS.phone.href}
      className={mergedClassName}
      onClick={onNavigate}
    >
      <PhoneIcon className={phoneIconClass(tone)} />
      {NAV_CTA_LINKS.phone.label}
    </a>
  );
}
