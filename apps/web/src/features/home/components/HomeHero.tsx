import Image from "next/image";
import {
  HOME_HERO_CACHE_VERSION,
  HOME_HERO_IMAGE_ALT,
  HOME_HERO_IMAGE_PATH,
} from "@/shared/lib/constants";

const HERO_IMAGE_QUALITY = 100;

export function HomeHero() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={`${HOME_HERO_IMAGE_PATH}?v=${HOME_HERO_CACHE_VERSION}`}
        unoptimized
        alt={HOME_HERO_IMAGE_ALT}
        fill
        priority
        quality={HERO_IMAGE_QUALITY}
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
      />
    </div>
  );
}
