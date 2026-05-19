import sharp from "sharp";

const INPUT_PATH = process.argv[2];
const OUTPUT_PATH = "public/images/logo-estatedata.png";
const LIGHT_CHANNEL_MIN = 248;

if (!INPUT_PATH) {
  throw new Error("Usage: node scripts/remove-logo-white-background.mjs <input-path>");
}

const { data, info } = await sharp(INPUT_PATH)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const red = data[i];
  const green = data[i + 1];
  const blue = data[i + 2];

  if (
    red >= LIGHT_CHANNEL_MIN &&
    green >= LIGHT_CHANNEL_MIN &&
    blue >= LIGHT_CHANNEL_MIN
  ) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: {
    width: info.width,
    height: info.height,
    channels: 4,
  },
})
  .png()
  .toFile(OUTPUT_PATH);

console.log(`Wrote transparent logo to ${OUTPUT_PATH}`);
