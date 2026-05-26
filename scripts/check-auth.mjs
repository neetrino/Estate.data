import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const LOGIN_PATH = "/api/v1/admin/auth/login";
const REFRESH_PATH = "/api/v1/admin/auth/refresh";

function resolveUrl(baseUrl, path) {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${path}`;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
const email = process.env.ADMIN_EMAIL ?? "admin@estate.data";
const password = process.env.ADMIN_PASSWORD ?? "admin-change-me";

let loginResponse;
try {
  loginResponse = await fetch(resolveUrl(apiUrl, LOGIN_PATH), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Auth check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (loginResponse.status !== 200) {
  const body = await loginResponse.text();
  console.error(`Auth check failed — login expected 200, got ${loginResponse.status}: ${body}`);
  process.exit(1);
}

const loginBody = await loginResponse.json();
const token = loginBody?.data?.token;

if (typeof token !== "string" || token.length === 0) {
  console.error(`Auth check failed — missing token: ${JSON.stringify(loginBody)}`);
  process.exit(1);
}

console.log("Auth check OK — POST /admin/auth/login → token");

const refreshResponse = await fetch(resolveUrl(apiUrl, REFRESH_PATH), {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ token }),
});

if (refreshResponse.status !== 200) {
  console.error(`Auth check failed — refresh expected 200, got ${refreshResponse.status}`);
  process.exit(1);
}

const refreshToken = (await refreshResponse.json())?.data?.token;
if (typeof refreshToken !== "string" || refreshToken.length === 0) {
  console.error("Auth check failed — refresh missing token");
  process.exit(1);
}

console.log("Auth check OK — POST /admin/auth/refresh → new token");

const unauthResponse = await fetch(resolveUrl(apiUrl, "/api/v1/admin/portfolio"), {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
});

if (unauthResponse.status !== 401) {
  console.error(`Auth check failed — unauthenticated admin expected 401, got ${unauthResponse.status}`);
  process.exit(1);
}

console.log("Auth check OK — admin route without token → 401");
