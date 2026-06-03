"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/ui/AdminTable";
import { fetchAdminMedia, uploadAdminMedia } from "@/features/admin/services/admin-api";
function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function AdminMediaPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminMedia, []);
  const configured = data?.configured ?? false;
  const items = data?.items ?? [];
  const [actionError, setActionError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    if (!file) {
      setActionError("Choose a file to upload");
      return;
    }

    setUploading(true);
    try {
      await uploadAdminMedia(file);
      setFile(null);
      reload();
    } catch (uploadError) {
      setActionError(uploadError instanceof Error ? uploadError.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Media"
        description="Upload files to R2 storage. Listing requires R2 environment configuration."
      />

      <form
        onSubmit={(event) => void handleUpload(event)}
        className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-foreground/10 bg-white p-5"
      >
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-brand-navy">File</span>
          <input
            type="file"
            accept="image/*,video/mp4"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block text-sm"
          />
        </label>
        <AdminButton type="submit" disabled={uploading}>
          {uploading ? "Uploading…" : "Upload media"}
        </AdminButton>
      </form>

      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}

      {!loading && !error && !configured ? (
        <AdminEmptyState
          title="Media listing not configured"
          message="Media listing is not configured yet. Upload endpoint exists when R2 credentials are set."
        />
      ) : null}

      {!loading && !error && configured && items.length === 0 ? (
        <AdminEmptyState title="No media files" message="Upload media using the form above." />
      ) : null}

      {!loading && !error && configured && items.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Modified</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.key} className="border-b border-foreground/5">
                <td className="px-4 py-3 text-sm font-medium text-brand-navy">{item.key}</td>
                <td className="px-4 py-3">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-purple"
                  >
                    Open
                  </a>
                </td>
                <td className="px-4 py-3 text-sm">{formatBytes(item.size)}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(item.lastModified).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      ) : null}
    </>
  );
}
