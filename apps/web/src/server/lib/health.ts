import { pingDatabase } from "@estate/db/server";
import { z } from "zod";

export const healthDbStatusSchema = z.enum(["ok", "error"]);

export const healthStatusSchema = z.object({
  status: z.enum(["ok", "degraded"]),
  db: healthDbStatusSchema,
});

export type HealthStatus = z.infer<typeof healthStatusSchema>;

export const healthResponseSchema = z.object({
  data: healthStatusSchema,
  meta: z
    .object({
      timestamp: z.string().datetime(),
    })
    .optional(),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;

/** Liveness + DB readiness — `db: ok` when PostgreSQL responds to `SELECT 1`. */
export async function buildHealthStatus(): Promise<HealthStatus> {
  const dbOk = await pingDatabase();

  return {
    status: dbOk ? "ok" : "degraded",
    db: dbOk ? "ok" : "error",
  };
}
