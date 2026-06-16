import { DatabaseConnection } from "../singleton/DatabaseConnection.js";
import { createPaymentAdapter } from "../adapter/PaymentAdapter.js";
import {
  AdminDashboardObserver,
  CustomerNotificationObserver,
  DriverNotificationObserver,
  GhostKitchenNotificationObserver,
  OrderSubject,
} from "../observer/OrderNotificationSystem.js";
import type {
  Customer,
  GhostKitchen,
  Order,
  OrderLine,
  PaymentProvider,
} from "../domain/types.js";

export class OrderService {
  private db = DatabaseConnection.getInstance();
  private orderSubject = new OrderSubject();

  constructor() {
    this.orderSubject.attach(new CustomerNotificationObserver());
    this.orderSubject.attach(new GhostKitchenNotificationObserver());
    this.orderSubject.attach(new DriverNotificationObserver());
    this.orderSubject.attach(new AdminDashboardObserver());
    this.db.connect();
  }

  placeOrder(
    customer: Customer,
    kitchen: GhostKitchen,
    items: OrderLine[],
    paymentProvider: PaymentProvider
  ): Order {
    const total = items.reduce(
      (sum, line) => sum + line.unitPrice * line.quantity,
      0
    );

    const order: Order = {
      id: `WE-${Date.now()}`,
      customerId: customer.id,
      restaurantId: kitchen.id,
      kitchenName: kitchen.name,
      items,
      total,
      status: "placed",
      paymentProvider,
      createdAt: new Date().toISOString(),
    };

    const payment = createPaymentAdapter(paymentProvider);
    console.log(`\n  Kitchen: ${kitchen.name} (${kitchen.district}, ${kitchen.city})`);
    console.log(`  Payment via ${payment.getProviderName()} adapter:`);
    const result = payment.pay(total, "EUR", order.id);
    console.log(`  → ${result.message} (${result.transactionId})`);

    this.db.saveOrder(order);
    this.orderSubject.notify("order.statusChanged", {
      orderId: order.id,
      restaurantId: order.restaurantId,
      kitchenName: order.kitchenName,
      customerId: order.customerId,
      total: order.total,
      previousStatus: "new",
      newStatus: "placed",
    });
    return order;
  }

  processOrderLifecycle(orderId: string): void {
    const order = this.db.getOrder(orderId);
    if (!order) throw new Error(`Order ${orderId} not found`);

    const steps = [
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
    ] as const;

    for (const status of steps) {
      this.orderSubject.updateStatus(order, status);
    }
  }

  getOrderSubject(): OrderSubject {
    return this.orderSubject;
  }

  getDatabase(): DatabaseConnection {
    return this.db;
  }
}
