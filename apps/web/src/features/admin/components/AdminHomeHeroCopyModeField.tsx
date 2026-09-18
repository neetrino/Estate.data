"use client";

import type { HomeHeroCopyMode } from "@/shared/lib/homeHeroCopyMode";
import { HOME_HERO_COPY_MODES } from "@/shared/lib/homeHeroCopyMode";
import {
  HOME_HERO_SECTION_BODY_CLASS,
  HOME_HERO_SECTION_CARD_CLASS,
  HOME_HERO_SECTION_HEADER_CLASS,
  HOME_HERO_SECTION_TITLE_CLASS,
} from "@/features/admin/styles/admin-home-hero-classes";

const MODE_COPY: Record<HomeHeroCopyMode, { label: string; hint: string }> = {
  shared: {
    label: "Same text on every slide",
    hint: "One title and description for the whole hero.",
  },
  perSlide: {
    label: "Different text per slide",
    hint: "Each image can have its own title and description. Empty fields use the default text below.",
  },
};

type AdminHomeHeroCopyModeFieldProps = {
  readonly value: HomeHeroCopyMode;
  readonly onChange: (mode: HomeHeroCopyMode) => void;
};

/** Lets the editor choose shared vs per-slide hero copy. */
export function AdminHomeHeroCopyModeField({ value, onChange }: AdminHomeHeroCopyModeFieldProps) {
  return (
    <section className={HOME_HERO_SECTION_CARD_CLASS}>
      <div className={HOME_HERO_SECTION_HEADER_CLASS}>
        <h2 className={HOME_HERO_SECTION_TITLE_CLASS}>How text works</h2>
      </div>
      <div className={`${HOME_HERO_SECTION_BODY_CLASS} sm:grid-cols-2`}>
        {HOME_HERO_COPY_MODES.map((mode) => {
          const selected = mode === value;
          const copy = MODE_COPY[mode];
          return (
            <button
              key={mode}
              type="button"
              aria-pressed={selected}
              className={`rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? "border-brand-purple bg-brand-purple/10"
                  : "border-[#dcc090]/35 bg-white hover:border-[#dcc090]"
              }`}
              onClick={() => onChange(mode)}
            >
              <span className="block text-sm font-semibold text-brand-navy">{copy.label}</span>
              <span className="mt-1 block text-xs text-[#414141]/65">{copy.hint}</span>
            </button>
          );
        })}
      </div>
      <p className="px-4 pb-4 text-xs text-[#414141]/55">
        Press Save so this choice appears on the website.
      </p>
    </section>
  );
}
