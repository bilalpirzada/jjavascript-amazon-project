import {cart} from '../../data/cart.js'
import { getProduct, products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { getDeliveryCost } from '../../data/deliveryOptions.js';


export function renderPaymentSummary(){
  let itemsPriceTotal=0;
  let shippingCostTotal = 0;
  let totalItems = 0;

  cart.forEach((cartItem)=>{

    //calcualte price
      const {productId, quantity, deliveryOptionId} = cartItem;
      const product = getProduct(productId);
      const {priceCents} = product;

      totalItems+=quantity;
      itemsPriceTotal += Number(priceCents*quantity);
      
    //calculate shipping cost
      const shippingPriceCents =Number(getDeliveryCost(deliveryOptionId));
      shippingCostTotal+=shippingPriceCents;
  })


  const totalPriceBeforeTax = itemsPriceTotal+shippingCostTotal
  const tax = (totalPriceBeforeTax/10);
  const orderTotal = totalPriceBeforeTax +tax;

  const paymentSummaryHTML = 
  `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(itemsPriceTotal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCostTotal)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalPriceBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;


  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}