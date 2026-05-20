import Image from "next/image";
import { AboutStackCard } from "@/features/about/components/AboutStackCard";
import {
  ABOUT_STORY_COPY,
  ABOUT_STORY_IMAGE_ALT,
  ABOUT_STORY_IMAGE_PATH,
} from "@/features/about/content/aboutStoryCopy";

const ABOUT_STORY_SECTION_CLASS =
  "mt-14 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16";

const ABOUT_STORY_IMAGE_FRAME_CLASS =
  "relative aspect-[4/3] w-full min-h-0 overflow-hidden rounded-2xl bg-black/5 lg:aspect-auto lg:h-full";

const ABOUT_STORY_BODY_CLASS = "flex flex-col gap-6 lg:h-full lg:gap-0";

const ABOUT_STORY_COPY_BLOCK_CLASS =
  "flex flex-col gap-6 text-left lg:flex-1 lg:justify-center lg:gap-6";

const ABOUT_STORY_PARAGRAPH_CLASS =
  "text-base leading-relaxed text-foreground sm:text-lg";

export function AboutStorySection() {
  const { paragraphs } = ABOUT_STORY_COPY;

  return (
    <section className={ABOUT_STORY_SECTION_CLASS} aria-labelledby="about-story-heading">
      <h2 id="about-story-heading" className="sr-only">
        About ESTATEDATA
      </h2>
      <div className={ABOUT_STORY_IMAGE_FRAME_CLASS}>
        <Image
          src={ABOUT_STORY_IMAGE_PATH}
          alt={ABOUT_STORY_IMAGE_ALT}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className={ABOUT_STORY_BODY_CLASS}>
        <div className={ABOUT_STORY_COPY_BLOCK_CLASS}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={ABOUT_STORY_PARAGRAPH_CLASS}>
              {paragraph}
            </p>
          ))}
        </div>
        <AboutStackCard />
      </div>
    </section>
  );
}
