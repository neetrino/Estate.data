import { HOME_WHAT_WE_DO_COPY } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceCard } from "@/features/home/components/WhatWeDoServiceCard";
import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS } from "@/shared/lib/constants";

export function HomeWhatWeDo() {
  const { title, subtitleLines, services } = HOME_WHAT_WE_DO_COPY;

  return (
    <section
      className="bg-what-we-do-surface py-14 sm:py-16 lg:py-20"
      aria-labelledby="what-we-do-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
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

        <ul className="mt-12 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-start">
          {services.map((service) => (
            <li key={service.id}>
              <WhatWeDoServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
