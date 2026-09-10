type StudioStartingAtProps = {
  readonly price: string;
  readonly unit?: string;
  readonly className?: string;
};

const LABEL_CLASS = "text-sm text-studio-muted";
const PRICE_CLASS = "font-display text-xl text-studio-fg";

/**
 * Master-style “Starting at $X” label beside service CTAs
 * (muted prefix + bold white price).
 */
export function StudioStartingAt({ price, unit, className = "" }: StudioStartingAtProps) {
  return (
    <p className={`${LABEL_CLASS} ${className}`.trim()}>
      Starting at{" "}
      <span className={PRICE_CLASS}>{price}</span>
      {unit ? ` ${unit}` : null}
    </p>
  );
}
