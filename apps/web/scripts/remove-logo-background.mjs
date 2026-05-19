import sharp from "sharp";

const INPUT_PATH = process.argv[2] ?? "public/images/logo-estatedata-source.jpg";
const OUTPUT_PATH = "public/images/logo-estatedata.png";
/** Only near-pure-black pixels (keeps charcoal wordmark). */
const DARK_CHANNEL_THRESHOLD = 28;

const { data, info } = await sharp(INPUT_PATH)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const red = data[i];
  const green = data[i + 1];
  const blue = data[i + 2];

  if (
    red <= DARK_CHANNEL_THRESHOLD &&
    green <= DARK_CHANNEL_THRESHOLD &&
    blue <= DARK_CHANNEL_THRESHOLD
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
