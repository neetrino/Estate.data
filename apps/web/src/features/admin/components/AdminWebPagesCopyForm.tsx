"use client";

import { useState } from "react";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminJumpTargetField } from "@/features/admin/components/ui/AdminJumpTargetField";
import { AdminPairListField } from "@/features/admin/components/ui/AdminPairListField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { AdminTabs, adminTabHidden, type AdminTabItem } from "@/features/admin/components/ui/AdminTabs";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import { SITE_COPY_KEYS, type WebPagesCopy } from "@/server/features/site-copy/site-copy.schema";

type AdminWebPagesCopyFormProps = {
  readonly initial: WebPagesCopy;
  readonly onSaved: () => void;
};

type WebPagesFieldsProps = {
  readonly draft: WebPagesCopy;
  readonly onChange: (next: WebPagesCopy) => void;
};

const WEB_PAGES_TABS = [
  { id: "text", label: "Words", hint: "Headline and description visitors read." },
  { id: "button", label: "Button", hint: "The button visitors press." },
  { id: "prices", label: "Prices", hint: "Starting price, what is included, and the price list." },
] as const satisfies readonly AdminTabItem<"text" | "button" | "prices">[];

function filterPricing(draft: WebPagesCopy): WebPagesCopy {
  return {
    ...draft,
    pricing: draft.pricing.filter((row) => row.label.trim().length > 0 && row.price.trim().length > 0),
  };
}

function WebPagesTextFields({ draft, onChange }: WebPagesFieldsProps) {
  return (
    <>
      <AdminFormField
        label="Small label"
        name="web-pages-eyebrow"
        value={draft.eyebrow}
        onChange={(eyebrow) => onChange({ ...draft, eyebrow })}
        hint="Tiny line above the headline"
      />
      <AdminFormField
        label="Headline"
        name="web-pages-title"
        value={draft.title}
        onChange={(title) => onChange({ ...draft, title })}
      />
      <AdminFormField
        label="Description"
        name="web-pages-body"
        value={draft.body}
        onChange={(body) => onChange({ ...draft, body })}
        multiline
        rows={5}
      />
    </>
  );
}

function WebPagesPricingFields({
  draft,
  includedText,
  onChange,
  onIncludedTextChange,
}: WebPagesFieldsProps & {
  readonly includedText: string;
  readonly onIncludedTextChange: (value: string) => void;
}) {
  return (
    <>
      <AdminFormField
        label="Starting price"
        name="web-pages-price"
        value={draft.startingPrice}
        onChange={(startingPrice) => onChange({ ...draft, startingPrice })}
        hint="Shown as the from-price on the site"
      />
      <AdminFormField
        label="What's included"
        name="web-pages-included"
        value={includedText}
        onChange={onIncludedTextChange}
        multiline
        rows={8}
        hint="One bullet per line"
      />
      <AdminPairListField
        label="Price list"
        hint="Package name on the left, price on the right"
        leftPlaceholder="Package name"
        rightPlaceholder="Price"
        addLabel="Add a package"
        rows={draft.pricing.map((row) => ({ left: row.label, right: row.price }))}
        onChange={(rows) =>
          onChange({
            ...draft,
            pricing: rows.map((row) => ({ label: row.left, price: row.right })),
          })
        }
      />
    </>
  );
}

function WebPagesTabFields({
  draft,
  includedText,
  onChange,
  onIncludedTextChange,
}: WebPagesFieldsProps & {
  readonly includedText: string;
  readonly onIncludedTextChange: (value: string) => void;
}) {
  const [tab, setTab] = useState<(typeof WEB_PAGES_TABS)[number]["id"]>("text");

  return (
    <>
      <AdminTabs items={WEB_PAGES_TABS} value={tab} onChange={setTab} />
      <div className={adminTabHidden(tab === "text")}>
        <WebPagesTextFields draft={draft} onChange={onChange} />
      </div>
      <div className={adminTabHidden(tab === "button")}>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminFormField
            label="Button text"
            name="web-pages-cta"
            value={draft.ctaLabel}
            onChange={(ctaLabel) => onChange({ ...draft, ctaLabel })}
          />
          <AdminJumpTargetField
            label="Button goes to"
            name="web-pages-href"
            value={draft.href}
            onChange={(href) => onChange({ ...draft, href })}
          />
        </div>
      </div>
      <div className={adminTabHidden(tab === "prices")}>
        <WebPagesPricingFields
          draft={draft}
          includedText={includedText}
          onChange={onChange}
          onIncludedTextChange={onIncludedTextChange}
        />
      </div>
    </>
  );
}

/** Admin editor for Web Pages marketing copy (home teaser + `/web-pages`). */
export function AdminWebPagesCopyForm({ initial, onSaved }: AdminWebPagesCopyFormProps) {
  const [includedText, setIncludedText] = useState(initial.included.join("\n"));

  return (
    <AdminSiteCopyForm
      description="Property website offer: homepage teaser and the Web Pages page."
      copyKey={SITE_COPY_KEYS.webPages}
      initial={initial}
      saveLabel="Save this section"
      onSaved={onSaved}
      beforeSave={(draft) =>
        filterPricing({ ...draft, included: parseIncludedLines(includedText) })
      }
    >
      {(draft, setDraft) => (
        <WebPagesTabFields
          draft={draft}
          includedText={includedText}
          onChange={setDraft}
          onIncludedTextChange={setIncludedText}
        />
      )}
    </AdminSiteCopyForm>
  );
}
