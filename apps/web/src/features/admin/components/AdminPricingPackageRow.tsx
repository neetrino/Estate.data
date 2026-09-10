import { AdminBadge } from "@/features/admin/components/ui/AdminBadge";
import { AdminButton } from "@/features/admin/components/ui/AdminButton";
import type { AdminPricingPackage } from "@/features/admin/types/admin-data";

type AdminPricingPackageRowProps = {
  readonly pkg: AdminPricingPackage;
  readonly onEdit: () => void;
  readonly onDelete: () => void;
};

export function AdminPricingPackageRow({ pkg, onEdit, onDelete }: AdminPricingPackageRowProps) {
  return (
    <li className="flex flex-wrap items-start justify-between gap-3 py-4">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-brand-navy">
          {pkg.name} <span className="text-brand-navy/75">({pkg.price})</span>
        </p>
        <div className="mt-1 flex flex-wrap gap-1">
          {pkg.published ? (
            <AdminBadge label="Published" tone="success" />
          ) : (
            <AdminBadge label="Draft" tone="muted" />
          )}
          {pkg.highlighted ? <AdminBadge label="Highlighted" /> : null}
          {pkg.badgeLabel ? <AdminBadge label={pkg.badgeLabel} /> : null}
        </div>
        <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm text-brand-navy/80">
          {pkg.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <AdminButton variant="secondary" onClick={onEdit}>
          Edit
        </AdminButton>
        <AdminButton variant="danger" onClick={onDelete}>
          Delete
        </AdminButton>
      </div>
    </li>
  );
}
