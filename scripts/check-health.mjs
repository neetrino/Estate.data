const DEFAULT_API_URL = "http://localhost:3001";
const HEALTH_PATH = "/api/v1/health";

/**
 * @param {string | undefined} baseUrl
 */
function resolveHealthUrl(baseUrl) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${HEALTH_PATH}`;
}

/**
 * @param {unknown} body
 */
function isHealthOk(body) {
  if (!body || typeof body !== "object" || !("data" in body)) {
    return false;
  }

  const data = /** @type {{ data?: { status?: string; db?: string } }} */ (body).data;
  return data?.status === "ok" && data?.db === "ok";
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const healthUrl = resolveHealthUrl(apiUrl);

let response;
try {
  response = await fetch(healthUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Health check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (response.status !== 200) {
  console.error(`Health check failed — HTTP ${response.status} from ${healthUrl}`);
  process.exit(1);
}

const body = await response.json();
if (!isHealthOk(body)) {
  console.error(`Health check failed — unexpected body: ${JSON.stringify(body)}`);
  process.exit(1);
}

const requestId = response.headers.get("x-request-id");
console.log(
  `Health check OK — ${healthUrl} → status ok, db ok${requestId ? ` (request-id: ${requestId})` : ""}`,
);
