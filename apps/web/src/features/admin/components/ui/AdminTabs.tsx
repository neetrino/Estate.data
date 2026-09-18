"use client";

import {
  ADMIN_TAB_ACTIVE_CLASS,
  ADMIN_TAB_CLASS,
  ADMIN_TAB_IDLE_CLASS,
  ADMIN_TABS_LIST_CLASS,
} from "@/features/admin/styles/admin-panel-classes";

export type AdminTabItem<T extends string> = {
  readonly id: T;
  readonly label: string;
  readonly hint?: string;
};

type AdminTabsProps<T extends string> = {
  readonly items: readonly AdminTabItem<T>[];
  readonly value: T;
  readonly onChange: (id: T) => void;
};

export function adminTabHidden(active: boolean): string {
  return active ? "" : "hidden";
}

/** Admin section switcher — one panel visible at a time. */
export function AdminTabs<T extends string>({ items, value, onChange }: AdminTabsProps<T>) {
  const selected = items.find((item) => item.id === value);

  return (
    <div className="mb-6">
      <div className={ADMIN_TABS_LIST_CLASS} role="tablist">
        {items.map((item) => {
          const selectedTab = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selectedTab}
              className={`${ADMIN_TAB_CLASS} ${selectedTab ? ADMIN_TAB_ACTIVE_CLASS : ADMIN_TAB_IDLE_CLASS}`}
              onClick={() => onChange(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {selected?.hint ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{selected.hint}</p>
      ) : null}
    </div>
  );
}
