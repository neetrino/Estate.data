import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import { TRUSTED_STRIP_GUTTER_CLASS } from "@/shared/lib/constants";

const TRUSTED_STRIP_VERTICAL_PADDING_CLASS = "py-5 sm:py-6";

export function HomeTrustedStrip() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;

  return (
    <section
      className="border-t border-zinc-200/80 bg-white"
      aria-label="Trusted real estate partners"
    >
      <div
        className={`w-full ${TRUSTED_STRIP_GUTTER_CLASS} ${TRUSTED_STRIP_VERTICAL_PADDING_CLASS}`}
      >
        <div className="flex flex-nowrap items-center justify-between gap-x-8 overflow-x-auto sm:gap-x-10 lg:gap-x-12">
          <p className="shrink-0 text-sm font-semibold text-zinc-900 sm:text-base">
            {label}
          </p>
          <ul className="flex min-w-0 flex-1 flex-nowrap items-center justify-end gap-x-8 sm:gap-x-10 lg:gap-x-12">
            {partners.map((name) => (
              <li
                key={name}
                className="shrink-0 whitespace-nowrap text-sm font-medium text-zinc-600 sm:text-base"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
