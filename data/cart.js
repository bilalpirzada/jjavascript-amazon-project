export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart =JSON.parse(localStorage.getItem('cart')) ||
  [
    {
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:2,
      deliveryOptionId:'1'
    },
    {
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryOptionId:'2'
    }
  ];
}


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function emptyCart(){
  cart=[];
  saveToStorage();
}

export function addToCart(productId, quantity){
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
      quantity,
      deliveryOptionId:'1'
    });
  }

  saveToStorage();
}

export function removeItemFromCart(productId){
  cart.forEach((cartItem,index)=>{
    if(cartItem.productId===productId)
      {
        cart.splice(index,1);
      }
  })

  saveToStorage();
}

export function calculateQuantity(){
  let quantity=0;
  cart.forEach((cartItem)=>{
    quantity+=cartItem.quantity;
  })

  return quantity;
}

export function updateQuantity(productId, newQuantity){

  console.log(productId);
  console.log(newQuantity);
  cart.forEach((cartItem)=>{
      if(cartItem.productId===productId){
        console.log(cartItem);
        cartItem.quantity=newQuantity;
        console.log(cartItem);
      }
  })
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId){
  cart.forEach((carItem)=>{
    if(carItem.productId ===productId){
      carItem.deliveryOptionId = deliveryOptionId;
    }
  });

  
  localStorage.setItem('cart',JSON.stringify(cart));
}