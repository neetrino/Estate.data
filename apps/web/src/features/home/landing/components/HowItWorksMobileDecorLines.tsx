type HowItWorksMobileDecorLinesProps = {
  stepCount: number;
  stepAccents: readonly ("purple" | "cyan" | "teal" | "orange" | "pink")[];
};

const CONNECTOR_STROKE_WIDTH = 2.5;
const ACCENT_COLOR: Record<"purple" | "cyan" | "teal" | "orange" | "pink", string> = {
  purple: "#8F45C7",
  cyan: "#20C4E8",
  teal: "#5ADBCB",
  orange: "#F59E0B",
  pink: "#E83E9F",
};

export function HowItWorksMobileDecorLines({
  stepCount,
  stepAccents,
}: HowItWorksMobileDecorLinesProps) {
  const connectorCount = Math.max(stepCount - 1, 0);

  if (connectorCount === 0) {
    return null;
  }

  return (
    <div className="how-it-works-mobile-decor-lines sm:hidden" aria-hidden>
      {Array.from({ length: connectorCount }).map((_, index) => {
        const sideClass =
          index % 2 === 0
            ? "how-it-works-mobile-decor-lines__segment--left"
            : "how-it-works-mobile-decor-lines__segment--right";

        return (
          <div
            // 1..N-1 connectors positioned between stacked cards.
            key={`how-it-works-mobile-connector-${index}`}
            className={`how-it-works-mobile-decor-lines__segment ${sideClass}`}
            style={{ top: `${((index + 1) / stepCount) * 100}%` }}
          >
            <svg
              className="how-it-works-mobile-decor-lines__svg"
              viewBox="0 0 96 164"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id={`how-it-works-mobile-connector-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={ACCENT_COLOR[stepAccents[index] ?? "purple"]}
                    stopOpacity="0.9"
                  />
                  <stop
                    offset="100%"
                    stopColor={ACCENT_COLOR[stepAccents[index + 1] ?? "cyan"]}
                    stopOpacity="0.84"
                  />
                </linearGradient>
                <filter id={`how-it-works-mobile-connector-glow-${index}`} x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="1.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {index % 2 === 0 ? (
                <path
                  d="M90 4 C 22 24, 22 140, 90 160"
                  fill="none"
                  stroke={`url(#how-it-works-mobile-connector-gradient-${index})`}
                  strokeWidth={CONNECTOR_STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#how-it-works-mobile-connector-glow-${index})`}
                />
              ) : (
                <path
                  d="M6 4 C 74 24, 74 140, 6 160"
                  fill="none"
                  stroke={`url(#how-it-works-mobile-connector-gradient-${index})`}
                  strokeWidth={CONNECTOR_STROKE_WIDTH}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={`url(#how-it-works-mobile-connector-glow-${index})`}
                />
              )}
            </svg>
          </div>
        );
      })}
    </div>
  );
}
