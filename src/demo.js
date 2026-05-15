import { OrderBook } from "./orderBook.js";

const book = new OrderBook("BTC-INR");

book.placeLimitOrder({ side: "sell", price: 5200000, quantity: 0.35 });
book.placeLimitOrder({ side: "sell", price: 5210000, quantity: 0.2 });
book.placeLimitOrder({ side: "buy", price: 5190000, quantity: 0.4 });

const execution = book.placeMarketOrder({ side: "buy", quantity: 0.4 });

console.log(JSON.stringify({ trades: execution.trades, book: book.snapshot(5) }, null, 2));
