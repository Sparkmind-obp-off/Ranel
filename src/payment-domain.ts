// Provider-neutral Core seam. No live adapter or persistence implementation exists.
// Implementations must verify family-specific signatures outside this domain.
export type PaymentState = "pending" | "paid" | "failed";
export type PaymentOrder = {
  id: string;
  merchant: string;
  reference: string;
  amount: number;
  currency: "IDR";
  state: PaymentState;
  fulfillment: "not_started" | "manual_pending";
};
export type VerifiedPaymentEvent = {
  eventId: string;
  orderId: string;
  merchant: string;
  reference: string;
  amount: number;
  currency: "IDR";
  outcome: "paid" | "failed";
  source: "verified_provider";
};

// This shape is not signature proof. Only an audited provider adapter may construct
// it after verification/reconciliation. Never deserialize a browser body into it.
export interface PaymentAdapter {
  verifyCallback(request: Request): Promise<VerifiedPaymentEvent>;
}

export type Transition = {
  order: PaymentOrder;
  audit: {
    eventId: string;
    orderId: string;
    type: "payment.confirmed" | "payment.failed";
    from: PaymentState;
    to: PaymentState;
    source: "verified_provider";
  };
};

// Contract only, not a production implementation. An implementation MUST atomically
// correlate the stored order, enforce event uniqueness and transition rules, update
// payment state and insert the audit receipt. Identical retries return duplicate;
// reused event IDs with different contents fail. No memory/file substitute allowed.
export interface DurablePaymentStore {
  applyVerifiedEvent(event: VerifiedPaymentEvent): Promise<
    | { status: "applied"; transition: Transition }
    | { status: "duplicate" }
  >;
}

export class PaymentContractError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "PaymentContractError";
  }
}

const boundedId = (value: unknown): value is string =>
  typeof value === "string" && /^[A-Za-z0-9_-]{1,128}$/.test(value);

export function planPaymentTransition(
  order: PaymentOrder | null,
  event: VerifiedPaymentEvent,
): Transition {
  const fail = (code: string): never => { throw new PaymentContractError(code); };
  if (!order) return fail("ORDER_NOT_FOUND");
  if (
    !boundedId(event.eventId) || !boundedId(event.orderId) ||
    !boundedId(event.merchant) || !boundedId(event.reference) ||
    !Number.isSafeInteger(event.amount) || event.amount <= 0 ||
    event.currency !== "IDR" || event.source !== "verified_provider" ||
    !["paid", "failed"].includes(event.outcome)
  ) return fail("INVALID_VERIFIED_EVENT");
  if (
    order.id !== event.orderId || order.merchant !== event.merchant ||
    order.reference !== event.reference || order.amount !== event.amount ||
    order.currency !== event.currency
  ) return fail("PAYMENT_CORRELATION_MISMATCH");
  // Replays are handled by a durable atomic receipt, not by accepting terminal
  // transitions here. Refund, fulfillment and revenue mutation are separate commands.
  if (order.state !== "pending" || order.fulfillment !== "not_started")
    return fail("ILLEGAL_PAYMENT_TRANSITION");
  return {
    order: {
      ...order,
      state: event.outcome,
      fulfillment: event.outcome === "paid" ? "manual_pending" : "not_started",
    },
    audit: {
      eventId: event.eventId,
      orderId: order.id,
      type: event.outcome === "paid" ? "payment.confirmed" : "payment.failed",
      from: order.state,
      to: event.outcome,
      source: "verified_provider",
    },
  };
}
