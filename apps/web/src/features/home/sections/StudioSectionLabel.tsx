import type { ReactNode } from "react";

const LABEL_CLASS = "studio-label text-studio-accent";

const LABEL_DASH_CLASS = "mr-3 inline-block h-px w-8 translate-y-[-4px] bg-studio-accent";

type StudioSectionLabelProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/** Section eyebrow — accent rule followed by the uppercase label. */
export function StudioSectionLabel({ children, className = "" }: StudioSectionLabelProps) {
  return (
    <p className={`${LABEL_CLASS} ${className}`.trim()}>
      <span aria-hidden className={LABEL_DASH_CLASS} />
      {children}
    </p>
  );
}
