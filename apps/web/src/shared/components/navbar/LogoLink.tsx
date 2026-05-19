import Image from "next/image";
import Link from "next/link";
import {
  SITE_LOGO_ALT,
  SITE_LOGO_CACHE_VERSION,
  SITE_LOGO_PATH,
} from "@/shared/components/navbar/navConfig";

/** Intrinsic dimensions for Next Image (source 637×392). Display: `h-14` (56px). */
const LOGO_SOURCE_WIDTH_PX = 637;
const LOGO_SOURCE_HEIGHT_PX = 392;

type LogoLinkProps = {
  onNavigate?: () => void;
};

export function LogoLink({ onNavigate }: LogoLinkProps) {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center"
      onClick={onNavigate}
    >
      <Image
        src={`${SITE_LOGO_PATH}?v=${SITE_LOGO_CACHE_VERSION}`}
        alt={SITE_LOGO_ALT}
        width={LOGO_SOURCE_WIDTH_PX}
        height={LOGO_SOURCE_HEIGHT_PX}
        priority
        unoptimized
        className="h-14 w-auto drop-shadow-sm"
      />
    </Link>
  );
}
