"use client";

import { useState } from "react";
import { useAdminQuery } from "@/features/admin/hooks/useAdminQuery";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import { AdminErrorState } from "@/features/admin/components/ui/AdminErrorState";
import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminLoadingState } from "@/features/admin/components/ui/AdminLoadingState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import {
  fetchAdminStudioServices,
  updateAdminStudioService,
} from "@/features/admin/services/admin-api";
import type { AdminStudioService } from "@/features/admin/types/admin-data";
import { ADMIN_CARD_CLASS } from "@/features/admin/styles/admin-panel-classes";

export function AdminStudioServicesPage() {
  const { data, loading, error, reload } = useAdminQuery(() => fetchAdminStudioServices(), []);
  const services = data ?? [];

  return (
    <>
      <AdminPageHeader
        title="Studio services"
        description="Edit titles, descriptions, images, CTAs, order, and visibility."
      />
      {loading ? <AdminLoadingState /> : null}
      {error ? <AdminErrorState message={error} onRetry={reload} /> : null}
      <ul className="grid gap-4">
        {services.map((service) => (
          <ServiceEditor key={service.id} service={service} onSaved={reload} />
        ))}
      </ul>
    </>
  );
}

function ServiceEditor({
  service,
  onSaved,
}: {
  service: AdminStudioService;
  onSaved: () => void;
}) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [imageUrl, setImageUrl] = useState(service.imageUrl);
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(service.primaryCtaLabel);
  const [primaryCtaHref, setPrimaryCtaHref] = useState(service.primaryCtaHref);

  return (
    <li className={ADMIN_CARD_CLASS}>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{service.sectionKey}</p>
      <AdminFormField label="Title" name={`title-${service.id}`} value={title} onChange={setTitle} />
      <AdminFormField
        label="Description"
        name={`desc-${service.id}`}
        value={description}
        onChange={setDescription}
        multiline
      />
      <AdminFormField
        label="Image URL"
        name={`image-${service.id}`}
        value={imageUrl}
        onChange={setImageUrl}
      />
      <AdminFormField
        label="Primary button"
        name={`cta-${service.id}`}
        value={primaryCtaLabel}
        onChange={setPrimaryCtaLabel}
      />
      <AdminFormField
        label="Primary button href"
        name={`href-${service.id}`}
        value={primaryCtaHref}
        onChange={setPrimaryCtaHref}
      />
      <div className="mt-3 flex gap-2">
        <AdminButton
          onClick={() =>
            void updateAdminStudioService(service.id, {
              title,
              description,
              imageUrl,
              primaryCtaLabel,
              primaryCtaHref,
            }).then(onSaved)
          }
        >
          Save
        </AdminButton>
        <AdminButton
          variant="secondary"
          onClick={() =>
            void updateAdminStudioService(service.id, { published: !service.published }).then(
              onSaved,
            )
          }
        >
          {service.published ? "Unpublish" : "Publish"}
        </AdminButton>
      </div>
    </li>
  );
}
