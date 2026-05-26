import { SignJWT } from "jose";
import { loadRootEnv } from "./lib/load-root-env.mjs";

loadRootEnv();

const secret = process.env.JWT_SECRET;
if (!secret) {
  console.error("issue-admin-token failed — JWT_SECRET missing in .env");
  process.exit(1);
}

const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";

const token = await new SignJWT({ role: "admin" })
  .setProtectedHeader({ alg: "HS256" })
  .setSubject("admin-dev")
  .setIssuedAt()
  .setExpirationTime(expiresIn)
  .sign(new TextEncoder().encode(secret));

console.log(token);
