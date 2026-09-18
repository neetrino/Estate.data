"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminPricingPackageRow } from "@/features/admin/components/AdminPricingPackageRow";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminCheckboxField } from "@/features/admin/components/ui/AdminCheckboxField";
import { AdminConfirmDialog } from "@/features/admin/components/ui/AdminConfirmDialog";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminJumpTargetField } from "@/features/admin/components/ui/AdminJumpTargetField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminModal } from "@/features/admin/components/ui/AdminModal";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  pricingPackageFieldFromApiMessage,
  validatePricingPackageForm,
  type PricingPackageFieldErrors,
} from "@/features/admin/lib/pricing-package-form";
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
  const [pageError, setPageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<PricingPackageFieldErrors>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPricingPackage | null>(null);
  const [form, setForm] = useState<PackageFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setFieldErrors({});
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
    setFormError(null);
    setFieldErrors({});
    setModalOpen(true);
  }

  async function handleSave() {
    const nextFieldErrors = validatePricingPackageForm({
      isCreate: editing === null,
      id: form.id,
      name: form.name,
      price: form.price,
      features: form.features,
    });
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setFormError("Fix the highlighted fields to save this package.");
      return;
    }

    setSaving(true);
    setFormError(null);
    setFieldErrors({});
    try {
      const shared = {
        name: form.name.trim(),
        price: form.price.trim(),
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
          id: form.id.trim(),
          categoryKey: MEDIA_CATEGORY_KEY,
          ...shared,
        });
      }
      setModalOpen(false);
      reload();
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : "Save failed";
      const field = pricingPackageFieldFromApiMessage(message);
      if (field) {
        setFieldErrors({ [field]: message });
      }
      setFormError(message);
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
      setPageError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Prices"
        description="These packages appear on the homepage. Hidden packages stay in this list only."
        actions={<AdminButton onClick={openCreate}>Add a package</AdminButton>}
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {pageError ? <AdminErrorState message={pageError} /> : null}
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
          {formError ? <AdminErrorState message={formError} /> : null}
          {!editing ? (
            <AdminFormField
            label="Short name"
            name="id"
            value={form.id}
            onChange={(value) => setForm((prev) => ({ ...prev, id: value }))}
            hint="One word in lowercase letters, for example essential. You set this only once."
              error={fieldErrors.id}
              required
            />
          ) : null}
          <AdminFormField
            label="Name"
            name="name"
            value={form.name}
            onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
            error={fieldErrors.name}
            required
          />
          <AdminFormField
            label="Price"
            name="price"
            value={form.price}
            onChange={(value) => setForm((prev) => ({ ...prev, price: value }))}
            error={fieldErrors.price}
            required
          />
          <AdminFormField
            label="What is included (one line each)"
            name="features"
            value={form.features}
            onChange={(value) => setForm((prev) => ({ ...prev, features: value }))}
            multiline
            rows={6}
            error={fieldErrors.features}
            required
          />
          <AdminFormField
            label="Button text"
            name="bookLabel"
            value={form.bookLabel}
            onChange={(value) => setForm((prev) => ({ ...prev, bookLabel: value }))}
          />
          <AdminJumpTargetField
            label="Button goes to"
            name="bookHref"
            value={form.bookHref}
            onChange={(value) => setForm((prev) => ({ ...prev, bookHref: value }))}
          />
          <AdminFormField
            label="Small badge"
            name="badgeLabel"
            value={form.badgeLabel}
            onChange={(value) => setForm((prev) => ({ ...prev, badgeLabel: value }))}
            hint="Optional. Example: Most complete"
          />
          <AdminFormField
            label="Position"
            name="sortOrder"
            type="number"
            value={form.sortOrder}
            onChange={(value) => setForm((prev) => ({ ...prev, sortOrder: value }))}
            hint="Smaller number appears first. 1 is at the top."
          />
          <AdminCheckboxField
            label="Pick this package out"
            checked={form.highlighted}
            onChange={(checked) => setForm((prev) => ({ ...prev, highlighted: checked }))}
          />
          <AdminCheckboxField
            label="Show on the website"
            checked={form.published}
            onChange={(checked) => setForm((prev) => ({ ...prev, published: checked }))}
          />
        </div>
      </AdminModal>
      <AdminConfirmDialog
        open={deleteId !== null}
        title="Delete package?"
        message="This removes the package from the website."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void handleDelete()}
        busy={saving}
      />
    </>
  );
}
