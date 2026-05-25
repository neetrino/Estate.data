const DEFAULT_API_URL = "http://localhost:3001";
const CONTACT_PATH = "/api/v1/contact";
const BURST_REQUEST_COUNT = 12;

const VALID_BODY = {
  name: "Rate Limit Test",
  email: "rate-limit@example.com",
  propertyAddress: "1234 Sunset Blvd, Los Angeles, CA",
  service: "photography",
};

/**
 * @param {string | undefined} baseUrl
 */
function resolveContactUrl(baseUrl) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${CONTACT_PATH}`;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const contactUrl = resolveContactUrl(apiUrl);

/** @type {number[]} */
const statuses = [];

for (let index = 0; index < BURST_REQUEST_COUNT; index += 1) {
  let response;
  try {
    response = await fetch(contactUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(VALID_BODY),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Network error";
    console.error(`Rate limit check failed — is \`pnpm dev:api\` running? ${message}`);
    process.exit(1);
  }

  statuses.push(response.status);

  if (response.status === 429) {
    const body = await response.json();
    if (body?.error?.code !== "RATE_LIMITED") {
      console.error(
        `Rate limit check failed — expected RATE_LIMITED, got ${JSON.stringify(body)}`,
      );
      process.exit(1);
    }

    const retryAfter = response.headers.get("retry-after");
    if (!retryAfter) {
      console.error("Rate limit check failed — missing Retry-After header on 429");
      process.exit(1);
    }

    console.log(
      `Rate limit check OK — request ${index + 1}/${BURST_REQUEST_COUNT} → 429 RATE_LIMITED (Retry-After: ${retryAfter}s)`,
    );
    console.log(`Rate limit check OK — burst statuses: ${statuses.join(", ")}`);
    process.exit(0);
  }
}

console.error(
  `Rate limit check failed — sent ${BURST_REQUEST_COUNT} POSTs, no 429 (statuses: ${statuses.join(", ")})`,
);
process.exit(1);
