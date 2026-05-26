import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const LOCALES_PATH = "/api/v1/i18n/locales";
const ARTICLES_PATH = "/api/v1/articles";
const FAQ_PATH = "/api/v1/faq";
const SAMPLE_SLUG = "westside-vs-eastside-spring-2026-absorption";
const SPANISH_TITLE = "Westside vs. Eastside: absorción primavera 2026";
const SPANISH_FAQ_QUESTION = "¿Cuál es su tiempo de entrega?";

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
    .setSubject("i18n-check")
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN ?? "1h")
    .sign(new TextEncoder().encode(secret));
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

const localesResponse = await fetch(resolveUrl(apiUrl, LOCALES_PATH), {
  headers: { Accept: "application/json" },
  cache: "no-store",
});

if (!localesResponse.ok) {
  console.error(`i18n check failed — GET locales expected 200, got ${localesResponse.status}`);
  process.exit(1);
}

const localesBody = await localesResponse.json();
const supported = localesBody?.data?.locales?.map((entry) => entry.code);

if (!supported?.includes("en") || !supported.includes("es")) {
  console.error(`i18n check failed — expected en+es locales, got ${JSON.stringify(localesBody)}`);
  process.exit(1);
}

console.log("i18n check OK — GET /i18n/locales → en, es");

const esArticlesResponse = await fetch(
  resolveUrl(apiUrl, `${ARTICLES_PATH}?locale=es`),
  { headers: { Accept: "application/json" }, cache: "no-store" },
);

if (!esArticlesResponse.ok) {
  console.error(`i18n check failed — GET articles?locale=es expected 200`);
  process.exit(1);
}

const esArticles = (await esArticlesResponse.json())?.data;
const localizedArticle = esArticles?.find((article) => article.title === SPANISH_TITLE);

if (!localizedArticle) {
  console.error(`i18n check failed — Spanish article title not found in ${JSON.stringify(esArticles)}`);
  process.exit(1);
}

console.log("i18n check OK — articles?locale=es returns translated title");

const esDetailResponse = await fetch(
  resolveUrl(apiUrl, `${ARTICLES_PATH}/${encodeURIComponent(SAMPLE_SLUG)}?locale=es`),
  { headers: { Accept: "application/json" }, cache: "no-store" },
);

const esDetail = (await esDetailResponse.json())?.data;
if (!esDetail?.body?.includes("absorción")) {
  console.error(`i18n check failed — Spanish article body missing: ${JSON.stringify(esDetail)}`);
  process.exit(1);
}

console.log("i18n check OK — article slug?locale=es returns translated body");

const esFaqResponse = await fetch(resolveUrl(apiUrl, `${FAQ_PATH}?locale=es`), {
  headers: { Accept: "application/json" },
  cache: "no-store",
});

const esFaq = (await esFaqResponse.json())?.data;
if (!esFaq?.some((item) => item.question === SPANISH_FAQ_QUESTION)) {
  console.error(`i18n check failed — Spanish FAQ not found: ${JSON.stringify(esFaq)}`);
  process.exit(1);
}

console.log("i18n check OK — faq?locale=es returns translated question");

const fallbackResponse = await fetch(
  resolveUrl(apiUrl, `${ARTICLES_PATH}?locale=fr`),
  { headers: { Accept: "application/json" }, cache: "no-store" },
);

const fallbackArticles = (await fallbackResponse.json())?.data;
if (fallbackArticles?.[0]?.title === SPANISH_TITLE) {
  console.error("i18n check failed — unsupported locale should fall back to English");
  process.exit(1);
}

console.log("i18n check OK — unsupported locale falls back to English");

const token = await issueAdminToken();
const articleId = localizedArticle.id;

const putTranslationResponse = await fetch(
  resolveUrl(
    apiUrl,
    `/api/v1/admin/articles/${encodeURIComponent(articleId)}/translations`,
  ),
  {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      locale: "es",
      title: "Título actualizado por i18n check",
      readTimeLabel: "7 min de lectura",
      body: "Cuerpo actualizado por verificación i18n.",
    }),
  },
);

if (putTranslationResponse.status !== 200) {
  const body = await putTranslationResponse.text();
  console.error(`i18n check failed — admin PUT translation expected 200, got ${putTranslationResponse.status}: ${body}`);
  process.exit(1);
}

const updatedArticleResponse = await fetch(
  resolveUrl(apiUrl, `${ARTICLES_PATH}/${encodeURIComponent(SAMPLE_SLUG)}?locale=es`),
  { headers: { Accept: "application/json" }, cache: "no-store" },
);

const updatedArticle = (await updatedArticleResponse.json())?.data;
if (updatedArticle?.title !== "Título actualizado por i18n check") {
  console.error(`i18n check failed — admin translation not reflected: ${JSON.stringify(updatedArticle)}`);
  process.exit(1);
}

console.log("i18n check OK — admin PUT translation reflected in GET");
