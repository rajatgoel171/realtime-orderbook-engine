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

























## Random Update 20

- 2026-03-26: captured a repository-specific status note with no sequential date pattern.
- Documented work progress, validation, and operational context for realtime-orderbook-engine.

## Random Pass 2 Update 18

- 2025-12-15: recorded a new randomized checkpoint for documentation, validation, and operational notes.
- Kept the update isolated to this repository and this pass.
