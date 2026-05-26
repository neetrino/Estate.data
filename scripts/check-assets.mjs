const DEFAULT_API_URL = "http://localhost:3001";

/** Sample keys from seed — must return image/* with non-empty body. */
const SAMPLE_KEYS = ["site-logo", "home-hero"];

/**
 * @param {string | undefined} baseUrl
 * @param {string} key
 */
function resolveAssetUrl(baseUrl, key) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}/api/v1/assets/${encodeURIComponent(key)}`;
}

/**
 * @param {string | null | undefined} contentType
 */
function isImageContentType(contentType) {
  return typeof contentType === "string" && contentType.startsWith("image/");
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

for (const key of SAMPLE_KEYS) {
  const url = resolveAssetUrl(apiUrl, key);

  let response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    console.error(`Asset check failed for ${key} — is \`pnpm dev:api\` running? ${message}`);
    process.exit(1);
  }

  if (!response.ok) {
    console.error(`Asset check failed for ${key} — HTTP ${response.status} from ${url}`);
    process.exit(1);
  }

  const contentType = response.headers.get("content-type");
  if (!isImageContentType(contentType)) {
    console.error(
      `Asset check failed for ${key} — expected image/*, got ${contentType ?? "none"}`,
    );
    process.exit(1);
  }

  const cacheControl = response.headers.get("cache-control");
  if (!cacheControl?.includes("immutable")) {
    console.error(
      `Asset check failed for ${key} — expected Cache-Control immutable, got ${cacheControl ?? "none"}`,
    );
    process.exit(1);
  }

  const bytes = await response.arrayBuffer();
  if (bytes.byteLength === 0) {
    console.error(`Asset check failed for ${key} — empty response body`);
    process.exit(1);
  }

  console.log(
    `Asset check OK — ${key} → ${contentType}, ${bytes.byteLength} bytes, immutable cache`,
  );
}

/** Invalid key must return JSON error envelope. */
const invalidUrl = resolveAssetUrl(apiUrl, "not-a-real-asset-key");
const invalidResponse = await fetch(invalidUrl, { cache: "no-store" });

if (invalidResponse.status !== 404) {
  console.error(`Asset check failed — invalid key expected 404, got ${invalidResponse.status}`);
  process.exit(1);
}

const invalidBody = await invalidResponse.json();
if (invalidBody?.error?.code !== "NOT_FOUND") {
  console.error(
    `Asset check failed — invalid key expected NOT_FOUND error, got ${JSON.stringify(invalidBody)}`,
  );
  process.exit(1);
}

console.log("Asset check OK — invalid key → 404 NOT_FOUND");
