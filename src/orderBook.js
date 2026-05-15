let nextOrderId = 1;

export class OrderBook {
  constructor(symbol) {
    this.symbol = symbol;
    this.bids = [];
    this.asks = [];
    this.orders = new Map();
  }

  placeLimitOrder({ side, price, quantity }) {
    assertSide(side);
    assertPositive(price, "price");
    assertPositive(quantity, "quantity");

    const order = createOrder({ side, price, quantity, type: "limit" });
    const result = this.#match(order);

    if (order.remaining > 0) {
      this.#addRestingOrder(order);
    }

    return { order, trades: result.trades };
  }

  placeMarketOrder({ side, quantity }) {
    assertSide(side);
    assertPositive(quantity, "quantity");

    const order = createOrder({ side, price: null, quantity, type: "market" });
    return this.#match(order);
  }

  cancel(orderId) {
    const order = this.orders.get(orderId);
    if (!order) return false;

    const sideBook = order.side === "buy" ? this.bids : this.asks;
    const index = sideBook.findIndex((candidate) => candidate.id === orderId);
    if (index >= 0) sideBook.splice(index, 1);
    this.orders.delete(orderId);
    return true;
  }

  bestBid() {
    return this.bids[0] ? toQuote(this.bids[0]) : null;
  }

  bestAsk() {
    return this.asks[0] ? toQuote(this.asks[0]) : null;
  }

  snapshot(levels = 10) {
    return {
      symbol: this.symbol,
      bids: aggregateLevels(this.bids).slice(0, levels),
      asks: aggregateLevels(this.asks).slice(0, levels),
    };
  }

  #match(taker) {
    const trades = [];
    const oppositeBook = taker.side === "buy" ? this.asks : this.bids;

    while (taker.remaining > 0 && oppositeBook.length > 0) {
      const maker = oppositeBook[0];
      if (taker.type === "limit" && !crosses(taker, maker)) break;

      const quantity = Math.min(taker.remaining, maker.remaining);
      taker.remaining = round(taker.remaining - quantity);
      maker.remaining = round(maker.remaining - quantity);

      trades.push({
        symbol: this.symbol,
        makerOrderId: maker.id,
        takerOrderId: taker.id,
        price: maker.price,
        quantity,
        aggressorSide: taker.side,
      });

      if (maker.remaining === 0) {
        oppositeBook.shift();
        this.orders.delete(maker.id);
      }
    }

    return { trades, remaining: taker.remaining };
  }

  #addRestingOrder(order) {
    const sideBook = order.side === "buy" ? this.bids : this.asks;
    sideBook.push(order);
    sideBook.sort(compareOrders);
    this.orders.set(order.id, order);
  }
}

function createOrder({ side, price, quantity, type }) {
  return {
    id: `ord_${nextOrderId++}`,
    side,
    price,
    quantity,
    remaining: quantity,
    type,
    createdAt: Date.now(),
  };
}

function compareOrders(a, b) {
  if (a.side === "buy") {
    return b.price - a.price || a.createdAt - b.createdAt || a.id.localeCompare(b.id);
  }

  return a.price - b.price || a.createdAt - b.createdAt || a.id.localeCompare(b.id);
}

function crosses(taker, maker) {
  if (taker.side === "buy") return taker.price >= maker.price;
  return taker.price <= maker.price;
}

function aggregateLevels(orders) {
  const levels = new Map();
  for (const order of orders) {
    levels.set(order.price, round((levels.get(order.price) ?? 0) + order.remaining));
  }

  return [...levels.entries()].map(([price, quantity]) => ({ price, quantity }));
}

function toQuote(order) {
  return { price: order.price, quantity: order.remaining };
}

function assertSide(side) {
  if (!["buy", "sell"].includes(side)) {
    throw new Error(`Invalid side: ${side}`);
  }
}

function assertPositive(value, name) {
  if (typeof value !== "number" || Number.isNaN(value) || value <= 0) {
    throw new Error(`${name} must be a positive number`);
  }
}

function round(value) {
  return Number(value.toFixed(8));
}
