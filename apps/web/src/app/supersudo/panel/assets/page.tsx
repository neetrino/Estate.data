import { SUPERSUDO_PANEL_PATH } from "@/features/admin/lib/admin-paths";
import { redirect } from "next/navigation";

/** Assets admin UI removed from navigation; redirect to dashboard. */
export default function SupersudoAssetsPage() {
  redirect(SUPERSUDO_PANEL_PATH);
}
