/**
 * Home Client voices section — pastel testimonials background.
 * Source: public/images/client-voices/home-section-bg-source.png
 */
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES_DIR = path.join(ROOT, "public/images/client-voices");

const SOURCE = path.join(IMAGES_DIR, "home-section-bg-source.png");

const WEBP_OPTS = { quality: 92, effort: 6, smartSubsample: true };

const VARIANTS = [
  { name: "home-section-bg-1024.webp", width: 1024 },
  { name: "home-section-bg-1920.webp", width: 1920 },
  { name: "home-section-bg-2560.webp", width: 2560 },
];

if (!existsSync(SOURCE)) {
  throw new Error(`Missing source: ${SOURCE}`);
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

const meta = await sharp(SOURCE).metadata();
console.log(`Source: ${SOURCE} (${meta.width}x${meta.height})`);

for (const variant of VARIANTS) {
  console.log(await exportVariant(SOURCE, variant));
}

await sharp(path.join(IMAGES_DIR, "home-section-bg-2560.webp")).toFile(
  path.join(IMAGES_DIR, "home-section-bg.webp"),
);
