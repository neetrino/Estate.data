"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { SUPERSUDO_PANEL_HERO_SLIDES_PATH } from "@/features/admin/lib/admin-paths";
import { fetchAdminHomeHero, updateAdminHomeHero } from "@/features/admin/services/admin-api";
import {
  HOME_HERO_EDITOR_BODY_CLASS,
  HOME_HERO_EDITOR_CARD_CLASS,
  HOME_HERO_EDITOR_HEADER_CLASS,
  HOME_HERO_EDITOR_SHELL_CLASS,
  HOME_HERO_EDITOR_TITLE_CLASS,
  HOME_HERO_ERROR_ALERT_CLASS,
  HOME_HERO_FOOTER_CLASS,
  HOME_HERO_INPUT_CLASS,
  HOME_HERO_LABEL_CLASS,
  HOME_HERO_SAVE_BUTTON_CLASS,
  HOME_HERO_SECTION_BODY_CLASS,
  HOME_HERO_SECTION_CARD_CLASS,
  HOME_HERO_SECTION_HEADER_CLASS,
  HOME_HERO_SECTION_TITLE_CLASS,
  HOME_HERO_SUCCESS_ALERT_CLASS,
} from "@/features/admin/styles/admin-home-hero-classes";
import type { AdminHomeHero } from "@/features/admin/types/admin-data";

const EMPTY_FORM: AdminHomeHero = {
  title: "",
  description: "",
  primaryButtonLabel: "",
  primaryButtonHref: "",
  secondaryButtonLabel: "",
  secondaryButtonHref: "",
  desktopImageUrl: null,
  desktopImageKey: null,
  mobileImageUrl: null,
  mobileImageKey: null,
};

type HomeHeroFieldProps = {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly multiline?: boolean;
  readonly rows?: number;
  readonly required?: boolean;
  readonly hint?: string;
};

function HomeHeroField({
  id,
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  required,
  hint,
}: HomeHeroFieldProps) {
  return (
    <div>
      <label htmlFor={id} className={HOME_HERO_LABEL_CLASS}>
        {label}
      </label>
      {hint ? <p className="mb-2 text-xs text-[#414141]/55">{hint}</p> : null}
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={HOME_HERO_INPUT_CLASS}
        />
      ) : (
        <input
          id={id}
          name={id}
          type="text"
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={HOME_HERO_INPUT_CLASS}
        />
      )}
    </div>
  );
}

function HomeHeroSection({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) {
  return (
    <section className={HOME_HERO_SECTION_CARD_CLASS}>
      <div className={HOME_HERO_SECTION_HEADER_CLASS}>
        <h2 className={HOME_HERO_SECTION_TITLE_CLASS}>{title}</h2>
      </div>
      <div className={HOME_HERO_SECTION_BODY_CLASS}>{children}</div>
    </section>
  );
}

export function AdminHomeHeroPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminHomeHero, []);
  const [draft, setDraft] = useState<AdminHomeHero | null>(null);
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const form = draft ?? data ?? EMPTY_FORM;

  function updateForm<K extends keyof AdminHomeHero>(field: K, value: AdminHomeHero[K]) {
    setDraft((previous) => ({
      ...(previous ?? data ?? EMPTY_FORM),
      [field]: value,
    }));
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setActionError(null);
    setSuccessMessage(null);

    try {
      await updateAdminHomeHero(form);
      setDraft(null);
      setSuccessMessage("Home hero saved.");
      reload();
    } catch (saveError) {
      setActionError(saveError instanceof Error ? saveError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={HOME_HERO_EDITOR_SHELL_CLASS}>
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}

      {!loading && !error ? (
        <form onSubmit={(event) => void handleSave(event)} className={HOME_HERO_EDITOR_CARD_CLASS}>
          <header className={HOME_HERO_EDITOR_HEADER_CLASS}>
            <h1 className={HOME_HERO_EDITOR_TITLE_CLASS}>Home Hero</h1>
          </header>

          <div className={HOME_HERO_EDITOR_BODY_CLASS}>
            {actionError ? <p className={HOME_HERO_ERROR_ALERT_CLASS}>{actionError}</p> : null}
            {successMessage ? <p className={HOME_HERO_SUCCESS_ALERT_CLASS}>{successMessage}</p> : null}

            <HomeHeroSection title="Background image">
              <p className="text-sm leading-relaxed text-[#414141]/70">
                The studio homepage hero background comes from{" "}
                <Link
                  href={SUPERSUDO_PANEL_HERO_SLIDES_PATH}
                  className="font-medium text-[#414141] underline underline-offset-2"
                >
                  Hero slides
                </Link>
                . Manage published slides there (first published slide is shown).
              </p>
            </HomeHeroSection>

            <HomeHeroSection title="Hero copy">
              <HomeHeroField
                id="home-hero-title"
                label="Hero title"
                value={form.title}
                onChange={(value) => updateForm("title", value)}
                multiline
                rows={5}
                required
                hint="Use line breaks for the multi-line hero. The first word of the second line uses the accent color."
              />
              <HomeHeroField
                id="home-hero-description"
                label="Hero description"
                value={form.description}
                onChange={(value) => updateForm("description", value)}
                multiline
                rows={4}
                required
              />
            </HomeHeroSection>

            <HomeHeroSection title="Buttons">
              <div className="grid gap-4 sm:grid-cols-2">
                <HomeHeroField
                  id="home-hero-primary-label"
                  label="Primary button label"
                  value={form.primaryButtonLabel}
                  onChange={(value) => updateForm("primaryButtonLabel", value)}
                  required
                />
                <HomeHeroField
                  id="home-hero-primary-href"
                  label="Primary button link"
                  value={form.primaryButtonHref}
                  onChange={(value) => updateForm("primaryButtonHref", value)}
                  required
                />
                <HomeHeroField
                  id="home-hero-secondary-label"
                  label="Secondary button label"
                  value={form.secondaryButtonLabel}
                  onChange={(value) => updateForm("secondaryButtonLabel", value)}
                  required
                />
                <HomeHeroField
                  id="home-hero-secondary-href"
                  label="Secondary button link"
                  value={form.secondaryButtonHref}
                  onChange={(value) => updateForm("secondaryButtonHref", value)}
                  required
                />
              </div>
            </HomeHeroSection>
          </div>

          <footer className={HOME_HERO_FOOTER_CLASS}>
            <button type="submit" disabled={saving} className={HOME_HERO_SAVE_BUTTON_CLASS}>
              {saving ? "Saving…" : "Save hero"}
            </button>
          </footer>
        </form>
      ) : null}
    </div>
  );
}
