import { buildWeEatzMenu } from "./composite/WeEatzMenu.js";
import { GHOST_KITCHENS } from "./domain/ghostKitchens.js";
import { MenuIterator } from "./iterator/MenuIterator.js";
import { DatabaseConnection } from "./singleton/DatabaseConnection.js";
import { OrderService } from "./services/OrderService.js";
import type { Customer } from "./domain/types.js";

function main(): void {
  console.log("weEatz — Online Food Delivery System");
  console.log("Prishtina, Kosovo · 8 Ghost Kitchen Locations\n");
  console.log("=".repeat(58));

  // --- Singleton demo ---
  console.log("\n1. SINGLETON — Database Connection\n");
  const db1 = DatabaseConnection.getInstance();
  const db2 = DatabaseConnection.getInstance();
  db1.connect();
  console.log(`  Same instance? ${db1 === db2 ? "Yes ✓" : "No"}`);

  // --- Ghost kitchens ---
  console.log("\n" + "=".repeat(58));
  console.log("\n2. GHOST KITCHENS — 8 Locations in Prishtina\n");
  for (const kitchen of GHOST_KITCHENS) {
    console.log(`  • ${kitchen.name} — ${kitchen.district}`);
  }

  // --- Composite + Iterator demo ---
  console.log("\n" + "=".repeat(58));
  console.log("\n3. COMPOSITE + ITERATOR — Fast Food Menu (20 products)\n");

  const menu = buildWeEatzMenu();
  console.log(menu.display());

  const iterator = new MenuIterator(menu);
  console.log(`\n  Iterator found ${iterator.count()} orderable products:`);
  for (const item of iterator) {
    console.log(`    → [${item.category}] ${item.name} (${item.price} EUR)`);
  }

  // --- Adapter + Observer via order flow ---
  console.log("\n" + "=".repeat(58));
  console.log("\n4. ADAPTER + OBSERVER — Place Order & Track Delivery\n");

  const customer: Customer = {
    id: "cust-001",
    name: "Arben Krasniqi",
    email: "arben.krasniqi@example.com",
    phone: "+383 44 123 456",
    address: "Rruga Nëna Terezë 15, Prishtina",
  };

  const kitchen = GHOST_KITCHENS[0]; // weEatz Dardania
  const orderService = new OrderService();

  const order = orderService.placeOrder(
    customer,
    kitchen,
    [
      { itemId: "b2", name: "Double Cheese Burger", quantity: 2, unitPrice: 5.9 },
      { itemId: "sd1", name: "Crispy Fries", quantity: 2, unitPrice: 2.0 },
      { itemId: "dr1", name: "Coca-Cola 0.33L", quantity: 2, unitPrice: 1.5 },
    ],
    "credit_card"
  );

  console.log(`\n  Order ${order.id} saved. Total: ${order.total.toFixed(2)} EUR`);
  console.log("\n  Order lifecycle notifications:\n");
  orderService.processOrderLifecycle(order.id);

  // Second order from different kitchen with PayPal
  console.log("\n  --- Second order from weEatz Ulpiana (PayPal adapter) ---\n");
  orderService.placeOrder(
    customer,
    GHOST_KITCHENS[1],
    [
      { itemId: "sw4", name: "Philly Cheese Steak", quantity: 1, unitPrice: 6.8 },
      { itemId: "dr4", name: "Fresh Lemonade", quantity: 1, unitPrice: 2.0 },
    ],
    "paypal"
  );

  // Third order — cash on delivery from Sunny Hill
  console.log("\n  --- Third order from weEatz Sunny Hill (Cash on Delivery) ---\n");
  orderService.placeOrder(
    customer,
    GHOST_KITCHENS[6],
    [{ itemId: "b5", name: "Spicy Hellfire Burger", quantity: 1, unitPrice: 6.0 }],
    "cash_on_delivery"
  );

  console.log("\n" + "=".repeat(58));
  console.log(`\nOrders in database: ${orderService.getDatabase().getAllOrders().length}`);
  console.log("Demo complete.\n");
}

main();
