import { redirect } from "next/navigation";
import { SUPERSUDO_PANEL_HOME_HERO_PATH } from "@/features/admin/lib/admin-paths";

export default function SupersudoHeroSlidesPage() {
  redirect(SUPERSUDO_PANEL_HOME_HERO_PATH);
}
