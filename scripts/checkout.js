import {cart, removeItemFromCart,calculateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';



function renderCartItems(){
  let matchingItem;
  let cartSummaryHTML='';
  
  cart.forEach((cartItem)=>
    {
      console.log(cartItem);
      products.forEach((productItem)=>
        {
          if(cartItem.productId===productItem.id)
            {
              matchingItem = productItem;
            }
        });
  
        cartSummaryHTML+=
        `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(matchingItem.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-btn" data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
    });
  
  
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    
}


function addEventListenerToDeleteBtn(){
  document.querySelectorAll('.js-delete-quantity-btn').forEach((btn)=>{
    btn.addEventListener('click',()=>{
      removeItemFromCart(btn.dataset.productId);
      const itemContainer = document.querySelector(`.js-cart-item-container-${btn.dataset.productId}`);
      itemContainer.remove();
      displayCheckoutItemQuanity();
    })
  });
}

function displayCheckoutItemQuanity(){
  document.querySelector('.js-cart-quantity-txt').innerHTML = calculateQuantity();
}

displayCheckoutItemQuanity();
renderCartItems();
addEventListenerToDeleteBtn();




