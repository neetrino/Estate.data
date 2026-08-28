import { STUDIO_PACKAGE_COMPARE } from "@/features/home/content/studioPackageCompare";
import {
  STUDIO_EYEBROW_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

export function StudioPackageCompare() {
  const copy = STUDIO_PACKAGE_COMPARE;

  return (
    <div className="mt-24">
      <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
      <h3 className={STUDIO_TITLE_CLASS}>{copy.title}</h3>
      <div className="mt-10 overflow-x-auto border border-studio-border">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <thead className="bg-studio-bg">
            <tr>
              <th className="px-4 py-3 font-semibold text-studio-fg">Service</th>
              {copy.columns.map((column) => (
                <th key={column} className="px-4 py-3 font-semibold text-studio-fg">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.rows.map((row) => (
              <tr key={row.service} className="border-t border-studio-border">
                <th className="px-4 py-3 font-medium text-studio-muted">{row.service}</th>
                {row.values.map((value, index) => (
                  <td key={`${row.service}-${copy.columns[index]}`} className="px-4 py-3 text-studio-fg">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
