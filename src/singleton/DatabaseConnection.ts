import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Order } from "../domain/types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "../../data/orders.json");

interface DatabaseSchema {
  orders: Order[];
}

/**
 * Singleton — ensures a single database connection / storage instance
 * across the weEatz application.
 */
export class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private data: DatabaseSchema = { orders: [] };
  private connected = false;

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  connect(): void {
    if (this.connected) {
      console.log("  [DB Singleton] Reusing existing connection");
      return;
    }

    const dir = dirname(DB_PATH);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

    if (existsSync(DB_PATH)) {
      this.data = JSON.parse(readFileSync(DB_PATH, "utf-8")) as DatabaseSchema;
    } else {
      writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
    }

    this.connected = true;
    console.log("  [DB Singleton] Connected to", DB_PATH);
  }

  saveOrder(order: Order): void {
    this.data.orders.push(order);
    writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  getOrder(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id);
  }

  updateOrder(order: Order): void {
    const index = this.data.orders.findIndex((o) => o.id === order.id);
    if (index >= 0) this.data.orders[index] = order;
    writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2));
  }

  getAllOrders(): Order[] {
    return [...this.data.orders];
  }
}
