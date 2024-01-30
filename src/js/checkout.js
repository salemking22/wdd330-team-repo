import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".checkout-process");
checkout.init();
checkout.displayOrderTotals();
