import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const PRICING_PATH = "/api/v1/pricing";
const ADMIN_PRICING_PACKAGE_PATH = "/api/v1/admin/pricing/packages";

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
    .setSubject("pricing-check")
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "1h")
    .sign(new TextEncoder().encode(secret));
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const pricingUrl = resolveUrl(apiUrl, PRICING_PATH);

let pricingResponse;
try {
  pricingResponse = await fetch(pricingUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Pricing check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (!pricingResponse.ok) {
  console.error(`Pricing check failed — GET expected 200, got ${pricingResponse.status}`);
  process.exit(1);
}

const pricingBody = await pricingResponse.json();
const media = pricingBody?.data?.media;
const analytics = pricingBody?.data?.analytics;

if (
  typeof media?.sectionTitle !== "string" ||
  typeof media?.priceSuffix !== "string" ||
  !Array.isArray(media?.packages) ||
  media.packages.length < 1
) {
  console.error(`Pricing check failed — invalid media shape: ${JSON.stringify(media)}`);
  process.exit(1);
}

if (
  typeof analytics?.sectionTitle !== "string" ||
  typeof analytics?.priceSuffix !== "string" ||
  !Array.isArray(analytics?.packages) ||
  analytics.packages.length < 1
) {
  console.error(`Pricing check failed — invalid analytics shape: ${JSON.stringify(analytics)}`);
  process.exit(1);
}

const signature = media.packages.find((pkg) => pkg?.id === "signature");
if (
  typeof signature?.name !== "string" ||
  !Array.isArray(signature?.features) ||
  signature.features.length < 1
) {
  console.error(`Pricing check failed — missing signature package: ${JSON.stringify(signature)}`);
  process.exit(1);
}

console.log(
  `Pricing check OK — GET media ${media.packages.length} + analytics ${analytics.packages.length} package(s)`,
);

const token = await issueAdminToken();
const updatedPrice = `$${Date.now()}`;

const patchResponse = await fetch(
  resolveUrl(apiUrl, `${ADMIN_PRICING_PACKAGE_PATH}/${encodeURIComponent("signature")}`),
  {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price: updatedPrice }),
  },
);

if (patchResponse.status !== 200) {
  const body = await patchResponse.text();
  console.error(`Pricing check failed — admin PATCH expected 200, got ${patchResponse.status}: ${body}`);
  process.exit(1);
}

const pricingAfterPatch = await fetch(pricingUrl, {
  headers: { Accept: "application/json" },
  cache: "no-store",
}).then((response) => response.json());

const patchedSignature = pricingAfterPatch?.data?.media?.packages?.find(
  (pkg) => pkg?.id === "signature",
);

if (patchedSignature?.price !== updatedPrice) {
  console.error(
    `Pricing check failed — PATCH not reflected in GET: ${JSON.stringify(patchedSignature)}`,
  );
  process.exit(1);
}

console.log("Pricing check OK — admin PATCH reflected in public GET");

await fetch(
  resolveUrl(apiUrl, `${ADMIN_PRICING_PACKAGE_PATH}/${encodeURIComponent("signature")}`),
  {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price: "$1,249" }),
  },
);

console.log("Pricing check OK — restored signature price");
