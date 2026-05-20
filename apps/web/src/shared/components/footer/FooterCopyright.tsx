import Link from "next/link";
import { FOOTER_COPYRIGHT } from "@/shared/components/footer/footerConfig";

const FOOTER_COPYRIGHT_CLASS = "text-left text-base text-muted-foreground";

const FOOTER_COPYRIGHT_COMPANY_CLASS =
  "font-bold text-what-we-do-title transition-opacity hover:opacity-80";

export function FooterCopyright() {
  const { year, companyName, companyHref, suffix } = FOOTER_COPYRIGHT;

  return (
    <p className={FOOTER_COPYRIGHT_CLASS}>
      Copyright © {year}{" "}
      <Link
        href={companyHref}
        className={FOOTER_COPYRIGHT_COMPANY_CLASS}
        target="_blank"
        rel="noopener noreferrer"
      >
        {companyName}
      </Link>
      . {suffix}
    </p>
  );
}
