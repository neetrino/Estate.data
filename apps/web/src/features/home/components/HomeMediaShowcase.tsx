import Image from "next/image";
import { HOME_MEDIA_SHOWCASE_COPY } from "@/features/home/content/homeMediaShowcaseCopy";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import "@/features/home/styles/home-media-showcase.css";

export function HomeMediaShowcase() {
  const { title, subtitle, rows } = HOME_MEDIA_SHOWCASE_COPY;

  return (
    <section className={`home-media-showcase bg-white ${LANDING_SECTION_CLASS}`} aria-labelledby="media-showcase-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <header className="mb-8 text-center">
          <h2
            id="media-showcase-heading"
            className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-slate-700 sm:text-lg">
            {subtitle}
          </p>
        </header>

        <div className="space-y-4">
          {rows.map((row, index) => (
            <MediaShowcaseRow
              key={`media-row-${index}`}
              row={row}
              direction={index % 2 === 0 ? "left" : "right"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaShowcaseRow({
  row,
  direction,
}: {
  row: (typeof HOME_MEDIA_SHOWCASE_COPY.rows)[number];
  direction: "left" | "right";
}) {
  const duplicatedItems = [...row, ...row];
  const directionClass =
    direction === "left" ? "home-media-showcase__track--left" : "home-media-showcase__track--right";

  return (
    <div className="overflow-hidden">
      <div className={`home-media-showcase__track ${directionClass}`}>
        {duplicatedItems.map((item, index) => (
          <article key={`${item.id}-${index}`} className="home-media-showcase__card">
            <Image
              src={item.src}
              alt={item.alt}
              width={960}
              height={600}
              className="home-media-showcase__image"
              sizes="(max-width: 768px) 82vw, 26rem"
            />
          </article>
        ))}
      </div>
    </div>
  );
}
