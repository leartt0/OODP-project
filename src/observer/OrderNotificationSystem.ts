import type { Observer, Subject } from "./Observer.js";
import type { Order, OrderStatus } from "../domain/types.js";

export class OrderSubject implements Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(event: string, data: Record<string, unknown>): void {
    for (const observer of this.observers) {
      observer.update(event, data);
    }
  }

  updateStatus(order: Order, newStatus: OrderStatus): void {
    const previous = order.status;
    order.status = newStatus;
    this.notify("order.statusChanged", {
      orderId: order.id,
      restaurantId: order.restaurantId,
      kitchenName: order.kitchenName,
      customerId: order.customerId,
      total: order.total,
      previousStatus: previous,
      newStatus,
    });
  }
}

export class CustomerNotificationObserver implements Observer {
  update(event: string, data: Record<string, unknown>): void {
    if (event !== "order.statusChanged") return;
    console.log(
      `  [weEatz App] Order ${data.orderId}: ${data.previousStatus} → ${data.newStatus}`
    );
  }
}

export class GhostKitchenNotificationObserver implements Observer {
  update(event: string, data: Record<string, unknown>): void {
    if (event !== "order.statusChanged") return;
    if (data.newStatus === "placed" || data.newStatus === "confirmed") {
      console.log(
        `  [Ghost Kitchen] ${data.kitchenName} — new order ${data.orderId}, start prep when confirmed`
      );
    }
    if (data.newStatus === "preparing") {
      console.log(
        `  [Ghost Kitchen] ${data.kitchenName} — cooking order ${data.orderId}`
      );
    }
  }
}

export class DriverNotificationObserver implements Observer {
  update(event: string, data: Record<string, unknown>): void {
    if (event !== "order.statusChanged") return;
    if (data.newStatus === "out_for_delivery") {
      console.log(
        `  [Courier] Pick up order ${data.orderId} from ${data.kitchenName}`
      );
    }
  }
}

export class AdminDashboardObserver implements Observer {
  private events: string[] = [];

  update(event: string, data: Record<string, unknown>): void {
    const entry = `${data.orderId}:${data.newStatus}`;
    this.events.push(entry);
    console.log(`  [weEatz HQ] Tracked — ${entry}`);
  }

  getEvents(): string[] {
    return [...this.events];
  }
}
