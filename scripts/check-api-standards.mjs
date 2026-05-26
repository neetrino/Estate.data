const DEFAULT_API_URL = "http://localhost:3001";
const CONTACT_PATH = "/api/v1/contact";

const VALID_BODY = {
  name: "Jane Smith",
  email: "jane@example.com",
  propertyAddress: "1234 Sunset Blvd, Los Angeles, CA",
  service: "photography",
  preferredDate: "2026-06-01",
  projectDetails: "Need hero photos for a hillside listing.",
};

/**
 * @param {string | undefined} baseUrl
 */
function resolveContactUrl(baseUrl) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${CONTACT_PATH}`;
}

/**
 * @param {unknown} body
 */
function hasErrorEnvelope(body) {
  return (
    body !== null &&
    typeof body === "object" &&
    "error" in body &&
    typeof /** @type {{ error?: { message?: string } }} */ (body).error?.message ===
      "string"
  );
}

/**
 * @param {unknown} body
 */
function hasSuccessEnvelope(body) {
  return body !== null && typeof body === "object" && "data" in body;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const contactUrl = resolveContactUrl(apiUrl);

let invalidResponse;
try {
  invalidResponse = await fetch(contactUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: "not-an-email" }),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Standards check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (invalidResponse.status !== 400) {
  console.error(
    `Standards check failed — invalid POST expected 400, got ${invalidResponse.status}`,
  );
  process.exit(1);
}

const invalidBody = await invalidResponse.json();
if (!hasErrorEnvelope(invalidBody)) {
  console.error(
    `Standards check failed — invalid POST expected error envelope, got ${JSON.stringify(invalidBody)}`,
  );
  process.exit(1);
}

if (invalidBody.error.code !== "VALIDATION_ERROR") {
  console.error(
    `Standards check failed — expected VALIDATION_ERROR, got ${invalidBody.error.code ?? "none"}`,
  );
  process.exit(1);
}

console.log("Standards check OK — invalid POST → 400 VALIDATION_ERROR");

let validResponse;
try {
  validResponse = await fetch(contactUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(VALID_BODY),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Standards check failed on valid POST: ${message}`);
  process.exit(1);
}

if (validResponse.status !== 201) {
  console.error(
    `Standards check failed — valid POST expected 201, got ${validResponse.status}`,
  );
  process.exit(1);
}

const validBody = await validResponse.json();
if (!hasSuccessEnvelope(validBody) || validBody.data?.received !== true || !validBody.data?.id) {
  console.error(
    `Standards check failed — valid POST expected data.received=true, got ${JSON.stringify(validBody)}`,
  );
  process.exit(1);
}

const requestId = validResponse.headers.get("x-request-id");
if (!requestId) {
  console.error("Standards check failed — missing x-request-id response header");
  process.exit(1);
}

console.log(`Standards check OK — valid POST → 201 data.received (request-id: ${requestId})`);
