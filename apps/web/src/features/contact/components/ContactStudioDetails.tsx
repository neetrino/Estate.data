import Link from "next/link";
import { ContactStudioIcon } from "@/features/contact/components/ContactStudioIcon";
import { CONTACT_STUDIO_LINK_CLASS } from "@/shared/lib/constants";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";

const CONTACT_STUDIO_ROW_CLASS = "flex items-start gap-4";

const CONTACT_STUDIO_LABEL_CLASS = "text-sm font-semibold text-[#8B2FB8] sm:text-base";

const CONTACT_STUDIO_TEXT_CLASS =
  "mt-1 text-base leading-relaxed text-black transition-colors hover:text-[#8B2FB8] sm:text-lg";

const CONTACT_STUDIO_LINK_ACCENT_CLASS =
  `${CONTACT_STUDIO_LINK_CLASS} text-black hover:text-[#8B2FB8]`;

export function ContactStudioDetails() {
  const { address, phone, email } = STUDIO_CONTACT;

  return (
    <ul
      className="flex shrink-0 flex-col gap-6 sm:gap-8"
      aria-label="Studio contact"
    >
      <li className={CONTACT_STUDIO_ROW_CLASS}>
        <ContactStudioIcon kind="location" label="Address" />
        <div className="min-w-0">
          <p className={CONTACT_STUDIO_LABEL_CLASS}>Address</p>
          <p className={CONTACT_STUDIO_TEXT_CLASS}>{address}</p>
        </div>
      </li>
      <li className={CONTACT_STUDIO_ROW_CLASS}>
        <ContactStudioIcon kind="phone" label="Phone" />
        <div className="min-w-0">
          <p className={CONTACT_STUDIO_LABEL_CLASS}>Phone</p>
          <Link href={phone.href} className={CONTACT_STUDIO_LINK_ACCENT_CLASS}>
            {phone.label}
          </Link>
        </div>
      </li>
      <li className={CONTACT_STUDIO_ROW_CLASS}>
        <ContactStudioIcon kind="email" label="Email" />
        <div className="min-w-0">
          <p className={CONTACT_STUDIO_LABEL_CLASS}>Email</p>
          <Link href={email.href} className={CONTACT_STUDIO_LINK_ACCENT_CLASS}>
            {email.label}
          </Link>
        </div>
      </li>
    </ul>
  );
}
