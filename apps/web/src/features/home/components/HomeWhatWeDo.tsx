import { HOME_WHAT_WE_DO_COPY } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceCard } from "@/features/home/components/WhatWeDoServiceCard";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_CARD_GRID_GAP_CLASS,
} from "@/shared/lib/constants";

export function HomeWhatWeDo() {
  const { title, subtitleLines, services } = HOME_WHAT_WE_DO_COPY;

  return (
    <section
      className="bg-what-we-do-surface py-14 sm:py-16 lg:py-20"
      aria-labelledby="what-we-do-heading"
    >
      <div
        className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS} flex flex-col ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`}
      >
        <div>
          <h2
            id="what-we-do-heading"
            className="text-4xl font-bold tracking-tight text-what-we-do-title sm:text-5xl lg:text-[3rem]"
          >
            {title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-what-we-do-subtitle sm:text-xl">
            {subtitleLines.map((line, index) => (
              <span
                key={line}
                className={index === 0 ? "font-bold" : undefined}
              >
                {line}
                {index < subtitleLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>

        <ul
          className={`grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`}
        >
          {services.map((service) => (
            <li key={service.id} className="min-w-0">
              <WhatWeDoServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
