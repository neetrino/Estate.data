import sharp from "sharp";

/** Remove near-white / low-saturation pixels (glass plate + checkerboard). */
const BRIGHTNESS_MIN = 188;
const SATURATION_MAX = 42;

const ICONS = [
  "public/images/hero/feature-icons/camera.png",
  "public/images/hero/feature-icons/chart.png",
  "public/images/hero/feature-icons/rocket.png",
];

for (const output of ICONS) {
  const { data, info } = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const brightness = (red + green + blue) / 3;
    const saturation = max - min;

    if (brightness >= BRIGHTNESS_MIN && saturation <= SATURATION_MAX) {
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
    .toFile(output);

  console.log(`Processed ${output}`);
}
