"use client";

import { CONTACT_FORM_SERVICE_OPTIONS } from "@/features/contact/content/contactFieldConfig";
import { subscribeContactService } from "@/features/contact/lib/contactServicePrefill";
import { useEffect, useState } from "react";

const CONTACT_SERVICE_LEGEND_CLASS = "studio-label mb-2 block text-studio-muted";

const CONTACT_SERVICE_GRID_CLASS = "grid gap-3 sm:grid-cols-2 lg:grid-cols-3";

const CONTACT_SERVICE_ITEM_CLASS = [
  "flex cursor-pointer items-center gap-3 border border-studio-border px-4 py-3",
  "text-sm text-studio-muted transition-colors",
  "hover:border-studio-accent/60 hover:text-studio-fg",
  "has-[:checked]:border-studio-accent has-[:checked]:text-studio-fg",
  "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60",
].join(" ");

const CONTACT_SERVICE_CHECKBOX_CLASS = "h-4 w-4 shrink-0 accent-studio-accent";

type ContactServiceCheckboxGroupProps = {
  legend: string;
  disabled?: boolean;
};

/** Multi-select services field — submits every checked value under `services`. */
export function ContactServiceCheckboxGroup({
  legend,
  disabled = false,
}: ContactServiceCheckboxGroupProps) {
  const [selected, setSelected] = useState<readonly string[]>([]);

  useEffect(
    () =>
      subscribeContactService((service) => {
        setSelected((current) =>
          current.includes(service) ? current : [...current, service],
        );
      }),
    [],
  );

  function toggle(value: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...current, value] : current.filter((item) => item !== value),
    );
  }

  return (
    <fieldset className="sm:col-span-2">
      <legend className={CONTACT_SERVICE_LEGEND_CLASS}>{legend}</legend>
      <div className={CONTACT_SERVICE_GRID_CLASS}>
        {CONTACT_FORM_SERVICE_OPTIONS.map((option) => (
          <label key={option.value} className={CONTACT_SERVICE_ITEM_CLASS}>
            <input
              type="checkbox"
              name="services"
              value={option.value}
              disabled={disabled}
              checked={selected.includes(option.value)}
              onChange={(event) => toggle(option.value, event.target.checked)}
              className={CONTACT_SERVICE_CHECKBOX_CLASS}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
