"use client";

import { PORTFOLIO_MEDIA_CATEGORIES } from "@estate/db";
import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import {
  AdminPortfolioProjectModal,
  type PortfolioFormState,
} from "@/features/admin/components/AdminPortfolioProjectModal";
import { AdminPortfolioSortableList } from "@/features/admin/components/AdminPortfolioSortableList";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminConfirmDialog } from "@/features/admin/components/ui/AdminConfirmDialog";
import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  createAdminPortfolioProject,
  deleteAdminPortfolioProject,
  fetchAdminPortfolio,
  reorderAdminPortfolioProjects,
  updateAdminPortfolioProject,
  uploadAdminImage,
} from "@/features/admin/services/admin-api";
import type { AdminPortfolioProject } from "@/features/admin/types/admin-data";
import {
  buildPortfolioImageAlt,
  parseRecentWorkAlt,
  portfolioHas3D,
  portfolioHasVideo,
  servicesListFromText,
  servicesTextFromList,
} from "@/features/home/content/parseRecentWorkAlt";

const EMPTY_FORM: PortfolioFormState = {
  imageUrl: "",
  title: "",
  location: "",
  servicesText: "",
  hasVideo: false,
  has3D: false,
  category: PORTFOLIO_MEDIA_CATEGORIES[0],
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

  async function handleReorder(ids: readonly string[]) {
    setActionError(null);
    try {
      await reorderAdminPortfolioProjects(ids);
      reload();
    } catch (reorderError) {
      setActionError(reorderError instanceof Error ? reorderError.message : "Reorder failed");
      reload();
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
        <AdminPortfolioSortableList
          items={items}
          onEdit={openEdit}
          onDelete={setDeleteId}
          onReorder={handleReorder}
        />
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
