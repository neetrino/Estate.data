import Image from "next/image";
import Link from "next/link";
import {
  SITE_LOGO_ALT,
  SITE_LOGO_CACHE_VERSION,
  SITE_LOGO_DARK_CACHE_VERSION,
  SITE_LOGO_DARK_PATH,
  SITE_LOGO_PATH,
} from "@/shared/components/navbar/navConfig";

/** Intrinsic dimensions for Next Image (source ~637×392). */
const LOGO_SOURCE_WIDTH_PX = 637;
const LOGO_SOURCE_HEIGHT_PX = 392;

/** Display box — fixed so light/dark assets swap without layout shift. */
const LOGO_DISPLAY_HEIGHT_CLASS = "h-14";
const LOGO_DISPLAY_WIDTH_CLASS = "w-[5.6875rem]";

const LOGO_LAYER_LIGHT_CLASS = `absolute inset-0 ${LOGO_DISPLAY_HEIGHT_CLASS} w-full object-contain object-left`;

/** Dark asset crop alignment vs light version (px). */
const LOGO_DARK_OFFSET_CLASS = "-left-[4px] -top-[3px]";

const LOGO_LAYER_DARK_CLASS = `absolute ${LOGO_DARK_OFFSET_CLASS} ${LOGO_DISPLAY_HEIGHT_CLASS} w-full object-contain object-left`;

const LOGO_LAYER_TRANSITION_CLASS =
  "transition-opacity duration-300 ease-out";

type NavTone = "light" | "dark";

type LogoLinkProps = {
  onNavigate?: () => void;
  tone?: NavTone;
};

function logoLayerOpacityClass(visible: boolean): string {
  return visible ? "opacity-100" : "opacity-0";
}

export function LogoLink({ onNavigate, tone = "dark" }: LogoLinkProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      className={`relative inline-flex shrink-0 ${LOGO_DISPLAY_HEIGHT_CLASS} ${LOGO_DISPLAY_WIDTH_CLASS}`}
      onClick={onNavigate}
    >
      <Image
        src={`${SITE_LOGO_PATH}?v=${SITE_LOGO_CACHE_VERSION}`}
        alt={SITE_LOGO_ALT}
        width={LOGO_SOURCE_WIDTH_PX}
        height={LOGO_SOURCE_HEIGHT_PX}
        priority
        unoptimized
        className={`${LOGO_LAYER_LIGHT_CLASS} ${LOGO_LAYER_TRANSITION_CLASS} ${logoLayerOpacityClass(isLight)}`}
      />
      <Image
        src={`${SITE_LOGO_DARK_PATH}?v=${SITE_LOGO_DARK_CACHE_VERSION}`}
        alt=""
        aria-hidden
        width={LOGO_SOURCE_WIDTH_PX}
        height={LOGO_SOURCE_HEIGHT_PX}
        priority
        unoptimized
        className={`${LOGO_LAYER_DARK_CLASS} ${LOGO_LAYER_TRANSITION_CLASS} ${logoLayerOpacityClass(!isLight)}`}
      />
    </Link>
  );
}
