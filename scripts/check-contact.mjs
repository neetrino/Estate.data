const DEFAULT_API_URL = "http://localhost:3001";
const CONTACT_PATH = "/api/v1/contact";

const VALID_BODY = {
  name: "Contact Check User",
  email: `contact-check-${Date.now()}@example.com`,
  propertyAddress: "1234 Sunset Blvd, Los Angeles, CA",
  service: "photography",
  preferredDate: "2026-06-15",
  projectDetails: "Automated contact check submission.",
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

let invalidResponse;
try {
  invalidResponse = await fetch(contactUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "" }),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Contact check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (invalidResponse.status !== 400) {
  console.error(`Contact check failed — invalid POST expected 400, got ${invalidResponse.status}`);
  process.exit(1);
}

const invalidBody = await invalidResponse.json();
if (invalidBody?.error?.code !== "VALIDATION_ERROR") {
  console.error(
    `Contact check failed — expected VALIDATION_ERROR, got ${JSON.stringify(invalidBody)}`,
  );
  process.exit(1);
}

console.log("Contact check OK — invalid POST → 400 VALIDATION_ERROR");

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
  console.error(`Contact check failed on valid POST: ${message}`);
  process.exit(1);
}

if (validResponse.status !== 201) {
  console.error(`Contact check failed — valid POST expected 201, got ${validResponse.status}`);
  process.exit(1);
}

const validBody = await validResponse.json();
const inquiryId = validBody?.data?.id;

if (validBody?.data?.received !== true || typeof inquiryId !== "string" || !inquiryId) {
  console.error(
    `Contact check failed — expected data.id + received=true, got ${JSON.stringify(validBody)}`,
  );
  process.exit(1);
}

console.log(`Contact check OK — valid POST → 201 id=${inquiryId} (persisted in contact_inquiries)`);
