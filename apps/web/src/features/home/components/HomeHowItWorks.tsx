import { HOME_HOW_IT_WORKS_COPY } from "@/features/home/content/howItWorksCopy";
import { HowItWorksStepIcon } from "@/features/home/landing/components/HowItWorksStepIcon";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_EYEBROW_CLASS,
  LANDING_SECTION_TITLE_CLASS,
  LANDING_SECTION_WHITE_CLASS,
  landingIconSurfaceClass,
} from "@/features/home/landing/lib/landingStyles";

const STEP_TITLE_CLASS = "mt-4 text-base font-bold text-brand-navy";

const STEP_DESCRIPTION_CLASS = "mt-2 text-sm leading-relaxed text-muted-foreground";

const STEP_CONNECTOR_CLASS =
  "absolute top-6 left-[calc(50%+2.25rem)] hidden h-px w-[calc(100%-4.5rem)] border-t border-dashed border-brand-navy/20 lg:block";

export function HomeHowItWorks() {
  const { eyebrow, title, steps } = HOME_HOW_IT_WORKS_COPY;

  return (
    <section className={LANDING_SECTION_WHITE_CLASS} aria-labelledby="how-it-works-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <header className="text-center">
          <p className={LANDING_EYEBROW_CLASS}>{eyebrow}</p>
          <h2 id="how-it-works-heading" className={`mt-3 ${LANDING_SECTION_TITLE_CLASS}`}>
            {title}
          </h2>
        </header>

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step.id} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 ? <span className={STEP_CONNECTOR_CLASS} aria-hidden /> : null}
              <span className={landingIconSurfaceClass(step.accent)}>
                <HowItWorksStepIcon icon={step.icon} accent={step.accent} />
              </span>
              <h3 className={STEP_TITLE_CLASS}>{step.title}</h3>
              <p className={STEP_DESCRIPTION_CLASS}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
