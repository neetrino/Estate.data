import { HOME_HOW_IT_WORKS_COPY } from "@/features/home/content/howItWorksCopy";
import { HowItWorksConnector } from "@/features/home/landing/components/HowItWorksConnector";
import { HowItWorksStepIcon } from "@/features/home/landing/components/HowItWorksStepIcon";
import {
  HowItWorksBackgroundDecor,
  HowItWorksEyebrowDecor,
  HowItWorksHeaderDecor,
} from "@/features/home/landing/components/HowItWorksSectionDecor";
import { HOW_IT_WORKS_BG_SOURCES } from "@/features/home/landing/lib/howItWorksAssets";
import { howItWorksStepBadgeClass } from "@/features/home/landing/lib/howItWorksStepAccent";
import { LANDING_CONTAINER_CLASS, LANDING_SECTION_CLASS } from "@/features/home/landing/lib/landingStyles";
import "@/features/home/styles/how-it-works-section.css";

const HOW_IT_WORKS_SECTION_CLASS = `how-it-works-section relative isolate overflow-hidden ${LANDING_SECTION_CLASS}`;

export function HomeHowItWorks() {
  const { eyebrow, titleLines, steps } = HOME_HOW_IT_WORKS_COPY;

  return (
    <section className={HOW_IT_WORKS_SECTION_CLASS} aria-labelledby="how-it-works-heading">
      <HowItWorksBackgroundLayer />

      <div className={`${LANDING_CONTAINER_CLASS} relative z-10`}>
        <header className="how-it-works-header relative text-center">
          <HowItWorksHeaderDecor />
          <div className="how-it-works-eyebrow-wrap relative inline-flex">
            <HowItWorksEyebrowDecor />
            <p className="how-it-works-eyebrow-pill">{eyebrow}</p>
          </div>
          <h2 id="how-it-works-heading" className="how-it-works-title">
            <span className="how-it-works-title-line">
              {titleLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < titleLines.length - 1 ? <br className="hidden sm:block" /> : null}
                </span>
              ))}
            </span>
            <span className="how-it-works-title-accent-dot" aria-hidden />
          </h2>
          <HowItWorksTitleDivider />
        </header>

        <div className="how-it-works-steps">
          <div className="how-it-works-grid-wrap">
            <HowItWorksConnector />
            <ol className="how-it-works-grid">
              {steps.map((step, index) => (
                <li key={step.id} className="how-it-works-step">
                  <div className="how-it-works-step-icon-wrap">
                    <HowItWorksStepIcon icon={step.icon} />
                  </div>
                  <article className="how-it-works-step-card">
                    <h3 className="how-it-works-step-title">{step.title}</h3>
                    <p className="how-it-works-step-description">{step.description}</p>
                    <span
                      className={`how-it-works-step-badge ${howItWorksStepBadgeClass(step.accent)}`}
                      aria-label={`Step ${index + 1}`}
                    >
                      {index + 1}
                    </span>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksTitleDivider() {
  return (
    <div className="how-it-works-title-divider" aria-hidden>
      <span className="how-it-works-title-divider__line" />
      <span className="how-it-works-title-divider__dot how-it-works-title-divider__dot--purple" />
      <span className="how-it-works-title-divider__dot how-it-works-title-divider__dot--cyan" />
      <span className="how-it-works-title-divider__dot how-it-works-title-divider__dot--navy" />
    </div>
  );
}

function HowItWorksBackgroundLayer() {
  return (
    <div
      className="home-how-it-works-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <HowItWorksBackgroundPicture />
      <HowItWorksBackgroundDecor />
    </div>
  );
}

function HowItWorksBackgroundPicture() {
  return (
    <picture className="absolute inset-0 block size-full min-h-full" aria-hidden>
      <source media="(min-width: 1280px)" srcSet={HOW_IT_WORKS_BG_SOURCES.desktop} type="image/webp" />
      <source media="(min-width: 768px)" srcSet={HOW_IT_WORKS_BG_SOURCES.tablet} type="image/webp" />
      <img
        src={HOW_IT_WORKS_BG_SOURCES.mobile}
        alt=""
        width={2560}
        height={1440}
        decoding="async"
        className="how-it-works-bg-image size-full min-h-full"
      />
    </picture>
  );
}
