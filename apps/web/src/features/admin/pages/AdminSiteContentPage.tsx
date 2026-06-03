import { AdminEmptyState } from "@/features/admin/components/ui/AdminEmptyState";
import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";

export function AdminSiteContentPage() {
  return (
    <>
      <AdminPageHeader
        title="Site content"
        description="Marketing copy and static sections not yet managed from the database."
      />
      <AdminEmptyState
        title="CMS models coming later"
        message="Most marketing copy is still stored in frontend content files. CMS models for PageSection, SiteSetting, StatItem, Testimonial, ServiceCard, and NavigationItem can be added in a future task."
      />
    </>
  );
}
