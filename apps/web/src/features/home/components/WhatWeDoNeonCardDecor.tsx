const WHAT_WE_DO_NEON_CARD_DECOR_CLASS = "what-we-do-neon-card__decor";

/** Corner orbit ring, arcs, and star glints (CSS in what-we-do-neon-card.css). */
type WhatWeDoNeonCardDecorProps = {
  readonly showPlanet?: boolean;
};

export function WhatWeDoNeonCardDecor({ showPlanet = true }: WhatWeDoNeonCardDecorProps) {
  return (
    <div className={WHAT_WE_DO_NEON_CARD_DECOR_CLASS} aria-hidden>
      {showPlanet ? <span className="what-we-do-neon-card__planet" /> : null}
      <span className="what-we-do-neon-card__arc what-we-do-neon-card__arc--outer" />
      <span className="what-we-do-neon-card__arc what-we-do-neon-card__arc--inner" />
      <span className="what-we-do-neon-card__star what-we-do-neon-card__star--a" />
      <span className="what-we-do-neon-card__star what-we-do-neon-card__star--b" />
      <span className="what-we-do-neon-card__star what-we-do-neon-card__star--c" />
    </div>
  );
}
