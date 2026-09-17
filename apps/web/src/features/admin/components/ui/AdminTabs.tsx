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
};

type AdminTabsProps<T extends string> = {
  readonly items: readonly AdminTabItem<T>[];
  readonly value: T;
  readonly onChange: (id: T) => void;
};

/** Admin section switcher — one panel visible at a time. */
export function AdminTabs<T extends string>({ items, value, onChange }: AdminTabsProps<T>) {
  return (
    <div className={ADMIN_TABS_LIST_CLASS} role="tablist">
      {items.map((item) => {
        const selected = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selected}
            className={`${ADMIN_TAB_CLASS} ${selected ? ADMIN_TAB_ACTIVE_CLASS : ADMIN_TAB_IDLE_CLASS}`}
            onClick={() => onChange(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
