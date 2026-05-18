import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_USE_MOCK_API: z
    .enum(["true", "false"])
    .default("true")
    .transform((value) => value === "true"),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

function parseClientEnv(): ClientEnv {
  const result = clientEnvSchema.safeParse({
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
    NEXT_PUBLIC_USE_MOCK_API:
      process.env.NEXT_PUBLIC_USE_MOCK_API ?? "true",
  });

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid client environment: ${message}`);
  }

  return result.data;
}

/** Validated public env — safe for client bundles. */
export const clientEnv = parseClientEnv();
