import { z } from "zod";

const resendSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  CONTACT_NOTIFY_EMAIL: z.string().email(),
});

const r2Schema = z.object({
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_NAME: z.string().min(1),
  R2_PUBLIC_URL: z.string().url(),
});

function readTrimmedEnv(keys: readonly string[]): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of keys) {
    result[key] = process.env[key]?.trim() ?? "";
  }
  return result;
}

export type ResendConfig = z.infer<typeof resendSchema>;
export type R2Config = z.infer<typeof r2Schema>;

/** Resend config when all vars are set — otherwise null (contact still persists). */
export function getResendConfig(): ResendConfig | null {
  const result = resendSchema.safeParse(process.env);
  return result.success ? result.data : null;
}

/** R2 S3-compatible config when all vars are set. */
export function getR2Config(): R2Config | null {
  const result = r2Schema.safeParse(
    readTrimmedEnv([
      "R2_ACCOUNT_ID",
      "R2_ACCESS_KEY_ID",
      "R2_SECRET_ACCESS_KEY",
      "R2_BUCKET_NAME",
      "R2_PUBLIC_URL",
    ]),
  );
  return result.success ? result.data : null;
}

export function isSentryConfigured(): boolean {
  const dsn = process.env.SENTRY_DSN?.trim();
  return Boolean(dsn && dsn.length > 0);
}
