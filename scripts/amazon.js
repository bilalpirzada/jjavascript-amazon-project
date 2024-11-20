
const productGridElement = document.querySelector('.js-products-grid');

let productsHTML='';

products.forEach((product)=>{
  productsHTML+=` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="js-add-to-cart-button add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

productGridElement.innerHTML = productsHTML;

const addToCartBtn = document.querySelectorAll('.js-add-to-cart-button');

let addedElementTimeoutId;

addToCartBtn.forEach((btn)=>{
  btn.addEventListener('click',()=>{

    const {productId} = btn.dataset;

    const quantity =Number( document.querySelector(`.js-quantity-selector-${productId}`).value);

    const addToCartElement = document.querySelector(`.js-added-to-cart-${productId}`);

    addToCartElement.classList.add('added-to-cart-show');

    if(addedElementTimeoutId){
      clearTimeout(addedElementTimeoutId);
    }
   

   addedElementTimeoutId= setTimeout(()=>{
      addToCartElement.classList.remove('added-to-cart-show');
    },2000);

   let itemMatched;

    cart.forEach((item)=>{
      if(productId === item.productId){
        item.quantity+=quantity;
        itemMatched=true;
      }
    });

    if(!itemMatched){
      cart.push({
        productId,
        quantity
      });
    }

    let carQuantity = 0;

    cart.forEach((item)=>{
      carQuantity+=item.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML=carQuantity;

   
  });
});