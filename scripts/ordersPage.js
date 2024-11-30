import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import {getProduct} from '../data/products.js'

const orderGridElement =document.querySelector('.js-orders-grid');

let orderContainerHTML='';




orders.forEach((orderItem)=>{
  let productContainerHTML = '';

  orderItem.products.forEach((product)=>{

    const productInfo = getProduct(product.productId);


    productContainerHTML+=`
      <div class="product-image-container">
      <img src="${productInfo.image}">
    </div>

    <div class="product-details">
      <div class="product-name">
        ${productInfo.name}
      </div>
      <div class="product-delivery-date">
        Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
      </div>
      <div class="product-quantity">
        Quantity: ${product.quantity}
      </div>
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </div>

    <div class="product-actions">
      <a href="tracking.html?orderId=123&productId=456">
        <button class="track-package-button button-secondary">
          Track package
        </button>
      </a>
    </div>
    `;

  })




  orderContainerHTML += `<div class="order-container">
          
  <div class="order-header">
    <div class="order-header-left-section">
      <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${dayjs(orderItem.orderTime).format('MMMM D')}</div>
      </div>
      <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${formatCurrency(orderItem.totalCostCents)}</div>
      </div>
    </div>

    <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${orderItem.id}</div>
    </div>
  </div>

  <div class="order-details-grid">

  ${productContainerHTML}

    
  </div>
</div>`;
});




orderGridElement.innerHTML =orderContainerHTML;