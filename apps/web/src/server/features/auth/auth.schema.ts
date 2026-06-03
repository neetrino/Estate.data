import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;

export const adminRefreshSchema = z.object({
  token: z.string().min(1),
});

export type AdminRefreshInput = z.infer<typeof adminRefreshSchema>;

export type AdminAuthResponse = {
  token: string;
  expiresIn: string;
};
