import Link from "next/link";
import { LOGO_MARK, LOGO_WORDMARK } from "@/shared/components/navbar/navConfig";

const LOGO_MARK_SIZE_CLASS = "size-8";
const LOGO_MARK_RADIUS_CLASS = "rounded-[12px]";

type LogoLinkProps = {
  onNavigate?: () => void;
};

/** Orange rounded mark (Figma 178:526) + LumenLA wordmark. */
export function LogoLink({ onNavigate }: LogoLinkProps) {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5"
      onClick={onNavigate}
    >
      <span
        className={`flex ${LOGO_MARK_SIZE_CLASS} ${LOGO_MARK_RADIUS_CLASS} items-center justify-center bg-accent text-sm font-bold text-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]`}
        aria-hidden
      >
        {LOGO_MARK}
      </span>
      <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {LOGO_WORDMARK}
      </span>
    </Link>
  );
}
