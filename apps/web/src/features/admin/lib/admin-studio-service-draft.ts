export type PricingDraftRow = { label: string; price: string };

export function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((item): item is string => typeof item === "string");
}

export function asPricingRows(value: unknown): PricingDraftRow[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const row = item as { label?: unknown; price?: unknown };
    if (typeof row.label !== "string" || typeof row.price !== "string") {
      return [];
    }
    return [{ label: row.label, price: row.price }];
  });
}

export function parseIncludedLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function parsePricingLines(text: string): PricingDraftRow[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const separator = line.includes("|") ? "|" : "\t";
      const [label = "", ...rest] = line.split(separator);
      return { label: label.trim(), price: rest.join(separator).trim() };
    })
    .filter((row) => row.label.length > 0 && row.price.length > 0);
}

export function formatPricingLines(rows: readonly PricingDraftRow[]): string {
  return rows.map((row) => `${row.label} | ${row.price}`).join("\n");
}
