import {cart, removeItemFromCart, calculateQuantity,updateQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';



function renderCartItems(){
  let matchingItem;
  let cartSummaryHTML='';
  
  cart.forEach((cartItem)=>
    {
      products.forEach((productItem)=>
        {
          if(cartItem.productId===productItem.id)
            {
              matchingItem = productItem;
            }
        });
  
        let dateString = '';
        const deliveryOptionId = cartItem.deliveryOptionId;
        deliveryOptions.forEach((deliveryOption)=>{
          if(deliveryOptionId ===deliveryOption.id){
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            dateString = deliveryDate.format('dddd MMMM D');
            
          }
        })

        cartSummaryHTML+=
        `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
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
                      Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingItem.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingItem.id}">
                    <span class="save-quantity-link js-save-quantity-link link-primary" data-product-id="${matchingItem.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-btn" data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
                </div>
                
              </div>
            </div>
        `;
    });
  
  
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    
}

function deliveryOptionsHTML(matchingItem, cartItem){
 
  let html = '';
  
  deliveryOptions.forEach((deliveryOption)=>{

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd MMMM D');

    const price = formatCurrency(deliveryOption.priceCents);

    const priceString = price<=0?'Free': `$${price}`;

    const isChecked = deliveryOption.id ===cartItem.deliveryOptionId;

    html+=`        
                  <div class="delivery-option">
                    <input type="radio"
                      ${isChecked?'checked':''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} - Shipping
                      </div>
                    </div>
                  </div>`;
  });

return html;
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


document.querySelectorAll('.js-update-quantity-link').forEach((updateBtn)=>{
  updateBtn.addEventListener('click',()=>{
    const productId = updateBtn.dataset.productId;
    const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    itemContainer.classList.add('is-editing-quantity');
  })
})

document.querySelectorAll('.js-save-quantity-link').forEach((saveBtn)=>{
  saveBtn.addEventListener('click',()=>{

    const productId= saveBtn.dataset.productId;
    const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

    if(newQuantity>0){

     

      const itemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      itemContainer.classList.remove('is-editing-quantity');
  
  
      updateQuantity(productId,newQuantity);
      displayCheckoutItemQuanity();
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    }

   
  })
})


