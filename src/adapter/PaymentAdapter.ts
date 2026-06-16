import type { PaymentResult } from "../domain/types.js";
import type { PaymentTarget } from "./third-party-apis.js";
import {
  CashOnDeliveryHandler,
  PayPalSdk,
  StripeApi,
} from "./third-party-apis.js";

/** Adapter — wraps StripeApi to implement PaymentTarget. */
export class StripePaymentAdapter implements PaymentTarget {
  constructor(private stripe = new StripeApi()) {}

  getProviderName() {
    return "credit_card";
  }

  pay(amount: number, currency: string, orderId: string): PaymentResult {
    const cents = Math.round(amount * 100);
    const response = this.stripe.chargeCard("tok_demo", cents, orderId);
    return {
      success: response.status === "succeeded",
      transactionId: response.charge_id,
      message: `Stripe charged ${amount} ${currency}`,
    };
  }
}

/** Adapter — wraps PayPalSdk to implement PaymentTarget. */
export class PayPalPaymentAdapter implements PaymentTarget {
  constructor(private paypal = new PayPalSdk()) {}

  getProviderName() {
    return "paypal";
  }

  pay(amount: number, currency: string, orderId: string): PaymentResult {
    const response = this.paypal.capturePayment(orderId, amount, currency);
    return {
      success: response.state === "COMPLETED",
      transactionId: response.paypal_tx,
      message: `PayPal captured ${amount} ${currency}`,
    };
  }
}

/** Adapter — wraps CashOnDeliveryHandler to implement PaymentTarget. */
export class CashOnDeliveryAdapter implements PaymentTarget {
  constructor(private cod = new CashOnDeliveryHandler()) {}

  getProviderName() {
    return "cash_on_delivery";
  }

  pay(amount: number, currency: string, orderId: string): PaymentResult {
    const response = this.cod.registerPendingCollection(orderId, amount);
    return {
      success: true,
      transactionId: response.cod_ref,
      message: `Cash on delivery registered — collect ${amount} ${currency} at door`,
    };
  }
}

export function createPaymentAdapter(
  provider: "credit_card" | "paypal" | "cash_on_delivery"
): PaymentTarget {
  switch (provider) {
    case "credit_card":
      return new StripePaymentAdapter();
    case "paypal":
      return new PayPalPaymentAdapter();
    case "cash_on_delivery":
      return new CashOnDeliveryAdapter();
  }
}
