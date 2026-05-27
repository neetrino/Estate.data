import Link from "next/link";

import { FooterContactIcon } from "@/shared/components/footer/FooterContactIcon";
import { STUDIO_MAPS_HREF } from "@/shared/components/footer/footerContactIconConfig";
import { FOOTER_STUDIO } from "@/shared/components/footer/footerConfig";
import { FOOTER_COLUMN_TITLE_CLASS, FOOTER_LINK_CLASS } from "@/shared/lib/constants";

const FOOTER_STUDIO_ROW_CLASS = "footer-studio-contact-row";

export function FooterStudioColumn() {
  const { address, phone, email } = FOOTER_STUDIO;

  return (
    <div className="shrink-0">
      <h3 className={FOOTER_COLUMN_TITLE_CLASS}>Studio</h3>
      <ul className="footer-studio-contact-list mt-4 space-y-2.5">
        <li className={FOOTER_STUDIO_ROW_CLASS}>
          <FooterContactIcon id="location" />
          <Link
            href={STUDIO_MAPS_HREF}
            className={FOOTER_LINK_CLASS}
            target="_blank"
            rel="noopener noreferrer"
          >
            {address}
          </Link>
        </li>
        <li className={FOOTER_STUDIO_ROW_CLASS}>
          <FooterContactIcon id="phone" />
          <Link href={phone.href} className={FOOTER_LINK_CLASS}>
            {phone.label}
          </Link>
        </li>
        <li className={FOOTER_STUDIO_ROW_CLASS}>
          <FooterContactIcon id="email" />
          <Link href={email.href} className={FOOTER_LINK_CLASS}>
            {email.label}
          </Link>
        </li>
      </ul>
    </div>
  );
}
