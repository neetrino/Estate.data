import Link from "next/link";
import { FOOTER_STUDIO } from "@/shared/components/footer/footerConfig";

const FOOTER_COLUMN_TITLE_CLASS = "text-base font-bold text-foreground";

const FOOTER_STUDIO_TEXT_CLASS = "text-sm text-muted-foreground";

const FOOTER_STUDIO_LINK_CLASS =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function FooterStudioColumn() {
  const { address, phone, email } = FOOTER_STUDIO;

  return (
    <div className="shrink-0">
      <h3 className={FOOTER_COLUMN_TITLE_CLASS}>Studio</h3>
      <ul className="mt-4 space-y-2.5">
        <li className={FOOTER_STUDIO_TEXT_CLASS}>{address}</li>
        <li>
          <Link href={phone.href} className={FOOTER_STUDIO_LINK_CLASS}>
            {phone.label}
          </Link>
        </li>
        <li>
          <Link href={email.href} className={FOOTER_STUDIO_LINK_CLASS}>
            {email.label}
          </Link>
        </li>
      </ul>
    </div>
  );
}
