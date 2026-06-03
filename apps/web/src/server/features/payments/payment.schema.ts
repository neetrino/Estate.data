import { z } from "zod";

export const createOrderSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3).default("AMD"),
  description: z.string().max(500).optional(),
});

export type CreateOrderInput = {
  amount: number;
  currency?: string;
  description?: string;
};

export type OrderDto = {
  id: string;
  amount: string;
  currency: string;
  status: string;
  provider: string | null;
  description: string | null;
};

export type PaymentInitDto = {
  orderId: string;
  redirectUrl: string;
  provider: string;
};
