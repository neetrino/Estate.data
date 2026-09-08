import { STUDIO_PACKAGE_COMPARE } from "@/features/home/content/studioPackageCompare";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const INCLUDED_MARK = "●";

const EXCLUDED_MARK = "—";

function CompareValue({ value }: { readonly value: string }) {
  if (value === INCLUDED_MARK) {
    return (
      <span className="text-studio-accent" aria-label="Included">
        {INCLUDED_MARK}
      </span>
    );
  }

  if (value === EXCLUDED_MARK) {
    return (
      <span className="text-studio-muted/30" aria-label="Not included">
        {EXCLUDED_MARK}
      </span>
    );
  }

  return <span className="text-xs text-studio-muted">{value}</span>;
}

export function StudioPackageCompare() {
  const copy = STUDIO_PACKAGE_COMPARE;

  return (
    <section className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-md mt-6 text-studio-fg">{copy.title}</h2>
        </StudioReveal>

        <StudioReveal className="mt-12 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-studio-border">
                <th className="studio-label py-4 text-studio-muted">Service</th>
                {copy.columns.map((column) => (
                  <th key={column} className="studio-label py-4 text-center text-studio-fg">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row) => (
                <tr key={row.service} className="border-b border-studio-border/50">
                  <td className="py-4 text-sm text-studio-fg">{row.service}</td>
                  {row.values.map((value, index) => (
                    <td key={`${row.service}-${copy.columns[index]}`} className="py-4 text-center">
                      <CompareValue value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </StudioReveal>

        <div className="mt-10 space-y-8 md:hidden">
          {copy.columns.map((column, columnIndex) => (
            <StudioReveal key={column} className="border border-studio-border p-6">
              <h3 className="font-display text-sm uppercase tracking-[0.24em]">{column}</h3>
              <dl className="mt-5 space-y-2.5">
                {copy.rows.map((row) => (
                  <div key={row.service} className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-studio-muted">{row.service}</dt>
                    <dd>
                      <CompareValue value={row.values[columnIndex] ?? EXCLUDED_MARK} />
                    </dd>
                  </div>
                ))}
              </dl>
            </StudioReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
