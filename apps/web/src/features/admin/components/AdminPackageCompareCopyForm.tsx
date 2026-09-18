"use client";

import { AdminFormField } from "@/features/admin/components/ui/AdminFormField";
import { AdminSiteCopyForm } from "@/features/admin/components/AdminSiteCopyForm";
import { formatPipeTable, parsePipeTable } from "@/features/admin/lib/admin-site-copy-lines";
import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";
import {
  SITE_COPY_KEYS,
  type PackageCompareCopy,
} from "@/server/features/site-copy/site-copy.schema";

const COLUMNS_HINT = "One package name per line, left to right in the table.";
const ROWS_HINT = "One row per line. First cell is the service name, then one cell per package, separated by |";

type AdminPackageCompareCopyFormProps = {
  readonly initial: PackageCompareCopy;
  readonly onSaved: () => void;
};

function normalizeCompare(draft: PackageCompareCopy): PackageCompareCopy {
  const columns = draft.columns.map((column) => column.trim()).filter((column) => column.length > 0);
  const width = columns.length;
  return {
    ...draft,
    columns,
    rows: draft.rows
      .filter((row) => row.service.trim().length > 0)
      .map((row) => ({
        service: row.service,
        values: columns.map((_, index) => row.values[index]?.trim() || "—"),
      }))
      .filter((row) => width === 0 || row.values.length === width),
  };
}

export function AdminPackageCompareCopyForm({
  initial,
  onSaved,
}: AdminPackageCompareCopyFormProps) {
  return (
    <AdminSiteCopyForm
      title="Package compare"
      copyKey={SITE_COPY_KEYS.packageCompare}
      initial={initial}
      saveLabel="Save compare table"
      onSaved={onSaved}
      beforeSave={normalizeCompare}
    >
      {(draft, setDraft) => (
        <>
          <AdminFormField
            label="Small label"
            name="compare-eyebrow"
            value={draft.eyebrow}
            onChange={(eyebrow) => setDraft({ ...draft, eyebrow })}
          />
          <AdminFormField
            label="Title"
            name="compare-title"
            value={draft.title}
            onChange={(title) => setDraft({ ...draft, title })}
          />
          <AdminFormField
            label="Package columns"
            name="compare-columns"
            value={draft.columns.join("\n")}
            onChange={(text) =>
              setDraft({ ...draft, columns: parseIncludedLines(text) })
            }
            multiline
            rows={5}
            hint={COLUMNS_HINT}
          />
          <AdminFormField
            label="Rows"
            name="compare-rows"
            value={formatPipeTable(
              draft.rows.map((row) => [row.service, ...row.values]),
            )}
            onChange={(text) => {
              const width = Math.max(draft.columns.length, 2);
              setDraft({
                ...draft,
                rows: parsePipeTable(text, width + 1).map(([service = "", ...values]) => ({
                  service,
                  values: values.slice(0, width),
                })),
              });
            }}
            multiline
            rows={12}
            hint={ROWS_HINT}
          />
        </>
      )}
    </AdminSiteCopyForm>
  );
}
