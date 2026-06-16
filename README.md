# weEatz — Online Food Delivery System

**Object-Oriented Design & Patterns**

**weEatz** is a fast-food delivery platform based in **Prishtina, Kosovo**, operating **8 ghost kitchen locations** across the city. Customers order burgers, sandwiches, wraps, sides, and drinks from a catalog of **20 products**, pay through multiple providers, and track delivery in real time.

**Repository:** https://github.com/leartt0/OODP-project

## Design Patterns Implemented

| Pattern    | Required | Implementation |
| ---------- | -------- | -------------- |
| Singleton  | Yes      | `DatabaseConnection` — single JSON-backed storage instance |
| Adapter    | Yes      | Payment adapters for Stripe, PayPal, and Cash on Delivery |
| Observer   | Yes      | Notifications to customer app, ghost kitchen, courier, HQ |
| Composite  | Optional | Menu tree — categories (Burgers, Sandwiches, Sides, Drinks) → items |
| Iterator   | Optional | `MenuIterator` traverses all 20 products |

## Ghost Kitchen Locations (Prishtina)

| # | Location |
|---|----------|
| 1 | weEatz Dardania |
| 2 | weEatz Ulpiana |
| 3 | weEatz Bregu i Diellit |
| 4 | weEatz Lakrishtë |
| 5 | weEatz Veternik |
| 6 | weEatz Kodra e Trimave |
| 7 | weEatz Sunny Hill |
| 8 | weEatz Aktash |

## Quick Start (Demo)

**Requirements:** Node.js 18+

```bash
git clone https://github.com/leartt0/OODP-project.git
cd OODP-project
npm install
npm start
```

The demo runs: database connection (Singleton) → list ghost kitchens → browse 20-item menu (Composite/Iterator) → place orders with 3 payment methods (Adapter) → track delivery (Observer).

## Project Structure

```
OODP-project/
├── docs/
│   └── REPORT.md           # Full report (patterns, Korpa.mk / Kliknijadi.mk research)
├── src/
│   ├── index.ts
│   ├── domain/
│   │   ├── types.ts
│   │   └── ghostKitchens.ts
│   ├── singleton/
│   ├── adapter/
│   ├── observer/
│   ├── composite/
│   ├── iterator/
│   └── services/
├── data/
├── package.json
└── README.md
```

## Build

```bash
npm run build
node dist/index.js
```

## Author

**Leart Saliu** — [@leartt0](https://github.com/leartt0) — ls128837@seeu.edu.mk

## License

Academic work — SEEU  
Developed by **Leart Saliu**
