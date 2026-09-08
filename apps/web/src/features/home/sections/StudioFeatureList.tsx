const LIST_BASE_CLASS = "grid gap-x-8 gap-y-2.5";

const LIST_COLUMNS_CLASS: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

const ITEM_CLASS = "flex gap-3 text-sm text-studio-muted";

const ITEM_DASH_CLASS = "mt-2 h-px w-3 shrink-0 bg-studio-accent/70";

type StudioFeatureListProps = {
  readonly items: readonly string[];
  readonly columns?: 2 | 3;
};

/** "What's included" list — each entry prefixed by a short accent rule. */
export function StudioFeatureList({ items, columns = 2 }: StudioFeatureListProps) {
  return (
    <ul className={`${LIST_BASE_CLASS} ${LIST_COLUMNS_CLASS[columns]}`}>
      {items.map((item) => (
        <li key={item} className={ITEM_CLASS}>
          <span aria-hidden className={ITEM_DASH_CLASS} />
          {item}
        </li>
      ))}
    </ul>
  );
}
