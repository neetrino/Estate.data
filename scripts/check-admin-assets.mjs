import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const ADMIN_ASSETS_PATH = "/api/v1/admin/assets";
const TEST_KEY = "site-logo";

/** 1×1 PNG — distinct from seeded logo for byte comparison. */
const TEST_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

/**
 * @param {string | undefined} baseUrl
 * @param {string} path
 */
function resolveUrl(baseUrl, path) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${path}`;
}

/**
 * @returns {Promise<string>}
 */
async function issueAdminToken() {
  const { SignJWT } = await import("jose");
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET missing");
  }

  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin-check")
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "1h")
    .sign(new TextEncoder().encode(secret));
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const adminUrl = resolveUrl(apiUrl, ADMIN_ASSETS_PATH);
const assetUrl = resolveUrl(apiUrl, `/api/v1/assets/${encodeURIComponent(TEST_KEY)}`);

let unauthResponse;
try {
  const form = new FormData();
  form.set("key", TEST_KEY);
  form.set("file", new Blob([TEST_PNG], { type: "image/png" }), "check.png");

  unauthResponse = await fetch(adminUrl, {
    method: "POST",
    body: form,
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Admin asset check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (unauthResponse.status !== 401) {
  console.error(`Admin asset check failed — unauthenticated POST expected 401, got ${unauthResponse.status}`);
  process.exit(1);
}

const unauthBody = await unauthResponse.json();
if (unauthBody?.error?.code !== "UNAUTHORIZED") {
  console.error(
    `Admin asset check failed — expected UNAUTHORIZED, got ${JSON.stringify(unauthBody)}`,
  );
  process.exit(1);
}

console.log("Admin asset check OK — unauthenticated POST → 401 UNAUTHORIZED");

const token = await issueAdminToken();

const uploadForm = new FormData();
uploadForm.set("key", TEST_KEY);
uploadForm.set("file", new Blob([TEST_PNG], { type: "image/png" }), "check.png");

const uploadResponse = await fetch(adminUrl, {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: uploadForm,
});

if (uploadResponse.status !== 200) {
  const body = await uploadResponse.text();
  console.error(`Admin asset check failed — upload expected 200, got ${uploadResponse.status}: ${body}`);
  process.exit(1);
}

const uploadBody = await uploadResponse.json();
if (uploadBody?.data?.key !== TEST_KEY || uploadBody?.data?.byteSize !== TEST_PNG.length) {
  console.error(
    `Admin asset check failed — unexpected upload response: ${JSON.stringify(uploadBody)}`,
  );
  process.exit(1);
}

console.log(`Admin asset check OK — POST upload → key ${TEST_KEY}, ${TEST_PNG.length} bytes`);

const getResponse = await fetch(assetUrl, { cache: "no-store" });
if (!getResponse.ok) {
  console.error(`Admin asset check failed — GET ${TEST_KEY} expected 200, got ${getResponse.status}`);
  process.exit(1);
}

const servedBytes = Buffer.from(await getResponse.arrayBuffer());
if (!servedBytes.equals(TEST_PNG)) {
  console.error(
    `Admin asset check failed — GET bytes mismatch (expected ${TEST_PNG.length}, got ${servedBytes.length})`,
  );
  process.exit(1);
}

const contentType = getResponse.headers.get("content-type");
if (contentType !== "image/png") {
  console.error(`Admin asset check failed — expected image/png, got ${contentType ?? "none"}`);
  process.exit(1);
}

console.log("Admin asset check OK — GET returns uploaded PNG bytes from DB");
