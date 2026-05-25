import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const DEFAULT_API_URL = "http://localhost:3001";
const ORDERS_PATH = "/api/v1/payments/orders";
const IDRAM_INIT_PATH = "/api/v1/payments/idram/init";
const IDRAM_CALLBACK_PATH = "/api/v1/payments/idram/callback";

function resolveUrl(baseUrl, path, query = "") {
  const base = (baseUrl ?? DEFAULT_API_URL).replace(/\/$/, "");
  return `${base}${path}${query}`;
}

const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

let orderResponse;
try {
  orderResponse = await fetch(resolveUrl(apiUrl, ORDERS_PATH), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: 1000, currency: "AMD", description: "payments check" }),
  });
} catch (error) {
  const message = error instanceof Error ? error.message : "Network error";
  console.error(`Payments check failed — is \`pnpm dev:api\` running? ${message}`);
  process.exit(1);
}

if (orderResponse.status !== 201) {
  const body = await orderResponse.text();
  console.error(`Payments check failed — create order expected 201, got ${orderResponse.status}: ${body}`);
  process.exit(1);
}

const orderId = (await orderResponse.json())?.data?.id;
if (typeof orderId !== "string") {
  console.error("Payments check failed — missing order id");
  process.exit(1);
}

console.log(`Payments check OK — POST /payments/orders → ${orderId}`);

const initResponse = await fetch(resolveUrl(apiUrl, IDRAM_INIT_PATH), {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ orderId }),
});

if (initResponse.status !== 200) {
  console.error(`Payments check failed — idram init expected 200, got ${initResponse.status}`);
  process.exit(1);
}

const redirectUrl = (await initResponse.json())?.data?.redirectUrl;
if (typeof redirectUrl !== "string" || !redirectUrl.includes("orderId=")) {
  console.error("Payments check failed — missing redirectUrl");
  process.exit(1);
}

console.log("Payments check OK — POST /payments/idram/init → redirectUrl");

const callbackResponse = await fetch(
  resolveUrl(apiUrl, IDRAM_CALLBACK_PATH, `?orderId=${encodeURIComponent(orderId)}&status=success`),
  { headers: { Accept: "application/json" }, cache: "no-store" },
);

if (callbackResponse.status !== 200) {
  console.error(`Payments check failed — callback expected 200, got ${callbackResponse.status}`);
  process.exit(1);
}

const paidStatus = (await callbackResponse.json())?.data?.status;
if (paidStatus !== "paid") {
  console.error(`Payments check failed — expected paid, got ${paidStatus}`);
  process.exit(1);
}

console.log("Payments check OK — idram callback → order status paid");
