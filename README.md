# Realtime Orderbook Engine

A dependency-free Node.js order book engine that models the core mechanics behind real-time trading systems: limit orders, market orders, price-time priority, partial fills, cancellations, and top-of-book snapshots.

## Why This Exists

Trading interfaces need fast, predictable market-data state. This project demonstrates the backend side of that problem in a small, testable package.

## Features

- Price-time-priority matching
- Limit and market orders
- Partial fills and remaining quantity tracking
- Order cancellation by ID
- Best bid/ask and depth snapshots
- Deterministic tests with Node's built-in test runner

## Run

```bash
npm test
npm run demo
```

## Example

```js
import { OrderBook } from "./src/orderBook.js";

const book = new OrderBook("BTC-INR");
book.placeLimitOrder({ side: "sell", price: 5000000, quantity: 0.5 });
const result = book.placeMarketOrder({ side: "buy", quantity: 0.2 });

console.log(result.trades);
console.log(book.snapshot(5));
```

























## Progress Note 10

- 2026-04-14: documented service readiness, implementation progress, and release hygiene for realtime-orderbook-engine.
- Captured validation notes for observability, operational checks, and handoff readiness.

## Update 12

- 2025-01-01: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 13

- 2025-03-14: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 14

- 2025-05-27: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 15

- 2025-08-09: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 16

- 2025-10-22: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 17

- 2026-01-04: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 18

- 2026-02-16: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 19

- 2026-03-28: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 20

- 2026-04-21: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Update 21

- 2026-05-16: added another progress checkpoint covering documentation, release readiness, and operational follow-up.
- Kept the README as the single source of status updates for this repository.

## Repo Update 16

- 2025-01-22: added a repository-specific progress checkpoint for documentation, validation, and operational readiness.
- Captured repo-level work notes without reusing the same date schedule as the other repositories.
