import Link from "next/link";
import { ContactStudioIcon } from "@/features/contact/components/ContactStudioIcon";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";

const CONTACT_STUDIO_ROW_CLASS = "flex items-center gap-4";

const CONTACT_STUDIO_TEXT_CLASS = "text-base leading-relaxed text-black sm:text-lg";

const CONTACT_STUDIO_LINK_CLASS =
  "text-base leading-relaxed text-black transition-colors hover:text-client-voices-accent sm:text-lg";

export function ContactStudioDetails() {
  const { address, phone, email } = STUDIO_CONTACT;

  return (
    <ul
      className="flex shrink-0 flex-col gap-6 sm:gap-8"
      aria-label="Studio contact"
    >
      <li className={CONTACT_STUDIO_ROW_CLASS}>
        <ContactStudioIcon kind="location" label="Address" />
        <p className={CONTACT_STUDIO_TEXT_CLASS}>{address}</p>
      </li>
      <li className={CONTACT_STUDIO_ROW_CLASS}>
        <ContactStudioIcon kind="phone" label="Phone" />
        <Link href={phone.href} className={CONTACT_STUDIO_LINK_CLASS}>
          {phone.label}
        </Link>
      </li>
      <li className={CONTACT_STUDIO_ROW_CLASS}>
        <ContactStudioIcon kind="email" label="Email" />
        <Link href={email.href} className={CONTACT_STUDIO_LINK_CLASS}>
          {email.label}
        </Link>
      </li>
    </ul>
  );
}
