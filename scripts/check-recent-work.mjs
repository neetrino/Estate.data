import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const RECENT_PATH = "/api/v1/projects/recent";

/**
 * @param {string | undefined} baseUrl
 * @param {string} query
 */
function resolveUrl(baseUrl, query) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${RECENT_PATH}${query}`;
}

/**
 * @param {unknown} body
 */
function parseProjects(body) {
  if (!body || typeof body !== "object" || !("data" in body)) {
    return null;
  }

  const data = /** @type {{ data?: unknown }} */ (body).data;
  return Array.isArray(data) ? data : null;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

let defaultResponse;
try {
  defaultResponse = await fetch(resolveUrl(apiUrl, ""), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Recent work check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (!defaultResponse.ok) {
  console.error(`Recent work check failed — GET expected 200, got ${defaultResponse.status}`);
  process.exit(1);
}

const defaultBody = await defaultResponse.json();
const defaultProjects = parseProjects(defaultBody);

if (!defaultProjects || defaultProjects.length < 1 || defaultProjects.length > 4) {
  console.error(
    `Recent work check failed — expected 1–4 default projects, got ${JSON.stringify(defaultBody)}`,
  );
  process.exit(1);
}

const first = defaultProjects[0];
if (
  typeof first?.id !== "string" ||
  typeof first?.imageSrc !== "string" ||
  typeof first?.imageAlt !== "string"
) {
  console.error(`Recent work check failed — invalid project shape: ${JSON.stringify(first)}`);
  process.exit(1);
}

console.log(`Recent work check OK — default GET → ${defaultProjects.length} project(s)`);

const limitTwoResponse = await fetch(resolveUrl(apiUrl, "?limit=2"), {
  headers: { Accept: "application/json" },
  cache: "no-store",
});

if (!limitTwoResponse.ok) {
  console.error(`Recent work check failed — ?limit=2 expected 200, got ${limitTwoResponse.status}`);
  process.exit(1);
}

const limitTwoProjects = parseProjects(await limitTwoResponse.json());
if (!limitTwoProjects || limitTwoProjects.length !== 2) {
  console.error(
    `Recent work check failed — ?limit=2 expected 2 projects, got ${JSON.stringify(limitTwoProjects)}`,
  );
  process.exit(1);
}

console.log("Recent work check OK — ?limit=2 → 2 projects");

const invalidResponse = await fetch(resolveUrl(apiUrl, "?limit=0"), {
  headers: { Accept: "application/json" },
  cache: "no-store",
});

if (invalidResponse.status !== 400) {
  console.error(`Recent work check failed — ?limit=0 expected 400, got ${invalidResponse.status}`);
  process.exit(1);
}

const invalidBody = await invalidResponse.json();
if (invalidBody?.error?.code !== "VALIDATION_ERROR") {
  console.error(
    `Recent work check failed — expected VALIDATION_ERROR, got ${JSON.stringify(invalidBody)}`,
  );
  process.exit(1);
}

console.log("Recent work check OK — invalid limit → 400 VALIDATION_ERROR");
