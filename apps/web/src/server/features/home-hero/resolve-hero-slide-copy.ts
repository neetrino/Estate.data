import type { HomeHeroCopyMode } from "@/shared/lib/homeHeroCopyMode";

type HeroCopySource = {
  readonly title: string;
  readonly description: string;
  readonly copyMode: HomeHeroCopyMode;
};

type SlideCopySource = {
  readonly title: string | null;
  readonly description: string | null;
};

/** Shared hero copy, or the slide’s own text when per-slide mode is on. */
export function resolveHeroSlideCopy(
  slide: SlideCopySource,
  hero: HeroCopySource,
): { title: string; description: string } {
  if (hero.copyMode !== "perSlide") {
    return { title: hero.title, description: hero.description };
  }

  return {
    title: slide.title?.trim() ? slide.title : hero.title,
    description: slide.description?.trim() ? slide.description : hero.description,
  };
}
