import type { PaymentResult } from "../domain/types.js";

/** Target interface our order service expects (unified payment contract). */
export interface PaymentTarget {
  pay(amount: number, currency: string, orderId: string): PaymentResult;
  getProviderName(): string;
}

/** Third-party credit card API with incompatible method signature. */
export class StripeApi {
  chargeCard(cardToken: string, amountCents: number, ref: string) {
    return {
      charge_id: `stripe_ch_${Date.now()}`,
      status: "succeeded",
      amount_cents: amountCents,
      reference: ref,
    };
  }
}

/** PayPal SDK with different parameter names. */
export class PayPalSdk {
  capturePayment(orderRef: string, value: number, currencyCode: string) {
    return {
      paypal_tx: `PP-${Date.now()}`,
      state: "COMPLETED",
      gross_amount: value,
      currency_code: currencyCode,
      custom_id: orderRef,
    };
  }
}

/** Cash on delivery — no online API, manual confirmation. */
export class CashOnDeliveryHandler {
  registerPendingCollection(deliveryId: string, amount: number) {
    return {
      cod_ref: `COD-${Date.now()}`,
      collect_on_delivery: true,
      amount_due: amount,
      delivery_id: deliveryId,
    };
  }
}
