import type { ContactMarketingCopy } from "@/server/features/site-copy/site-copy.schema";

const SOCIAL_LINK_CLASS = [
  "studio-label text-studio-fg transition-colors",
  "hover:text-studio-accent",
].join(" ");

const ITEM_CLASS = "text-sm text-studio-muted";

type StudioContactDetailsProps = {
  readonly copy: ContactMarketingCopy;
};

/** Phone, email, hours, area, and social links beside the request form. */
export function StudioContactDetails({ copy }: StudioContactDetailsProps) {
  return (
    <>
      <ul className="mt-10 space-y-2">
        <li className={ITEM_CLASS}>
          <a href={copy.phoneHref}>{copy.phoneLabel}</a>
        </li>
        <li className={ITEM_CLASS}>
          <a href={copy.emailHref}>{copy.emailLabel}</a>
        </li>
        <li className={ITEM_CLASS}>{copy.hours}</li>
        <li className={ITEM_CLASS}>{copy.address}</li>
      </ul>
      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        {copy.social.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={SOCIAL_LINK_CLASS}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
