"use client";

import { PORTFOLIO_MEDIA_CATEGORIES } from "@estate/db";
import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import {
  AdminPortfolioProjectModal,
  type PortfolioFormState,
} from "@/features/admin/components/AdminPortfolioProjectModal";
import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminConfirmDialog } from "@/features/admin/components/ui/AdminConfirmDialog";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminTable } from "@/features/admin/components/ui/AdminTable";
import {
  createAdminPortfolioProject,
  deleteAdminPortfolioProject,
  fetchAdminPortfolio,
  updateAdminPortfolioProject,
  uploadAdminImage,
} from "@/features/admin/services/admin-api";
import {
  ADMIN_TABLE_CELL_CLASS,
  ADMIN_TABLE_HEAD_ROW_CLASS,
  ADMIN_TABLE_THUMB_IMG_CLASS,
  ADMIN_TABLE_THUMB_WRAP_CLASS,
} from "@/features/admin/styles/admin-panel-classes";
import type { AdminPortfolioProject } from "@/features/admin/types/admin-data";
import {
  buildPortfolioImageAlt,
  parseRecentWorkAlt,
  portfolioHas3D,
  portfolioHasVideo,
  servicesListFromText,
  servicesTextFromList,
} from "@/features/home/content/parseRecentWorkAlt";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const EMPTY_FORM: PortfolioFormState = {
  imageUrl: "",
  title: "",
  location: "",
  servicesText: "",
  hasVideo: false,
  has3D: false,
  category: PORTFOLIO_MEDIA_CATEGORIES[0],
  sortOrder: "0",
  featuredOnHome: false,
  published: true,
};

const IMAGE_REQUIRED_MESSAGE = "Upload an image before saving.";
const TITLE_REQUIRED_MESSAGE = "Title is required.";
const IMAGE_UPLOAD_FAILED_MESSAGE = "Upload failed";

function projectToForm(item: AdminPortfolioProject): PortfolioFormState {
  const parsed = parseRecentWorkAlt(item.imageAlt);
  return {
    imageUrl: item.imageUrl,
    title: parsed.title,
    location: parsed.location ?? "",
    servicesText: servicesTextFromList(parsed.services),
    hasVideo: portfolioHasVideo(item.imageAlt),
    has3D: portfolioHas3D(item.imageAlt),
    category: item.category,
    sortOrder: String(item.sortOrder),
    featuredOnHome: item.featuredOnHome,
    published: item.published,
  };
}

export function AdminPortfolioPage() {
  const { data, loading, error, reload } = useAdminQuery(fetchAdminPortfolio, []);
  const items = data ?? [];
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminPortfolioProject | null>(null);
  const [form, setForm] = useState<PortfolioFormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setActionError(null);
    setImageError(null);
    setTitleError(null);
    setModalOpen(true);
  }

  function openEdit(item: AdminPortfolioProject) {
    setEditing(item);
    setForm(projectToForm(item));
    setActionError(null);
    setImageError(null);
    setTitleError(null);
    setModalOpen(true);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setActionError(null);
    setImageError(null);
    try {
      const uploaded = await uploadAdminImage(file);
      setForm((prev) => ({ ...prev, imageUrl: uploaded.publicUrl }));
    } catch (uploadError) {
      setImageError(
        uploadError instanceof Error ? uploadError.message : IMAGE_UPLOAD_FAILED_MESSAGE,
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    const title = form.title.trim();
    if (!form.imageUrl.trim()) {
      setImageError(IMAGE_REQUIRED_MESSAGE);
      return;
    }
    if (!title) {
      setTitleError(TITLE_REQUIRED_MESSAGE);
      return;
    }

    setSaving(true);
    setActionError(null);
    try {
      const body = {
        imageUrl: form.imageUrl,
        imageAlt: buildPortfolioImageAlt({
          title,
          location: form.location,
          services: servicesListFromText(form.servicesText),
          hasVideo: form.hasVideo,
          has3D: form.has3D,
        }),
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
      {actionError && !modalOpen ? <AdminErrorState message={actionError} /> : null}
      {!loading && !error && items.length === 0 ? (
        <AdminEmptyState title="No projects" message="Create your first portfolio project." />
      ) : null}
      {!loading && !error && items.length > 0 ? (
        <PortfolioTable items={items} onEdit={openEdit} onDelete={setDeleteId} />
      ) : null}
      <AdminPortfolioProjectModal
        open={modalOpen}
        editing={editing !== null}
        form={form}
        saving={saving}
        uploading={uploading}
        actionError={actionError}
        imageError={imageError}
        titleError={titleError}
        onClose={() => setModalOpen(false)}
        onSave={() => void handleSave()}
        onFormChange={(patch) => setForm((prev) => ({ ...prev, ...patch }))}
        onTitleChange={(value) => {
          setTitleError(null);
          setForm((prev) => ({ ...prev, title: value }));
        }}
        onUpload={handleImageUpload}
      />
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

function PortfolioTable({
  items,
  onEdit,
  onDelete,
}: {
  readonly items: readonly AdminPortfolioProject[];
  readonly onEdit: (item: AdminPortfolioProject) => void;
  readonly onDelete: (id: string) => void;
}) {
  return (
    <AdminTable>
      <thead>
        <tr className={ADMIN_TABLE_HEAD_ROW_CLASS}>
          <th className={ADMIN_TABLE_CELL_CLASS}>Title</th>
          <th className={ADMIN_TABLE_CELL_CLASS}>Category</th>
          <th className={ADMIN_TABLE_CELL_CLASS}>Status</th>
          <th className={ADMIN_TABLE_CELL_CLASS}>Order</th>
          <th className={`${ADMIN_TABLE_CELL_CLASS} text-right`}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const parsed = parseRecentWorkAlt(item.imageAlt);
          return (
            <tr key={item.id} className="border-b border-foreground/5">
              <td className={ADMIN_TABLE_CELL_CLASS}>
                <div className={ADMIN_TABLE_THUMB_WRAP_CLASS}>
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail
                    <img
                      src={normalizePublicAssetUrl(item.imageUrl)}
                      alt={item.imageAlt}
                      className={ADMIN_TABLE_THUMB_IMG_CLASS}
                    />
                  ) : null}
                  <p className="font-medium text-brand-navy">{parsed.title}</p>
                  {parsed.location ? (
                    <p className="text-xs text-muted-foreground">{parsed.location}</p>
                  ) : null}
                </div>
              </td>
              <td className={ADMIN_TABLE_CELL_CLASS}>{item.category}</td>
              <td className={ADMIN_TABLE_CELL_CLASS}>
                <div className="flex flex-wrap gap-1">
                  {item.published ? (
                    <AdminBadge label="Published" tone="success" />
                  ) : (
                    <AdminBadge label="Draft" tone="muted" />
                  )}
                  {item.featuredOnHome ? <AdminBadge label="Featured" /> : null}
                </div>
              </td>
              <td className={ADMIN_TABLE_CELL_CLASS}>{item.sortOrder}</td>
              <td className={`${ADMIN_TABLE_CELL_CLASS} text-right`}>
                <div className="flex justify-end gap-2">
                  <AdminButton variant="secondary" onClick={() => onEdit(item)}>
                    Edit
                  </AdminButton>
                  <AdminButton variant="danger" onClick={() => onDelete(item.id)}>
                    Delete
                  </AdminButton>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </AdminTable>
  );
}
