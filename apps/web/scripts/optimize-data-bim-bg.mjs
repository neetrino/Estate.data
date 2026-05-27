/**
 * Regenerates responsive /data-bim page background WebP variants.
 * Source: public/images/data-bim-bg-source.png (or .jpg / .jpeg).
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public/images");

const SOURCE_CANDIDATES = [
  path.join(IMAGES_DIR, "data-bim-bg-source.png"),
  path.join(IMAGES_DIR, "data-bim-bg-source.jpg"),
  path.join(IMAGES_DIR, "data-bim-bg-source.jpeg"),
];

const WEBP_OPTS = { quality: 92, effort: 6, smartSubsample: true };

const VARIANTS = [
  { name: "data-bim-bg-1024.webp", width: 1024 },
  { name: "data-bim-bg-1920.webp", width: 1920 },
  { name: "data-bim-bg-2560.webp", width: 2560 },
];

function resolveSource() {
  for (const candidate of SOURCE_CANDIDATES) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `No source found. Add public/images/data-bim-bg-source.png (recommended ≥1920px wide).`,
  );
}

async function exportVariant(source, { name, width }) {
  const out = path.join(IMAGES_DIR, name);
  const meta = await sharp(source).metadata();
  const pipeline = sharp(source).resize(width, null, {
    fit: "inside",
    withoutEnlargement: false,
    kernel: sharp.kernel.lanczos3,
  });

  if (width > (meta.width ?? 0)) {
    pipeline.sharpen({ sigma: 0.6, m1: 0.5, m2: 0.35 });
  }

  const info = await pipeline.webp(WEBP_OPTS).toFile(out);
  return { name, ...info };
}

const source = resolveSource();
const meta = await sharp(source).metadata();
console.log(`Source: ${source} (${meta.width}x${meta.height})`);

const results = [];
for (const variant of VARIANTS) {
  results.push(await exportVariant(source, variant));
}

console.log(JSON.stringify(results, null, 2));
