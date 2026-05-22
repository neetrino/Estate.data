/** Standard API envelope — align with apps/api when implemented. */
export type ApiEnvelope<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorBody = {
  error: {
    message: string;
    code?: string;
  };
};
