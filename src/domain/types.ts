export type OrderStatus =
  | "placed"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentProvider = "credit_card" | "paypal" | "cash_on_delivery";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface GhostKitchen {
  id: string;
  name: string;
  district: string;
  city: string;
  cuisine: string;
}

/** @deprecated alias — ghost kitchens act as virtual restaurants in the order flow */
export type Restaurant = GhostKitchen;

export interface MenuItemData {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
}

export interface OrderLine {
  itemId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  kitchenName: string;
  items: OrderLine[];
  total: number;
  status: OrderStatus;
  paymentProvider: PaymentProvider;
  createdAt: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}
