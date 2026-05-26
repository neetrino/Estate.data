import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

/** @param {string} filePath */
function parseEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }

  /** @type {Record<string, string>} */
  const vars = {};

  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const eq = trimmed.indexOf("=");
    if (eq === -1) {
      continue;
    }

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    vars[key] = value;
  }

  return vars;
}

/** @param {Record<string, string>} vars @param {string[]} keys */
function missingKeys(vars, keys) {
  return keys.filter((key) => {
    const value = vars[key];
    return !value || value.includes("USER:PASSWORD") || value.includes("change-me");
  });
}

const rootEnvPath = resolve(ROOT, ".env");
const rootEnv = parseEnvFile(rootEnvPath);

if (!rootEnv) {
  console.error("Missing root .env — copy .env.example and fill DATABASE_URL / DIRECT_URL.");
  process.exit(1);
}

const rootRequired = ["DATABASE_URL", "DIRECT_URL", "JWT_SECRET"];
const rootMissing = missingKeys(rootEnv, rootRequired);

if (rootMissing.length > 0) {
  console.error(`Root .env missing or placeholder: ${rootMissing.join(", ")}`);
  process.exit(1);
}

const webEnvPath = resolve(ROOT, "apps/web/.env.local");
const webEnv = parseEnvFile(webEnvPath);
const webMissing = webEnv
  ? missingKeys(webEnv, ["DATABASE_URL", "NEXT_PUBLIC_API_URL"])
  : ["apps/web/.env.local (file missing)"];

const apiEnvPath = resolve(ROOT, "apps/api/.env.local");
const apiEnv = parseEnvFile(apiEnvPath);
const apiMissing = apiEnv
  ? missingKeys(apiEnv, ["DATABASE_URL", "DIRECT_URL"])
  : ["apps/api/.env.local (file missing)"];

if (apiMissing.length > 0) {
  console.error(`API env missing or placeholder: ${apiMissing.join(", ")}`);
  process.exit(1);
}

if (webMissing.length > 0) {
  console.warn(`Web env warning: ${webMissing.join(", ")}`);
}

console.log("Env check OK — DATABASE_URL set for root, web, and API.");
