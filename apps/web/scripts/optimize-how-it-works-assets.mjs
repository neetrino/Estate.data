/**
 * Regenerates How it works section background + step icon WebP assets.
 * Background source: public/images/how-it-works-bg-source.png
 * Icon sources: public/images/how-it-works/*-source.png
 */
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public/images");
const ICONS_DIR = path.join(IMAGES_DIR, "how-it-works");

const BG_SOURCE = path.join(IMAGES_DIR, "how-it-works-bg-source.png");
const WEBP_OPTS = { quality: 92, effort: 6, smartSubsample: true };
const ICON_WEBP_OPTS = { quality: 95, effort: 6, smartSubsample: true, lossless: false };

const BG_VARIANTS = [
  { name: "how-it-works-bg-1024.webp", width: 1024 },
  { name: "how-it-works-bg-1920.webp", width: 1920 },
  { name: "how-it-works-bg-2560.webp", width: 2560 },
];

const ICON_SIZES = [160, 320];

async function exportBgVariant(source, { name, width }) {
  const out = path.join(IMAGES_DIR, name);
  const meta = await sharp(source).metadata();
  const pipeline = sharp(source).resize(width, null, {
    fit: "inside",
    withoutEnlargement: false,
    kernel: sharp.kernel.lanczos3,
  });

  if (width > (meta.width ?? 0)) {
    pipeline.sharpen({ sigma: 0.65, m1: 0.5, m2: 0.35 });
  }

  const info = await pipeline.webp(WEBP_OPTS).toFile(out);
  return { name, ...info };
}

async function exportIconVariant(sourcePath, baseName, size) {
  const out = path.join(ICONS_DIR, `${baseName}-${size}.webp`);
  const info = await sharp(sourcePath)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.4, m1: 0.45, m2: 0.3 })
    .webp(ICON_WEBP_OPTS)
    .toFile(out);

  return { name: `${baseName}-${size}.webp`, ...info };
}

if (!existsSync(BG_SOURCE)) {
  throw new Error(`Missing background source: ${BG_SOURCE}`);
}

const bgMeta = await sharp(BG_SOURCE).metadata();
console.log(`Background source: ${BG_SOURCE} (${bgMeta.width}x${bgMeta.height})`);

const bgResults = [];
for (const variant of BG_VARIANTS) {
  bgResults.push(await exportBgVariant(BG_SOURCE, variant));
}

const iconSources = readdirSync(ICONS_DIR).filter((file) => file.endsWith("-source.png"));
const iconResults = [];

for (const file of iconSources) {
  const baseName = file.replace("-source.png", "");
  const sourcePath = path.join(ICONS_DIR, file);

  for (const size of ICON_SIZES) {
    iconResults.push(await exportIconVariant(sourcePath, baseName, size));
  }
}

console.log(JSON.stringify({ background: bgResults, icons: iconResults }, null, 2));
