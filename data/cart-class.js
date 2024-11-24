
class Cart{
  cartItems;
  #localStorageKey;


  constructor(localStorageKey){

    this.#localStorageKey=localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems =JSON.parse(localStorage.getItem(this.#localStorageKey)) ||
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

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity){
    let itemMatched;
  
    this.cartItems.forEach((item)=>{
      if(productId === item.productId){
        item.quantity+=quantity;
        itemMatched=true;
      }
    });
  
    if(!itemMatched){
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId:'1'
      });
    }
  
    this.saveToStorage();
  }


  removeItemFromCart(productId){
    this.cartItems.forEach((cartItem,index)=>{
      if(cartItem.productId===productId)
        {
          this.cartItems.splice(index,1);
        }
    })
  
    this.saveToStorage();
  }


  calculateQuantity(){
    let quantity=0;
    this.cartItems.forEach((cartItem)=>{
      quantity+=cartItem.quantity;
    })
  
    return quantity;
  }

  updateQuantity(productId, newQuantity){
  
    this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId===productId){
          cartItem.quantity=newQuantity;
        }
    })
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }

  updateDeliveryOption(productId, deliveryOptionId){
    this.cartItems.forEach((carItem)=>{
      if(carItem.productId ===productId){
        carItem.deliveryOptionId = deliveryOptionId;
      }
    });
  
    
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  }
}


  
  export const cart =new Cart('cart-class');

  
  
  
  
  
  
  
  
  
  