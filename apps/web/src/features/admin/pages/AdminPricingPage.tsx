"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminPricingPackageRow } from "@/features/admin/components/AdminPricingPackageRow";
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

const MEDIA_CATEGORY_KEY = "media";
const PACKAGE_QUOTE_HREF = "/#quote";

type PackageFormState = {
  id: string;
  name: string;
  price: string;
  features: string;
  bookLabel: string;
  bookHref: string;
  highlighted: boolean;
  badgeLabel: string;
  sortOrder: string;
  published: boolean;
};

const EMPTY_FORM: PackageFormState = {
  id: "",
  name: "",
  price: "",
  features: "",
  bookLabel: "Book",
  bookHref: PACKAGE_QUOTE_HREF,
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
  const category = data?.categories.find((item) => item.key === MEDIA_CATEGORY_KEY);
  const packages = category?.packages ?? [];
  const [actionError, setActionError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPricingPackage | null>(null);
  const [form, setForm] = useState<PackageFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(pkg: AdminPricingPackage) {
    setEditing(pkg);
    setForm({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      features: featuresToText(pkg.features),
      bookLabel: pkg.bookLabel,
      bookHref: pkg.bookHref,
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
      const shared = {
        name: form.name,
        price: form.price,
        features: textToFeatures(form.features),
        bookLabel: form.bookLabel,
        bookHref: form.bookHref,
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
          categoryKey: MEDIA_CATEGORY_KEY,
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
        description="Shoot packages shown on the public Packages section."
        actions={<AdminButton onClick={openCreate}>Add package</AdminButton>}
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}

      {!loading && !error ? (
        <section className={`${ADMIN_CARD_CLASS} mb-6`}>
          <h2 className="text-lg font-semibold text-brand-navy">
            {category?.sectionTitle || "Packages"}
          </h2>
          <ul className="mt-4 divide-y divide-foreground/10">
            {packages.map((pkg) => (
              <AdminPricingPackageRow
                key={pkg.id}
                pkg={pkg}
                onEdit={() => openEdit(pkg)}
                onDelete={() => setDeleteId(pkg.id)}
              />
            ))}
          </ul>
        </section>
      ) : null}

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
            <AdminFormField
              label="Package id"
              name="id"
              value={form.id}
              onChange={(value) => setForm((prev) => ({ ...prev, id: value }))}
              hint="Lowercase slug, e.g. essential"
              required
            />
          ) : null}
          <AdminFormField
            label="Name"
            name="name"
            value={form.name}
            onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
            required
          />
          <AdminFormField
            label="Price"
            name="price"
            value={form.price}
            onChange={(value) => setForm((prev) => ({ ...prev, price: value }))}
            required
          />
          <AdminFormField
            label="Features (one per line)"
            name="features"
            value={form.features}
            onChange={(value) => setForm((prev) => ({ ...prev, features: value }))}
            multiline
            rows={6}
            required
          />
          <AdminFormField
            label="Book label"
            name="bookLabel"
            value={form.bookLabel}
            onChange={(value) => setForm((prev) => ({ ...prev, bookLabel: value }))}
          />
          <AdminFormField
            label="Book href"
            name="bookHref"
            value={form.bookHref}
            onChange={(value) => setForm((prev) => ({ ...prev, bookHref: value }))}
          />
          <AdminFormField
            label="Badge label"
            name="badgeLabel"
            value={form.badgeLabel}
            onChange={(value) => setForm((prev) => ({ ...prev, badgeLabel: value }))}
            hint="Optional, e.g. Most complete"
          />
          <AdminFormField
            label="Sort order"
            name="sortOrder"
            type="number"
            value={form.sortOrder}
            onChange={(value) => setForm((prev) => ({ ...prev, sortOrder: value }))}
          />
          <AdminCheckboxField
            label="Highlighted"
            checked={form.highlighted}
            onChange={(checked) => setForm((prev) => ({ ...prev, highlighted: checked }))}
          />
          <AdminCheckboxField
            label="Published"
            checked={form.published}
            onChange={(checked) => setForm((prev) => ({ ...prev, published: checked }))}
          />
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
