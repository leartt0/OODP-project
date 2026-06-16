# weEatz — Project Report

**Course:** Object-Oriented Design & Patterns  
**Authors:** Leart Saliu — leartt0 (ls128837@seeu.edu.mk)  
**Submission:** Individual  
**Repository:** https://github.com/leartt0/OODP-project

---

## 1. Introduction

### 1.1 Project Overview

**weEatz** is an online food delivery service based in **Prishtina, Kosovo**. Instead of traditional dine-in restaurants, weEatz operates **8 ghost kitchen locations** distributed across city districts (Dardania, Ulpiana, Bregu i Diellit, Lakrishtë, Veternik, Kodra e Trimave, Sunny Hill, Aktash). Each kitchen prepares the same catalog of **20 fast-food products** — burgers, sandwiches, wraps, sides, and drinks — for delivery through the weEatz app.

Ghost kitchens (also called cloud kitchens or dark kitchens) allow one brand to cover an entire city with multiple prep locations while sharing a single menu and ordering platform.

### 1.2 Scope

This project delivers a **working console demo** implementing all mandatory design patterns plus Composite and Iterator. It does not implement the full production feature set of platforms like Korpa.mk or Kliknijadi.mk, but demonstrates a realistic subset with clear pattern usage.

---

## 2. Requirements Research

We researched regional food delivery platforms to define software requirements.

### 2.1 Reference Platforms

| Platform | Region | Key Features |
| -------- | ------ | ------------ |
| [Korpa.mk](https://korpa.mk) | North Macedonia | Restaurant listings, cart, online payment, delivery tracking |
| [Kliknijadi.mk](https://kliknijadi.mk) | North Macedonia | Multi-restaurant ordering, categories, promotions |
| KFC Ordering (MK) | Macedonia | Branded menu, pickup/delivery, limited product catalog |

### 2.2 Functional Requirements

| ID | Requirement | Implemented |
| -- | ----------- | ----------- |
| FR-01 | User registration and login | No (out of scope) |
| FR-02 | Browse kitchens / restaurants by location | Yes (8 ghost kitchens listed) |
| FR-03 | View menu with categories and items | Yes — 20 products, Composite pattern |
| FR-04 | Add items to cart and checkout | Yes — demo order lines |
| FR-05 | Multiple payment methods | Yes — Adapter pattern (card, PayPal, COD) |
| FR-06 | Order status tracking | Yes — Observer pattern |
| FR-07 | Kitchen dashboard for incoming orders | Yes — ghost kitchen observer |
| FR-08 | Courier dispatch notifications | Yes — driver observer |
| FR-09 | Admin / HQ reporting | Yes — admin observer |
| FR-10 | Persistent order storage | Yes — Singleton database |

### 2.3 Non-Functional Requirements

| ID | Requirement | How Addressed |
| -- | ----------- | ------------- |
| NFR-01 | Single database connection | Singleton pattern |
| NFR-02 | Extensible payment providers | Adapter pattern |
| NFR-03 | Loose coupling for notifications | Observer pattern |
| NFR-04 | Extensible menu structure | Composite + Iterator |

---

## 3. weEatz Business Model

| Concept | Detail |
| ------- | ------ |
| City | Prishtina, Kosovo |
| Model | Ghost kitchen network (delivery-only, no dine-in) |
| Locations | 8 districts across the city |
| Product range | 20 items — burgers (6), sandwiches & wraps (5), sides (5), drinks (4) |
| Price range | 1.00 – 6.80 EUR per item |
| Payment | Credit card, PayPal, cash on delivery |

Each ghost kitchen acts as a virtual restaurant in the order flow — the customer selects the nearest kitchen, but the menu is shared across all locations.

---

## 4. Design Patterns

### 4.1 Singleton — Database Connection (Mandatory)

**Problem:** Order placement, status updates, and admin queries all need database access. Multiple connections waste resources and risk inconsistent state.

**Solution:** `DatabaseConnection` with private constructor and `getInstance()`. All services share one instance; orders persist to `data/orders.json`.

**Files:** `src/singleton/DatabaseConnection.ts`

---

### 4.2 Adapter — Multiple Payment Methods (Mandatory)

**Problem:** Payment providers use incompatible APIs (Stripe `chargeCard`, PayPal `capturePayment`, COD `registerPendingCollection`). The order service needs one interface: `pay(amount, currency, orderId)`.

**Solution:**

| Adapter | Provider |
| ------- | -------- |
| `StripePaymentAdapter` | credit_card |
| `PayPalPaymentAdapter` | paypal |
| `CashOnDeliveryAdapter` | cash_on_delivery |

**Files:** `src/adapter/PaymentAdapter.ts`, `src/adapter/third-party-apis.ts`

---

### 4.3 Observer — Order Status Notifications (Mandatory)

**Problem:** Status changes must notify the customer app, ghost kitchen, courier, and weEatz HQ without tight coupling.

**Solution:** `OrderSubject` broadcasts `order.statusChanged` to:
- `CustomerNotificationObserver` — weEatz app
- `GhostKitchenNotificationObserver` — kitchen prep screen
- `DriverNotificationObserver` — courier dispatch
- `AdminDashboardObserver` — HQ analytics

**Lifecycle:** `placed → confirmed → preparing → out_for_delivery → delivered`

**Files:** `src/observer/OrderNotificationSystem.ts`

---

### 4.4 Composite — Menu Structure (Optional)

**Problem:** The menu has categories (Burgers, Sandwiches, Sides, Drinks) each containing individual products. Client code should treat one item and a whole category uniformly.

**Solution:** `MenuCategory` (composite) contains `MenuItem` (leaf) nodes. Both implement `MenuComponent`.

**Files:** `src/composite/MenuComponent.ts`, `src/composite/WeEatzMenu.ts`

---

### 4.5 Iterator — Menu Traversal (Optional)

**Problem:** The cart and search features need to walk all 20 products without exposing the category tree.

**Solution:** `MenuIterator` flattens the composite menu via `getItems()` and implements the standard `Iterator` protocol.

**Files:** `src/iterator/MenuIterator.ts`

---

## 5. Architecture

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Customer    │────▶│   OrderService   │────▶│ DatabaseConnection│
│  (weEatz app)│     │                  │     │   (Singleton)    │
└──────────────┘     │  Payment Adapter │──▶  Stripe/PayPal/COD
                     │  Order Subject   │──▶  Customer/Kitchen/
                     │                  │     Courier/HQ observers
                     └──────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │  8 Ghost Kitchens (Prishtina) │
              │  Menu: 20 products (Composite) │
              │  MenuIterator                 │
              └───────────────────────────────┘
```

---

## 6. Demo Walkthrough

`npm start` executes:

1. **Singleton** — confirms single DB instance
2. **Ghost kitchens** — lists all 8 Prishtina locations
3. **Composite + Iterator** — displays menu; iterator lists 20 products
4. **Adapter + Observer** — order from weEatz Dardania (credit card), lifecycle notifications
5. Second order from weEatz Ulpiana (PayPal)
6. Third order from weEatz Sunny Hill (cash on delivery)

---

## 7. Future Work

Not implemented (acceptable per brief):

- Mobile app UI
- GPS-based nearest-kitchen routing
- Real-time courier tracking map
- Loyalty program and promotions
- PostgreSQL production database

---

## 8. Conclusion

weEatz demonstrates five Gang of Four patterns in a realistic Prishtina-based food delivery domain with 8 ghost kitchens and 20 fast-food products. Mandatory Singleton, Adapter, and Observer patterns are fully functional; Composite and Iterator extend the menu subsystem. Installable demo with documentation at https://github.com/leartt0/OODP-project.

---

## References

- Korpa.mk — https://korpa.mk
- Kliknijadi.mk — https://kliknijadi.mk
- Gamma, E. et al. — *Design Patterns: Elements of Reusable Object-Oriented Software*
