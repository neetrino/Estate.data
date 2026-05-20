import { redirect } from "next/navigation";
import { DATA_BIM_PATH } from "@/shared/lib/routes";

/** Permanent alias — all traffic goes to canonical `/data-bim`. */
export default function ServicesDataRedirectPage() {
  redirect(DATA_BIM_PATH);
}
