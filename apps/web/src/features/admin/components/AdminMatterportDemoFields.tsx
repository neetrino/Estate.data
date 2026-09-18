"use client";

import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import {
  DEFAULT_MATTERPORT_DEMO_TITLE,
  matterportEmbedUrl,
  parseMatterportSpaceId,
} from "@/shared/lib/matterportEmbed";

type AdminMatterportDemoFieldsProps = {
  readonly serviceId: string;
  readonly demoLabel: string;
  readonly demoSpaceId: string;
  readonly onLabelChange: (value: string) => void;
  readonly onSpaceIdChange: (value: string) => void;
};

function MatterportUrlPreview({ value }: { readonly value: string }) {
  const spaceId = parseMatterportSpaceId(value);
  if (!spaceId) {
    return null;
  }
  return (
    <div className="overflow-hidden rounded-xl border border-foreground/10 bg-black">
      <iframe
        title={DEFAULT_MATTERPORT_DEMO_TITLE}
        src={matterportEmbedUrl(spaceId)}
        loading="lazy"
        allow="xr-spatial-tracking; fullscreen"
        allowFullScreen
        className="aspect-video w-full border-0"
      />
    </div>
  );
}

/** Tours-only fields for the public Matterport iframe. */
export function AdminMatterportDemoFields({
  serviceId,
  demoLabel,
  demoSpaceId,
  onLabelChange,
  onSpaceIdChange,
}: AdminMatterportDemoFieldsProps) {
  return (
    <div className="space-y-4 rounded-xl border border-foreground/10 bg-neutral-50/80 p-4">
      <p className="text-sm font-semibold text-brand-navy">3D tour demo</p>
      <p className="text-xs text-muted-foreground">
        This is not an image upload. In Matterport open Share, copy the link, and paste it
        below. “Construction Site” and the Matterport logo come from Matterport itself.
      </p>
      <AdminFormField
        label="Demo caption"
        name={`demo-label-${serviceId}`}
        value={demoLabel}
        onChange={onLabelChange}
        hint='Shown above the tour, e.g. “Interactive demo”'
      />
      <AdminFormField
        label="Matterport URL"
        name={`demo-space-${serviceId}`}
        value={demoSpaceId}
        onChange={onSpaceIdChange}
        hint="Paste https://my.matterport.com/show/?m=… — Save uses the space id from m="
      />
      <MatterportUrlPreview value={demoSpaceId} />
    </div>
  );
}
