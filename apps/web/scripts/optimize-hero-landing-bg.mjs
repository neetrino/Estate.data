/**
 * Regenerates responsive hero background WebP variants.
 * Drop a high-res source at public/images/hero-landing-bg-source.png (or .jpg).
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public/images");

const SOURCE_CANDIDATES = [
  path.join(IMAGES_DIR, "hero-landing-bg-source.png"),
  path.join(IMAGES_DIR, "hero-landing-bg-source.jpg"),
  path.join(IMAGES_DIR, "hero-landing-bg-source.jpeg"),
];

const WEBP_OPTS = { quality: 92, effort: 6, smartSubsample: true };

const VARIANTS = [
  { name: "hero-landing-bg-1024.webp", width: 1024 },
  { name: "hero-landing-bg-1920.webp", width: 1920 },
  { name: "hero-landing-bg-2560.webp", width: 2560 },
];

function resolveSource() {
  for (const candidate of SOURCE_CANDIDATES) {
    if (existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error(
    `No source found. Add public/images/hero-landing-bg-source.png (recommended ≥2560px wide).`,
  );
}

async function exportVariant(source, { name, width }) {
  const out = path.join(IMAGES_DIR, name);
  const pipeline = sharp(source).resize(width, null, {
    fit: "inside",
    withoutEnlargement: false,
    kernel: sharp.kernel.lanczos3,
  });

  const meta = await sharp(source).metadata();
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

await sharp(path.join(IMAGES_DIR, "hero-landing-bg-2560.webp")).toFile(
  path.join(IMAGES_DIR, "hero-landing-bg.webp"),
);

console.log(JSON.stringify(results, null, 2));
