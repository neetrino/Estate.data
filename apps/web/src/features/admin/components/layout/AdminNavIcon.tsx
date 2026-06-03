import type { AdminNavIconId } from "@/features/admin/config/admin-nav";

type AdminNavIconProps = {
  readonly id: AdminNavIconId;
  readonly className?: string;
};

const ICON_CLASS_DEFAULT = "size-[18px] shrink-0";

function NavIconSvg({
  className,
  children,
}: {
  readonly className: string;
  readonly children: React.ReactNode;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Sidebar nav icon by item id. */
export function AdminNavIcon({ id, className = ICON_CLASS_DEFAULT }: AdminNavIconProps) {
  switch (id) {
    case "dashboard":
      return (
        <NavIconSvg className={className}>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </NavIconSvg>
      );
    case "portfolio":
      return (
        <NavIconSvg className={className}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M8 11l3 3 5-6" />
        </NavIconSvg>
      );
    case "pricing":
      return (
        <NavIconSvg className={className}>
          <path d="M12 3v18" />
          <path d="M7 8h8.5a2.5 2.5 0 0 1 0 5H9a2.5 2.5 0 0 0 0 5h6.5" />
        </NavIconSvg>
      );
    case "articles":
      return (
        <NavIconSvg className={className}>
          <path d="M6 4h9l3 3v13H6z" />
          <path d="M15 4v4h4" />
          <path d="M9 12h6M9 16h6" />
        </NavIconSvg>
      );
    case "faq":
      return (
        <NavIconSvg className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 4.2 1.8c-.7.6-1.2 1.2-1.2 2.2" />
          <path d="M12 17h.01" />
        </NavIconSvg>
      );
    case "contact-inquiries":
      return (
        <NavIconSvg className={className}>
          <path d="M4 6h16v12H4z" />
          <path d="m4 7 8 6 8-6" />
        </NavIconSvg>
      );
    case "payments":
      return (
        <NavIconSvg className={className}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 15h4" />
        </NavIconSvg>
      );
    case "site-content":
      return (
        <NavIconSvg className={className}>
          <path d="M4 6h16M4 12h16M4 18h10" />
        </NavIconSvg>
      );
    case "logout":
      return (
        <NavIconSvg className={className}>
          <path d="M10 17l-5-5 5-5" />
          <path d="M5 12h10" />
          <path d="M15 5h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2" />
        </NavIconSvg>
      );
    default:
      return null;
  }
}
