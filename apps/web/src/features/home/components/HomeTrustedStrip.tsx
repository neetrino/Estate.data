import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import { TRUSTED_STRIP_TEXT_CLASS } from "@/shared/lib/constants";

const TRUSTED_STRIP_INNER_CLASS = `container mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6 ${TRUSTED_STRIP_TEXT_CLASS}`;

export function HomeTrustedStrip() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;

  return (
    <section
      className="border-t border-zinc-200/80 bg-white"
      aria-label="Trusted real estate partners"
    >
      <div className={TRUSTED_STRIP_INNER_CLASS}>
        <p>{label}</p>
        {partners.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
    </section>
  );
}
