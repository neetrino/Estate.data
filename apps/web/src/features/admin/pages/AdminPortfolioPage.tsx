"use client";

import { PORTFOLIO_MEDIA_CATEGORIES } from "@estate/db";
import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminCheckboxField } from "@/features/admin/components/ui/AdminCheckboxField";
import { AdminConfirmDialog } from "@/features/admin/components/ui/AdminConfirmDialog";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminModal } from "@/features/admin/components/ui/AdminModal";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/ui/AdminTable";
import {
  createAdminPortfolioProject,
  deleteAdminPortfolioProject,
  fetchAdminPortfolio,
  updateAdminPortfolioProject,
} from "@/features/admin/services/admin-api";
import type { AdminPortfolioProject } from "@/features/admin/types/admin-data";

type PortfolioFormState = {
  imageUrl: string;
  imageAlt: string;
  category: string;
  sortOrder: string;
  featuredOnHome: boolean;
  published: boolean;
};

const EMPTY_FORM: PortfolioFormState = {
  imageUrl: "",
  imageAlt: "",
  category: PORTFOLIO_MEDIA_CATEGORIES[0],
  sortOrder: "0",
  featuredOnHome: false,
  published: true,
};

export function AdminPortfolioPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminPortfolio, []);
  const items = data ?? [];
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPortfolioProject | null>(null);
  const [form, setForm] = useState<PortfolioFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: AdminPortfolioProject) {
    setEditing(item);
    setForm({
      imageUrl: item.imageUrl,
      imageAlt: item.imageAlt,
      category: item.category,
      sortOrder: String(item.sortOrder),
      featuredOnHome: item.featuredOnHome,
      published: item.published,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const body = {
        imageUrl: form.imageUrl,
        imageAlt: form.imageAlt,
        category: form.category,
        sortOrder: Number(form.sortOrder),
        featuredOnHome: form.featuredOnHome,
        published: form.published,
      };
      if (editing) {
        await updateAdminPortfolioProject(editing.id, body);
      } else {
        await createAdminPortfolioProject(body);
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
      await deleteAdminPortfolioProject(deleteId);
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
        title="Portfolio"
        description="Manage portfolio tiles shown on the public site."
        actions={<AdminButton onClick={openCreate}>Add project</AdminButton>}
      />

      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}

      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="No projects" message="Create your first portfolio project." />
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-foreground/5">
                <td className="px-4 py-3">
                  <p className="font-medium text-brand-navy">{item.imageAlt}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {item.imageUrl}
                  </p>
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {item.published ? (
                      <AdminBadge label="Published" tone="success" />
                    ) : (
                      <AdminBadge label="Draft" tone="muted" />
                    )}
                    {item.featuredOnHome ? <AdminBadge label="Featured" /> : null}
                  </div>
                </td>
                <td className="px-4 py-3">{item.sortOrder}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <AdminButton variant="secondary" onClick={() => openEdit(item)}>
                      Edit
                    </AdminButton>
                    <AdminButton variant="danger" onClick={() => setDeleteId(item.id)}>
                      Delete
                    </AdminButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      ) : null}

      <AdminModal
        open={modalOpen}
        title={editing ? "Edit project" : "New project"}
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
          <AdminFormField
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={(value) => setForm((prev) => ({ ...prev, imageUrl: value }))}
            required
          />
          <AdminFormField
            label="Image alt"
            name="imageAlt"
            value={form.imageAlt}
            onChange={(value) => setForm((prev) => ({ ...prev, imageAlt: value }))}
            required
          />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-brand-navy">Category</span>
            <select
              value={form.category}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, category: event.target.value }))
              }
              className="w-full rounded-lg border border-foreground/15 bg-white px-3 py-2 text-sm"
            >
              {PORTFOLIO_MEDIA_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <AdminFormField
            label="Sort order"
            name="sortOrder"
            type="number"
            value={form.sortOrder}
            onChange={(value) => setForm((prev) => ({ ...prev, sortOrder: value }))}
          />
          <AdminCheckboxField
            label="Featured on home"
            checked={form.featuredOnHome}
            onChange={(checked) => setForm((prev) => ({ ...prev, featuredOnHome: checked }))}
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
        title="Delete project?"
        message="This removes the project and its translations."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void handleDelete()}
        busy={saving}
      />
    </>
  );
}
