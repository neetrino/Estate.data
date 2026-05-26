/** Wavy pastel connector between step icons (desktop). */
export function HowItWorksConnector() {
  return (
    <div className="how-it-works-connector" aria-hidden>
      <div className="how-it-works-connector-grid">
        <div className="how-it-works-connector-svg-wrap">
          <ConnectorSvg />
        </div>
      </div>
    </div>
  );
}

function ConnectorSvg() {
  return (
    <svg
      className="how-it-works-connector-svg pointer-events-none block size-full"
      viewBox="0 0 800 64"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="how-it-works-connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#873c83" stopOpacity="0.75" />
          <stop offset="25%" stopColor="#16c0da" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.72" />
          <stop offset="75%" stopColor="#e55100" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#e83e9f" stopOpacity="0.65" />
        </linearGradient>
        <filter id="how-it-works-connector-glow" x="-5%" y="-50%" width="110%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 0 34 C 37 14, 63 52, 100 34 C 137 16, 163 54, 200 34 C 237 14, 263 52, 300 34 C 337 16, 363 54, 400 34 C 437 14, 463 52, 500 34 C 537 16, 563 54, 600 34 C 637 14, 663 52, 700 34 C 737 16, 763 54, 800 34"
        fill="none"
        stroke="url(#how-it-works-connector-gradient)"
        strokeWidth="1.5"
        strokeLinecap="butt"
        filter="url(#how-it-works-connector-glow)"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="200" cy="34" r="2.5" fill="#16c0da" opacity="0.5" />
      <circle cx="400" cy="34" r="2.5" fill="#14b8a6" opacity="0.5" />
      <circle cx="600" cy="34" r="2.5" fill="#e55100" opacity="0.5" />
    </svg>
  );
}
