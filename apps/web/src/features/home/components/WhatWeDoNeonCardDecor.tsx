const WHAT_WE_DO_NEON_CARD_DECOR_CLASS = "what-we-do-neon-card__decor";

/** Corner orbit ring, arcs, and star glints (CSS in what-we-do-neon-card.css). */
export function WhatWeDoNeonCardDecor() {
  return (
    <div className={WHAT_WE_DO_NEON_CARD_DECOR_CLASS} aria-hidden>
      <span className="what-we-do-neon-card__planet" />
      <span className="what-we-do-neon-card__arc what-we-do-neon-card__arc--outer" />
      <span className="what-we-do-neon-card__arc what-we-do-neon-card__arc--inner" />
      <span className="what-we-do-neon-card__star what-we-do-neon-card__star--a" />
      <span className="what-we-do-neon-card__star what-we-do-neon-card__star--b" />
      <span className="what-we-do-neon-card__star what-we-do-neon-card__star--c" />
    </div>
  );
}
