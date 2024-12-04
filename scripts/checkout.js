import {renderOrderSummary} from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js';
import { cart } from "../data/cart.js";


if(cart.length===0){
  document.querySelector('.js-order-summary').innerHTML = "You cart is empty";
  document.querySelector('.js-payment-summary').classList.remove('payment-summary');
  document.querySelector('.js-cart-quantity-txt').innerHTML = '0';
}
 else{
//   loadProductsFetch().then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
  // });
}






