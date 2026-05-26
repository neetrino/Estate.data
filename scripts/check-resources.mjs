import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const ARTICLES_PATH = "/api/v1/articles";
const FAQ_PATH = "/api/v1/faq";
const ADMIN_ARTICLES_PATH = "/api/v1/admin/articles";
const ADMIN_FAQ_PATH = "/api/v1/admin/faq";
const SAMPLE_SLUG = "westside-vs-eastside-spring-2026-absorption";

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
    .setSubject("resources-check")
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "1h")
    .sign(new TextEncoder().encode(secret));
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

const articlesUrl = resolveUrl(apiUrl, ARTICLES_PATH);
const faqUrl = resolveUrl(apiUrl, FAQ_PATH);

let articlesResponse;
try {
  articlesResponse = await fetch(articlesUrl, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Resources check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (!articlesResponse.ok) {
  console.error(`Resources check failed — GET articles expected 200, got ${articlesResponse.status}`);
  process.exit(1);
}

const articlesBody = await articlesResponse.json();
const articles = articlesBody?.data;

if (!Array.isArray(articles) || articles.length < 1) {
  console.error(`Resources check failed — expected articles array, got ${JSON.stringify(articlesBody)}`);
  process.exit(1);
}

console.log(`Resources check OK — GET ${articles.length} article(s)`);

const detailResponse = await fetch(
  resolveUrl(apiUrl, `${ARTICLES_PATH}/${encodeURIComponent(SAMPLE_SLUG)}`),
  { headers: { Accept: "application/json" }, cache: "no-store" },
);

if (!detailResponse.ok) {
  console.error(`Resources check failed — GET slug expected 200, got ${detailResponse.status}`);
  process.exit(1);
}

const detailBody = await detailResponse.json();
if (typeof detailBody?.data?.body !== "string" || detailBody.data.body.length < 1) {
  console.error(`Resources check failed — missing article body: ${JSON.stringify(detailBody)}`);
  process.exit(1);
}

console.log(`Resources check OK — GET /articles/${SAMPLE_SLUG} has body`);

const faqResponse = await fetch(faqUrl, {
  headers: { Accept: "application/json" },
  cache: "no-store",
});

if (!faqResponse.ok) {
  console.error(`Resources check failed — GET faq expected 200, got ${faqResponse.status}`);
  process.exit(1);
}

const faqItems = (await faqResponse.json())?.data;
if (!Array.isArray(faqItems) || faqItems.length < 1) {
  console.error(`Resources check failed — expected faq array, got ${JSON.stringify(faqItems)}`);
  process.exit(1);
}

console.log(`Resources check OK — GET ${faqItems.length} FAQ item(s)`);

const token = await issueAdminToken();
const testSlug = `resources-check-${Date.now()}`;

const createArticleResponse = await fetch(resolveUrl(apiUrl, ADMIN_ARTICLES_PATH), {
  method: "POST",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    slug: testSlug,
    title: "Resources check article",
    readTimeLabel: "1 min read",
    body: "Automated resources CMS check body.",
    sortOrder: 9999,
  }),
});

if (createArticleResponse.status !== 201) {
  const body = await createArticleResponse.text();
  console.error(`Resources check failed — admin POST article expected 201, got ${createArticleResponse.status}: ${body}`);
  process.exit(1);
}

const createdArticleId = (await createArticleResponse.json())?.data?.id;
if (typeof createdArticleId !== "string") {
  console.error("Resources check failed — missing created article id");
  process.exit(1);
}

console.log(`Resources check OK — admin POST article ${createdArticleId}`);

const updatedAnswer = `Updated at ${Date.now()}`;
const faqId = faqItems[0]?.id;

if (typeof faqId !== "string") {
  console.error("Resources check failed — missing FAQ id for PATCH");
  process.exit(1);
}

const patchFaqResponse = await fetch(
  resolveUrl(apiUrl, `${ADMIN_FAQ_PATH}/${encodeURIComponent(faqId)}`),
  {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answer: updatedAnswer }),
  },
);

if (patchFaqResponse.status !== 200) {
  const body = await patchFaqResponse.text();
  console.error(`Resources check failed — admin PATCH faq expected 200, got ${patchFaqResponse.status}: ${body}`);
  process.exit(1);
}

const faqAfterPatch = await fetch(faqUrl, {
  headers: { Accept: "application/json" },
  cache: "no-store",
}).then((response) => response.json());

const patchedFaq = faqAfterPatch?.data?.find((item) => item.id === faqId);
if (patchedFaq?.answer !== updatedAnswer) {
  console.error(`Resources check failed — FAQ PATCH not reflected: ${JSON.stringify(patchedFaq)}`);
  process.exit(1);
}

console.log("Resources check OK — admin PATCH FAQ reflected in GET");
