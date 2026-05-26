import type { CreateOrderInput, OrderDto, PaymentInitDto } from "@/features/payments/payment.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";
import { getApiBaseUrl } from "@/lib/api-base-url";

function toOrderDto(order: {
  id: string;
  amount: { toString(): string };
  currency: string;
  status: string;
  provider: string | null;
  description: string | null;
}): OrderDto {
  return {
    id: order.id,
    amount: order.amount.toString(),
    currency: order.currency,
    status: order.status,
    provider: order.provider,
    description: order.description,
  };
}

/** Create pending order for payment init. */
export async function createPaymentOrder(input: CreateOrderInput): Promise<OrderDto> {
  const order = await getPrisma().order.create({
    data: {
      amount: input.amount,
      currency: input.currency ?? "AMD",
      description: input.description ?? null,
      status: "pending",
    },
    select: {
      id: true,
      amount: true,
      currency: true,
      status: true,
      provider: true,
      description: true,
    },
  });

  return toOrderDto(order);
}

/** Idram sandbox init — returns redirect URL to success/fail callback. */
export async function initIdramPayment(orderId: string): Promise<PaymentInitDto> {
  const order = await getPrisma().order.findUnique({
    where: { id: orderId },
    select: { id: true, status: true },
  });

  if (!order) {
    throw ApiError.notFound("Order not found");
  }

  if (order.status !== "pending") {
    throw ApiError.badRequest("Order is not pending", "INVALID_STATE");
  }

  const providerRef = `idram-${orderId}`;

  await getPrisma().$transaction([
    getPrisma().order.update({
      where: { id: orderId },
      data: { provider: "idram", providerRef },
    }),
    getPrisma().payment.create({
      data: {
        orderId,
        provider: "idram",
        status: "pending",
      },
    }),
  ]);

  const baseUrl = getApiBaseUrl();
  const isTestMode = process.env.IDRAM_TEST_MODE === "true";
  const redirectUrl = isTestMode
    ? `${baseUrl}/api/v1/payments/idram/callback?orderId=${orderId}&status=success`
    : `${baseUrl}/api/v1/payments/idram/callback?orderId=${orderId}`;

  return {
    orderId,
    redirectUrl,
    provider: "idram",
  };
}

/** Process Idram callback — updates order/payment status idempotently. */
export async function handleIdramCallback(
  orderId: string,
  statusParam: string | null,
): Promise<OrderDto> {
  const order = await getPrisma().order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      amount: true,
      currency: true,
      status: true,
      provider: true,
      description: true,
    },
  });

  if (!order) {
    throw ApiError.notFound("Order not found");
  }

  if (order.status === "paid") {
    return toOrderDto(order);
  }

  const success = statusParam === "success" || statusParam === "paid";
  const newStatus = success ? "paid" : "failed";

  const updated = await getPrisma().$transaction(async (tx) => {
    const next = await tx.order.update({
      where: { id: orderId },
      data: { status: newStatus },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        provider: true,
        description: true,
      },
    });

    await tx.payment.updateMany({
      where: { orderId, provider: "idram" },
      data: { status: newStatus },
    });

    return next;
  });

  return toOrderDto(updated);
}
