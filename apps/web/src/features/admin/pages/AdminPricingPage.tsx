"use client";

import { PRICING_CARD_ACCENTS } from "@estate/db";
import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminCheckboxField } from "@/features/admin/components/ui/AdminCheckboxField";
import { AdminConfirmDialog } from "@/features/admin/components/ui/AdminConfirmDialog";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminModal } from "@/features/admin/components/ui/AdminModal";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";
import {
  createAdminPricingPackage,
  deleteAdminPricingPackage,
  fetchAdminPricing,
  updateAdminPricingPackage,
} from "@/features/admin/services/admin-api";
import type { AdminPricingPackage } from "@/features/admin/types/admin-data";

type PackageFormState = {
  id: string;
  categoryKey: string;
  name: string;
  price: string;
  priceSuffixOverride: string;
  features: string;
  bookLabel: string;
  bookHref: string;
  cardAccent: string;
  highlighted: boolean;
  badgeLabel: string;
  sortOrder: string;
  published: boolean;
};

const EMPTY_FORM: PackageFormState = {
  id: "",
  categoryKey: "media",
  name: "",
  price: "",
  priceSuffixOverride: "",
  features: "",
  bookLabel: "Book now",
  bookHref: "/contact",
  cardAccent: "",
  highlighted: false,
  badgeLabel: "",
  sortOrder: "0",
  published: true,
};

function featuresToText(features: string[]): string {
  return features.join("\n");
}

function textToFeatures(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function AdminPricingPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminPricing, []);
  const categories = data?.categories ?? [];
  const [actionError, setActionError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPricingPackage | null>(null);
  const [form, setForm] = useState<PackageFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate(categoryKey: string) {
    setEditing(null);
    setForm({ ...EMPTY_FORM, categoryKey });
    setModalOpen(true);
  }

  function openEdit(pkg: AdminPricingPackage) {
    setEditing(pkg);
    setForm({
      id: pkg.id,
      categoryKey: pkg.categoryKey,
      name: pkg.name,
      price: pkg.price,
      priceSuffixOverride: pkg.priceSuffixOverride ?? "",
      features: featuresToText(pkg.features),
      bookLabel: pkg.bookLabel,
      bookHref: pkg.bookHref,
      cardAccent: pkg.cardAccent ?? "",
      highlighted: pkg.highlighted,
      badgeLabel: pkg.badgeLabel ?? "",
      sortOrder: String(pkg.sortOrder),
      published: pkg.published,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const features = textToFeatures(form.features);
      const shared = {
        name: form.name,
        price: form.price,
        priceSuffixOverride: form.priceSuffixOverride || null,
        features,
        bookLabel: form.bookLabel,
        bookHref: form.bookHref,
        cardAccent: form.cardAccent || null,
        highlighted: form.highlighted,
        badgeLabel: form.badgeLabel || null,
        sortOrder: Number(form.sortOrder),
        published: form.published,
      };

      if (editing) {
        await updateAdminPricingPackage(editing.id, shared);
      } else {
        await createAdminPricingPackage({
          id: form.id,
          categoryKey: form.categoryKey as "media" | "analytics",
          ...shared,
        });
      }

      setModalOpen(false);
      reload();
    } catch (saveError) {
      setActionError(saveError instanceof Error ? saveError.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) {
      return;
    }

    setSaving(true);
    try {
      await deleteAdminPricingPackage(deleteId);
      setDeleteId(null);
      reload();
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Pricing"
        description="Manage pricing categories and packages."
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}

      {!loading && !error
        ? categories.map((category) => (
            <section key={category.key} className={`${ADMIN_CARD_CLASS} mb-6`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-brand-navy">
                    {category.sectionTitle}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {category.key} · suffix: {category.priceSuffix}
                  </p>
                </div>
                <AdminButton onClick={() => openCreate(category.key)}>Add package</AdminButton>
              </div>
              <ul className="mt-4 divide-y divide-foreground/10">
                {category.packages.map((pkg) => (
                  <li
                    key={pkg.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3"
                  >
                    <div>
                      <p className="font-medium text-brand-navy">
                        {pkg.name}{" "}
                        <span className="text-muted-foreground">({pkg.price})</span>
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {pkg.published ? (
                          <AdminBadge label="Published" tone="success" />
                        ) : (
                          <AdminBadge label="Draft" tone="muted" />
                        )}
                        {pkg.highlighted ? <AdminBadge label="Highlighted" /> : null}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <AdminButton variant="secondary" onClick={() => openEdit(pkg)}>
                        Edit
                      </AdminButton>
                      <AdminButton variant="danger" onClick={() => setDeleteId(pkg.id)}>
                        Delete
                      </AdminButton>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))
        : null}

      <AdminModal
        open={modalOpen}
        title={editing ? "Edit package" : "New package"}
        onClose={() => setModalOpen(false)}
        footer={
          <>
            <AdminButton variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={() => void handleSave()} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          {!editing ? (
            <>
              <AdminFormField
                label="Package id"
                name="id"
                value={form.id}
                onChange={(v) => setForm((p) => ({ ...p, id: v }))}
                hint="Lowercase slug, e.g. starter-plan"
                required
              />
              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-brand-navy">Category</span>
                <select
                  value={form.categoryKey}
                  onChange={(e) => setForm((p) => ({ ...p, categoryKey: e.target.value }))}
                  className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm"
                >
                  <option value="media">media</option>
                  <option value="analytics">analytics</option>
                </select>
              </label>
            </>
          ) : null}
          <AdminFormField label="Name" name="name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} required />
          <AdminFormField label="Price" name="price" value={form.price} onChange={(v) => setForm((p) => ({ ...p, price: v }))} required />
          <AdminFormField label="Price suffix override" name="priceSuffixOverride" value={form.priceSuffixOverride} onChange={(v) => setForm((p) => ({ ...p, priceSuffixOverride: v }))} />
          <AdminFormField label="Features (one per line)" name="features" value={form.features} onChange={(v) => setForm((p) => ({ ...p, features: v }))} multiline rows={6} required />
          <AdminFormField label="Book label" name="bookLabel" value={form.bookLabel} onChange={(v) => setForm((p) => ({ ...p, bookLabel: v }))} />
          <AdminFormField label="Book href" name="bookHref" value={form.bookHref} onChange={(v) => setForm((p) => ({ ...p, bookHref: v }))} />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-brand-navy">Card accent</span>
            <select
              value={form.cardAccent}
              onChange={(e) => setForm((p) => ({ ...p, cardAccent: e.target.value }))}
              className="w-full rounded-lg border border-foreground/15 px-3 py-2 text-sm"
            >
              <option value="">None</option>
              {PRICING_CARD_ACCENTS.map((accent) => (
                <option key={accent} value={accent}>
                  {accent}
                </option>
              ))}
            </select>
          </label>
          <AdminFormField label="Badge label" name="badgeLabel" value={form.badgeLabel} onChange={(v) => setForm((p) => ({ ...p, badgeLabel: v }))} />
          <AdminFormField label="Sort order" name="sortOrder" type="number" value={form.sortOrder} onChange={(v) => setForm((p) => ({ ...p, sortOrder: v }))} />
          <AdminCheckboxField label="Highlighted" checked={form.highlighted} onChange={(c) => setForm((p) => ({ ...p, highlighted: c }))} />
          <AdminCheckboxField label="Published" checked={form.published} onChange={(c) => setForm((p) => ({ ...p, published: c }))} />
        </div>
      </AdminModal>

      <AdminConfirmDialog
        open={deleteId !== null}
        title="Delete package?"
        message="This removes the pricing package from the database."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void handleDelete()}
        busy={saving}
      />
    </>
  );
}
