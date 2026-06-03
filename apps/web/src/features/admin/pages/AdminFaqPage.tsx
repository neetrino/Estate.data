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
  createAdminFaqItem,
  deleteAdminFaqItem,
  fetchAdminFaq,
  updateAdminFaqItem,
} from "@/features/admin/services/admin-api";
import type { AdminFaqItem } from "@/features/admin/types/admin-data";

type FaqFormState = {
  question: string;
  answer: string;
  sortOrder: string;
  published: boolean;
};

const EMPTY_FORM: FaqFormState = {
  question: "",
  answer: "",
  sortOrder: "0",
  published: true,
};

export function AdminFaqPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminFaq, []);
  const items = data ?? [];
  const [modalOpen, setModalOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminFaqItem | null>(null);
  const [form, setForm] = useState<FaqFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: AdminFaqItem) {
    setEditing(item);
    setForm({
      question: item.question,
      answer: item.answer,
      sortOrder: String(item.sortOrder),
      published: item.published,
    });
    setModalOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const body = {
        question: form.question,
        answer: form.answer,
        sortOrder: Number(form.sortOrder),
        published: form.published,
      };
      if (editing) {
        await updateAdminFaqItem(editing.id, body);
      } else {
        await createAdminFaqItem(body);
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
      await deleteAdminFaqItem(deleteId);
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
      <AdminPageHeader title="FAQ" description="Questions on the resources page." actions={<AdminButton onClick={openCreate}>Add FAQ</AdminButton>} />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}
      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="No FAQ items" message="Add questions for the resources page." />
      ) : null}
      {!loading && !error && items.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Question</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-foreground/5">
                <td className="px-4 py-3 font-medium text-brand-navy">{item.question}</td>
                <td className="px-4 py-3">
                  {item.published ? <AdminBadge label="Published" tone="success" /> : <AdminBadge label="Draft" tone="muted" />}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <AdminButton variant="secondary" onClick={() => openEdit(item)}>Edit</AdminButton>
                    <AdminButton variant="danger" onClick={() => setDeleteId(item.id)}>Delete</AdminButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      ) : null}
      <AdminModal open={modalOpen} title={editing ? "Edit FAQ" : "New FAQ"} onClose={() => setModalOpen(false)} footer={<><AdminButton variant="secondary" onClick={() => setModalOpen(false)}>Cancel</AdminButton><AdminButton onClick={() => void handleSave()} disabled={saving}>{saving ? "Saving…" : "Save"}</AdminButton></>}>
        <div className="space-y-4">
          <AdminFormField label="Question" name="question" value={form.question} onChange={(v) => setForm((p) => ({ ...p, question: v }))} required />
          <AdminFormField label="Answer" name="answer" value={form.answer} onChange={(v) => setForm((p) => ({ ...p, answer: v }))} multiline rows={6} required />
          <AdminFormField label="Sort order" name="sortOrder" type="number" value={form.sortOrder} onChange={(v) => setForm((p) => ({ ...p, sortOrder: v }))} />
          <AdminCheckboxField label="Published" checked={form.published} onChange={(c) => setForm((p) => ({ ...p, published: c }))} />
        </div>
      </AdminModal>
      <AdminConfirmDialog open={deleteId !== null} title="Delete FAQ?" message="This removes the item and translations." onCancel={() => setDeleteId(null)} onConfirm={() => void handleDelete()} busy={saving} />
    </>
  );
}
