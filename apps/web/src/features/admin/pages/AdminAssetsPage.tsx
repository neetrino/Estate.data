"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/ui/AdminTable";
import { fetchAdminAssets, uploadAdminAsset } from "@/features/admin/services/admin-api";
function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function AdminAssetsPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminAssets, []);
  const items = data ?? [];
  const [actionError, setActionError] = useState<string | null>(null);
  const [key, setKey] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(event: React.FormEvent) {
    event.preventDefault();
    if (!key.trim() || !file) {
      setActionError("Key and file are required");
      return;
    }

    setUploading(true);
    setActionError(null);
    try {
      await uploadAdminAsset(key.trim(), file);
      setKey("");
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
        title="Assets"
        description="Binary assets stored in the database and served via /api/v1/assets."
      />

      <form
        onSubmit={(event) => void handleUpload(event)}
        className="mb-6 grid gap-4 rounded-xl border border-foreground/10 bg-white p-5 sm:grid-cols-2"
      >
        <AdminFormField label="Asset key" name="key" value={key} onChange={setKey} required />
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-brand-navy">File</span>
          <input
            type="file"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="block w-full text-sm"
            required
          />
        </label>
        <div className="sm:col-span-2">
          <AdminButton type="submit" disabled={uploading}>
            {uploading ? "Uploading…" : "Upload / replace"}
          </AdminButton>
        </div>
      </form>

      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      {actionError ? <AdminErrorState message={actionError} /> : null}

      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="No assets" message="Upload an asset using the form above." />
      ) : null}

      {!loading && !error && items.length > 0 ? (
        <AdminTable>
          <thead>
            <tr className="border-b border-foreground/10 text-xs tracking-wide text-muted-foreground uppercase">
              <th className="px-4 py-3">Key</th>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-foreground/5">
                <td className="px-4 py-3">
                  <p className="font-medium text-brand-navy">{item.key}</p>
                  <p className="text-xs text-muted-foreground">{item.fileName}</p>
                </td>
                <td className="px-4 py-3">
                  {item.mimeType.startsWith("image/") ? (
                    <a href={item.publicUrl} target="_blank" rel="noopener noreferrer">
                      <span className="text-sm text-brand-purple">Preview image</span>
                    </a>
                  ) : (
                    <a
                      href={item.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-purple"
                    >
                      Open
                    </a>
                  )}
                </td>
                <td className="px-4 py-3 text-sm">{formatBytes(item.byteSize)}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(item.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      ) : null}
    </>
  );
}
