import { parseIncludedLines } from "@/features/admin/lib/admin-studio-service-draft";

const PIPE = " | ";

export function parsePipeTable(text: string, columns: number): string[][] {
  if (columns < 1) {
    return [];
  }

  return parseIncludedLines(text).flatMap((line) => {
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length < columns) {
      return [];
    }
    if (parts.length === columns) {
      return [parts];
    }
    return [[...parts.slice(0, columns - 1), parts.slice(columns - 1).join(" | ")]];
  });
}

export function formatPipeTable(rows: readonly (readonly string[])[]): string {
  return rows.map((row) => row.join(PIPE)).join("\n");
}
