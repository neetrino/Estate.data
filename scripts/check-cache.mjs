import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const PORTFOLIO_PATH = "/api/v1/portfolio";

function resolveUrl(baseUrl, path) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${path}`;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const hasRedis =
  Boolean(process.env.UPSTASH_REDIS_REST_URL?.trim()) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN?.trim());

if (!hasRedis) {
  console.warn("Cache check skipped — UPSTASH_REDIS_REST_* not configured (optional in dev)");
  process.exit(0);
}

let firstResponse;
try {
  firstResponse = await fetch(resolveUrl(apiUrl, PORTFOLIO_PATH), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Cache check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (!firstResponse.ok) {
  console.error(`Cache check failed — GET portfolio expected 200, got ${firstResponse.status}`);
  process.exit(1);
}

const secondResponse = await fetch(resolveUrl(apiUrl, PORTFOLIO_PATH), {
  headers: { Accept: "application/json" },
  cache: "no-store",
});

if (!secondResponse.ok) {
  console.error(`Cache check failed — second GET expected 200, got ${secondResponse.status}`);
  process.exit(1);
}

console.log("Cache check OK — portfolio GET twice (Redis configured; hits logged in API stderr)");
