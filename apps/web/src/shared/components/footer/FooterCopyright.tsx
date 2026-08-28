import Link from "next/link";
import { FOOTER_COPYRIGHT } from "@/shared/components/footer/footerConfig";

const FOOTER_COPYRIGHT_CLASS = "text-left text-sm text-studio-muted";

const FOOTER_COPYRIGHT_COMPANY_CLASS =
  "font-bold text-studio-fg transition-colors hover:text-studio-accent";

export function FooterCopyright() {
  const { year, companyName, companyHref, suffix, droneNote } = FOOTER_COPYRIGHT;

  return (
    <div className="space-y-2">
      <p className={FOOTER_COPYRIGHT_CLASS}>
        © {year}{" "}
        <Link href={companyHref} className={FOOTER_COPYRIGHT_COMPANY_CLASS}>
          {companyName}
        </Link>
        . {suffix}
      </p>
      <p className={FOOTER_COPYRIGHT_CLASS}>{droneNote}</p>
    </div>
  );
}
