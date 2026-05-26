/** Standard API envelope — align with apps/api when implemented. */
export type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorBody = {
  error: {
    message: string;
    code?: string;
    details?: readonly { path: string; message: string }[];
  };
};

/** GET /api/v1/health — liveness + DB readiness. */
export type HealthStatus = {
  status: "ok" | "degraded";
  db: "ok" | "error";
};
