import assert from "node:assert/strict";
import { test } from "node:test";
import { OrderBook } from "../src/orderBook.js";

test("matches market buy against best asks first", () => {
  const book = new OrderBook("BTC-INR");
  book.placeLimitOrder({ side: "sell", price: 102, quantity: 1 });
  book.placeLimitOrder({ side: "sell", price: 101, quantity: 1 });

  const result = book.placeMarketOrder({ side: "buy", quantity: 1.5 });

  assert.equal(result.trades.length, 2);
  assert.equal(result.trades[0].price, 101);
  assert.equal(result.trades[1].price, 102);
  assert.deepEqual(book.bestAsk(), { price: 102, quantity: 0.5 });
});

test("cancels resting limit orders", () => {
  const book = new OrderBook("ETH-INR");
  const { order } = book.placeLimitOrder({ side: "buy", price: 250000, quantity: 2 });

  assert.equal(book.cancel(order.id), true);
  assert.equal(book.cancel(order.id), false);
  assert.equal(book.bestBid(), null);
});
