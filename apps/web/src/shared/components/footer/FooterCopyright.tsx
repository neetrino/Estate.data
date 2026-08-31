import Link from "next/link";
import { FOOTER_COPYRIGHT } from "@/shared/components/footer/footerConfig";

const FOOTER_COPYRIGHT_CLASS = "text-left text-sm text-studio-muted";

const FOOTER_COPYRIGHT_CREATOR_CLASS =
  "font-bold text-studio-fg transition-colors hover:text-studio-accent";

export function FooterCopyright() {
  const { year, rightsText, createdPrefix, createdSuffix, creatorName, creatorHref } =
    FOOTER_COPYRIGHT;

  return (
    <p className={FOOTER_COPYRIGHT_CLASS}>
      Copyright © {year} | {rightsText} | {createdPrefix}{" "}
      <Link
        href={creatorHref}
        className={FOOTER_COPYRIGHT_CREATOR_CLASS}
        target="_blank"
        rel="noopener noreferrer"
      >
        {creatorName}
      </Link>{" "}
      {createdSuffix}
    </p>
  );
}
