export const cart = [];

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
      quantity
    });
  }
}