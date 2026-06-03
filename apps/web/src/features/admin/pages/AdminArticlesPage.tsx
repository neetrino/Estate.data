"use client";

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
  createAdminArticle,
  deleteAdminArticle,
  fetchAdminArticles,
  updateAdminArticle,
} from "@/features/admin/services/admin-api";
import type { AdminArticle } from "@/features/admin/types/admin-data";

type ArticleFormState = {
  slug: string;
  title: string;
  readTimeLabel: string;
  body: string;
  sortOrder: string;
  published: boolean;
};

const EMPTY_FORM: ArticleFormState = {
  slug: "",
  title: "",
  readTimeLabel: "5 min read",
  body: "",
  sortOrder: "0",
  published: true,
};

export function AdminArticlesPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminArticles, []);
  const items = data ?? [];
  const [modalOpen, setModalOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminArticle | null>(null);
  const [form, setForm] = useState<ArticleFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: AdminArticle) {
    setEditing(item);
    setForm({
      slug: item.slug,
      title: item.title,
      readTimeLabel: item.readTimeLabel,
      body: item.body,
      sortOrder: String(item.sortOrder),
      published: item.published,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const body = {
        slug: form.slug,
        title: form.title,
        readTimeLabel: form.readTimeLabel,
        body: form.body,
        sortOrder: Number(form.sortOrder),
        published: form.published,
      };
      if (editing) {
        await updateAdminArticle(editing.id, body);
      } else {
        await createAdminArticle(body);
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
      await deleteAdminArticle(deleteId);
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
        title="Articles"
        description="Resource articles on the public site."
        actions={<AdminButton onClick={openCreate}>Add article</AdminButton>}
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}
      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="No articles" message="Create your first resource article." />
      ) : null}
      {!loading && !error && items.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-foreground/5">
                <td className="px-4 py-3 font-medium text-brand-navy">{item.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{item.slug}</td>
                <td className="px-4 py-3">
                  {item.published ? (
                    <AdminBadge label="Published" tone="success" />
                  ) : (
                    <AdminBadge label="Draft" tone="muted" />
                  )}
                </td>
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
        title={editing ? "Edit article" : "New article"}
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
          <AdminFormField label="Slug" name="slug" value={form.slug} onChange={(v) => setForm((p) => ({ ...p, slug: v }))} required />
          <AdminFormField label="Title" name="title" value={form.title} onChange={(v) => setForm((p) => ({ ...p, title: v }))} required />
          <AdminFormField label="Read time" name="readTimeLabel" value={form.readTimeLabel} onChange={(v) => setForm((p) => ({ ...p, readTimeLabel: v }))} />
          <AdminFormField label="Body" name="body" value={form.body} onChange={(v) => setForm((p) => ({ ...p, body: v }))} multiline rows={8} required />
          <AdminFormField label="Sort order" name="sortOrder" type="number" value={form.sortOrder} onChange={(v) => setForm((p) => ({ ...p, sortOrder: v }))} />
          <AdminCheckboxField label="Published" checked={form.published} onChange={(c) => setForm((p) => ({ ...p, published: c }))} />
        </div>
      </AdminModal>
      <AdminConfirmDialog open={deleteId !== null} title="Delete article?" message="This removes the article and translations." onCancel={() => setDeleteId(null)} onConfirm={() => void handleDelete()} busy={saving} />
    </>
  );
}
