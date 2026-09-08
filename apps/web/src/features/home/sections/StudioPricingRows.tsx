const LIST_CLASS = "divide-y divide-studio-border border-y border-studio-border";

const ROW_CLASS = "flex items-baseline justify-between gap-6 py-3.5";

export type StudioPricingRow = {
  readonly label: string;
  readonly price: string;
};

type StudioPricingRowsProps = {
  readonly rows: readonly StudioPricingRow[];
};

/** Label/price rows separated by hairlines, used by every service block. */
export function StudioPricingRows({ rows }: StudioPricingRowsProps) {
  return (
    <dl className={LIST_CLASS}>
      {rows.map((row) => (
        <div key={row.label} className={ROW_CLASS}>
          <dt className="text-sm text-studio-muted">{row.label}</dt>
          <dd className="text-sm font-medium tracking-wide text-studio-fg">{row.price}</dd>
        </div>
      ))}
    </dl>
  );
}
