import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { cart } from "../data/cart-oop.js";

console.log(cart);

renderOrderSummary();
renderPaymentSummary();

