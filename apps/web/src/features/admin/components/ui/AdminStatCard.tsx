import Link from "next/link";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

type AdminStatCardProps = {
  readonly label: string;
  readonly value: number | string;
  readonly href?: string;
  readonly sublabel?: string;
};

export function AdminStatCard({ label, value, href, sublabel }: AdminStatCardProps) {
  const content = (
    <>
      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-brand-navy">{value}</p>
      {sublabel ? <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${ADMIN_CARD_CLASS} block transition-shadow hover:shadow-md`}>
        {content}
      </Link>
    );
  }

  return <div className={ADMIN_CARD_CLASS}>{content}</div>;
}
