"use client";

import { Fragment, useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminConfirmDialog } from "@/features/admin/components/ui/AdminConfirmDialog";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/ui/AdminTable";
import {
  deleteAdminContactInquiry,
  fetchAdminContactInquiries,
} from "@/features/admin/services/admin-api";
export function AdminContactInquiriesPage() {
  const [search, setSearch] = useState("");
  const { data, loading, error, reload, setLoading } = useAdminQuery(
    () => fetchAdminContactInquiries({ search: search || undefined, limit: 100 }),
    [search],
  );
  const items = data ?? [];
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [actionError, setActionError] = useState<string | null>(null);

  async function handleDelete() {
    if (!deleteId) {
      return;
    }

    setBusy(true);
    try {
      await deleteAdminContactInquiry(deleteId);
      setDeleteId(null);
      reload();
    } catch (deleteError) {
      setActionError(deleteError instanceof Error ? deleteError.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Contact inquiries"
        description="Submissions from the public contact form."
        actions={
          <AdminButton variant="secondary" onClick={reload}>
            Refresh
          </AdminButton>
        }
      />

      <div className="mb-4 max-w-md">
        <AdminFormField
          label="Search"
          name="search"
          value={search}
          onChange={(value) => {
            setLoading(true);
            setSearch(value);
          }}
          hint="Filter by name, email, or address"
        />
      </div>

      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}

      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="No inquiries" message="New form submissions will appear here." />
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Fragment key={item.id}>
                <tr className="border-b border-foreground/5">
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      className="cursor-pointer text-left"
                      onClick={() =>
                        setExpandedId(expandedId === item.id ? null : item.id)
                      }
                    >
                      <p className="font-medium text-brand-navy">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                    </button>
                  </td>
                  <td className="px-4 py-3">{item.service}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <AdminButton variant="danger" onClick={() => setDeleteId(item.id)}>
                      Delete
                    </AdminButton>
                  </td>
                </tr>
                {expandedId === item.id ? (
                  <tr>
                    <td colSpan={4} className="bg-neutral-50 px-4 py-3 text-sm">
                      <p>
                        <strong>Property:</strong> {item.propertyAddress ?? "—"}
                      </p>
                      {item.phone ? (
                        <p className="mt-1">
                          <strong>Phone:</strong> {item.phone}
                        </p>
                      ) : null}
                      {item.company ? (
                        <p className="mt-1">
                          <strong>Company:</strong> {item.company}
                        </p>
                      ) : null}
                      {item.preferredDate ? (
                        <p className="mt-1">
                          <strong>Preferred date:</strong> {item.preferredDate}
                        </p>
                      ) : null}
                      {item.projectDetails ? (
                        <p className="mt-1 whitespace-pre-wrap">
                          <strong>Details:</strong> {item.projectDetails}
                        </p>
                      ) : null}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </AdminTable>
      ) : null}

      <AdminConfirmDialog
        open={deleteId !== null}
        title="Delete inquiry?"
        message="This permanently removes the submission."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => void handleDelete()}
        busy={busy}
      />
    </>
  );
}
