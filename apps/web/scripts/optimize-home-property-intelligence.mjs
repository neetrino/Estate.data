/**
 * Home Property intelligence section — pastel section bg + BIM visual card.
 * Sources: public/images/property-intelligence/home-section-bg-source.png
 *          public/images/property-intelligence/home-visual-source.png
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public/images/property-intelligence");

const WEBP_OPTS = { quality: 92, effort: 6, smartSubsample: true };

const SECTION_BG_SOURCE = path.join(IMAGES_DIR, "home-section-bg-source.png");
const VISUAL_SOURCE = path.join(IMAGES_DIR, "home-visual-source.png");

const SECTION_VARIANTS = [
  { name: "home-section-bg-1024.webp", width: 1024 },
  { name: "home-section-bg-1920.webp", width: 1920 },
  { name: "home-section-bg-2560.webp", width: 2560 },
];

const VISUAL_VARIANTS = [
  { name: "home-visual-1024.webp", width: 1024 },
  { name: "home-visual-1536.webp", width: 1536 },
];

function assertSource(filePath, label) {
  if (!existsSync(filePath)) {
    throw new Error(`Missing ${label}: ${filePath}`);
  }
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

assertSource(SECTION_BG_SOURCE, "section background");
assertSource(VISUAL_SOURCE, "visual card");

console.log("Section background:");
for (const variant of SECTION_VARIANTS) {
  console.log(await exportVariant(SECTION_BG_SOURCE, variant));
}

await sharp(path.join(IMAGES_DIR, "home-section-bg-2560.webp")).toFile(
  path.join(IMAGES_DIR, "home-section-bg.webp"),
);

console.log("Visual card:");
for (const variant of VISUAL_VARIANTS) {
  console.log(await exportVariant(VISUAL_SOURCE, variant));
}

await sharp(path.join(IMAGES_DIR, "home-visual-1536.webp")).toFile(
  path.join(IMAGES_DIR, "home-visual.webp"),
);
