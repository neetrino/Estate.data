import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const PORTFOLIO_PATH = "/api/v1/portfolio";
const ADMIN_PORTFOLIO_PATH = "/api/v1/admin/portfolio";
const PLACEHOLDER_IMAGE = "/api/v1/assets/recent-work-placeholder";

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
    .setSubject("portfolio-check")
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "1h")
    .sign(new TextEncoder().encode(secret));
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const portfolioUrl = resolveUrl(apiUrl, PORTFOLIO_PATH);
const adminPortfolioUrl = resolveUrl(apiUrl, ADMIN_PORTFOLIO_PATH);

let listResponse;
try {
  listResponse = await fetch(portfolioUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Portfolio check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (!listResponse.ok) {
  console.error(`Portfolio check failed — GET expected 200, got ${listResponse.status}`);
  process.exit(1);
}

const listBody = await listResponse.json();
const projects = listBody?.data;

if (!Array.isArray(projects) || projects.length < 1) {
  console.error(
    `Portfolio check failed — expected non-empty data array, got ${JSON.stringify(listBody)}`,
  );
  process.exit(1);
}

const first = projects[0];
if (
  typeof first?.id !== "string" ||
  typeof first?.imageSrc !== "string" ||
  typeof first?.imageAlt !== "string" ||
  typeof first?.category !== "string"
) {
  console.error(`Portfolio check failed — invalid project shape: ${JSON.stringify(first)}`);
  process.exit(1);
}

console.log(`Portfolio check OK — GET ${projects.length} published project(s)`);

const token = await issueAdminToken();
const uniqueAlt = `Portfolio check ${Date.now()}`;

const createResponse = await fetch(adminPortfolioUrl, {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    imageUrl: PLACEHOLDER_IMAGE,
    imageAlt: uniqueAlt,
    category: "photo",
    sortOrder: 9999,
  }),
});

if (createResponse.status !== 201) {
  const body = await createResponse.text();
  console.error(`Portfolio check failed — admin POST expected 201, got ${createResponse.status}: ${body}`);
  process.exit(1);
}

const createBody = await createResponse.json();
const createdId = createBody?.data?.id;

if (typeof createdId !== "string") {
  console.error(`Portfolio check failed — missing created id: ${JSON.stringify(createBody)}`);
  process.exit(1);
}

console.log(`Portfolio check OK — admin POST created ${createdId}`);

const updatedAlt = `${uniqueAlt} updated`;

const patchResponse = await fetch(`${adminPortfolioUrl}/${encodeURIComponent(createdId)}`, {
  method: "PATCH",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ imageAlt: updatedAlt }),
});

if (patchResponse.status !== 200) {
  const body = await patchResponse.text();
  console.error(`Portfolio check failed — admin PATCH expected 200, got ${patchResponse.status}: ${body}`);
  process.exit(1);
}

const listAfterPatch = await fetch(portfolioUrl, {
  headers: { Accept: "application/json" },
  cache: "no-store",
}).then((response) => response.json());

const patched = listAfterPatch?.data?.find((project) => project.id === createdId);

if (patched?.imageAlt !== updatedAlt) {
  console.error(
    `Portfolio check failed — PATCH not reflected in GET: ${JSON.stringify(patched)}`,
  );
  process.exit(1);
}

console.log("Portfolio check OK — admin PATCH reflected in public GET");
