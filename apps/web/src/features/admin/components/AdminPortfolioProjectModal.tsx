"use client";

import { PORTFOLIO_MEDIA_CATEGORIES } from "@estate/db";
import { AdminImageUploader } from "@/features/admin/components/ui/AdminImageUploader";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminCheckboxField } from "@/features/admin/components/ui/AdminCheckboxField";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminModal } from "@/features/admin/components/ui/AdminModal";
import { ADMIN_INPUT_CLASS } from "@/features/admin/styles/admin-panel-classes";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const MEDIA_TYPE_LABELS: Record<(typeof PORTFOLIO_MEDIA_CATEGORIES)[number], string> = {
  photo: "Photo",
  video: "Video",
  drone: "Drone",
  "3d-tour": "3D Tour",
};

export type PortfolioFormState = {
  imageUrl: string;
  title: string;
  location: string;
  servicesText: string;
  hasVideo: boolean;
  has3D: boolean;
  category: string;
  sortOrder: string;
  featuredOnHome: boolean;
  published: boolean;
};

type AdminPortfolioProjectModalProps = {
  readonly open: boolean;
  readonly editing: boolean;
  readonly form: PortfolioFormState;
  readonly saving: boolean;
  readonly uploading: boolean;
  readonly actionError: string | null;
  readonly imageError: string | null;
  readonly titleError: string | null;
  readonly onClose: () => void;
  readonly onSave: () => void;
  readonly onFormChange: (patch: Partial<PortfolioFormState>) => void;
  readonly onTitleChange: (value: string) => void;
  readonly onUpload: (file: File) => Promise<void>;
};

export function AdminPortfolioProjectModal({
  open,
  editing,
  form,
  saving,
  uploading,
  actionError,
  imageError,
  titleError,
  onClose,
  onSave,
  onFormChange,
  onTitleChange,
  onUpload,
}: AdminPortfolioProjectModalProps) {
  return (
    <AdminModal
      open={open}
      title={editing ? "Edit project" : "New project"}
      onClose={onClose}
      footer={
        <>
          <AdminButton variant="secondary" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton onClick={onSave} disabled={saving || uploading}>
            {saving ? "Saving…" : "Save"}
          </AdminButton>
        </>
      }
    >
      <div className="space-y-6">
        {actionError ? <AdminErrorState message={actionError} /> : null}
        <section className="space-y-4 rounded-2xl border border-foreground/8 bg-white p-5 shadow-sm">
          <AdminImageUploader
            label="Image"
            previewUrl={form.imageUrl ? normalizePublicAssetUrl(form.imageUrl) : null}
            uploading={uploading}
            required
            error={imageError}
            placeholderText="Upload a project image"
            onUpload={onUpload}
          />
          <AdminFormField
            label="Title"
            name="title"
            value={form.title}
            onChange={onTitleChange}
            hint="Headline on the public portfolio card"
            error={titleError ?? undefined}
            required
          />
          <AdminFormField
            label="Location"
            name="location"
            value={form.location}
            onChange={(value) => onFormChange({ location: value })}
            hint="e.g. Malibu, CA"
          />
          <AdminFormField
            label="Services"
            name="services"
            value={form.servicesText}
            onChange={(value) => onFormChange({ servicesText: value })}
            multiline
            rows={4}
            hint="One per line. Shown under the location, joined with ·"
          />
          <div className="grid gap-3 rounded-xl bg-neutral-50/90 p-4 sm:grid-cols-2">
            <AdminCheckboxField
              label="VIDEO badge"
              checked={form.hasVideo}
              onChange={(checked) => onFormChange({ hasVideo: checked })}
            />
            <AdminCheckboxField
              label="3D TOUR badge"
              checked={form.has3D}
              onChange={(checked) => onFormChange({ has3D: checked })}
            />
          </div>
        </section>
        <section className="space-y-4 rounded-2xl border border-foreground/8 bg-white p-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-sm font-medium text-brand-navy">Media type</span>
              <select
                value={form.category}
                onChange={(event) => onFormChange({ category: event.target.value })}
                className={`${ADMIN_INPUT_CLASS} h-10`}
              >
                {PORTFOLIO_MEDIA_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {MEDIA_TYPE_LABELS[category]}
                  </option>
                ))}
              </select>
            </label>
            <AdminFormField
              label="Sort order"
              name="sortOrder"
              type="number"
              value={form.sortOrder}
              onChange={(value) => onFormChange({ sortOrder: value })}
            />
          </div>
          <div className="grid gap-3 rounded-xl bg-neutral-50/90 p-4 sm:grid-cols-2">
            <AdminCheckboxField
              label="Featured on home"
              checked={form.featuredOnHome}
              onChange={(checked) => onFormChange({ featuredOnHome: checked })}
            />
            <AdminCheckboxField
              label="Published"
              checked={form.published}
              onChange={(checked) => onFormChange({ published: checked })}
            />
          </div>
        </section>
      </div>
    </AdminModal>
  );
}
