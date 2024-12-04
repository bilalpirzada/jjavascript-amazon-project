import { cart } from "./cart.js";
import { getDeliveryOption } from "./deliveryOptions.js";

export const orders= JSON.parse(localStorage.getItem('orders')) ||
 [];

function saveToStorage(){
  localStorage.setItem('orders',JSON.stringify(orders));
}

const uid = function(){
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export  function placeOrder(totalCostCents){
  
  const id = uid();
  const orderTime = dayjs().format('YYYY-MM-DDTHH:mm:ss');
  let products = [];
  cart.forEach((cartItem)=>{
    const {productId, quantity, deliveryOptionId} = cartItem;
    const deliveryOption  = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const estimatedDeliveryTime=deliveryDate.format('YYYY-MM-DDTHH:mm:ss');;
    products.push({
        productId,
        quantity,
        estimatedDeliveryTime
    })
   
  });

  orders.push({
    id,
    orderTime,
    totalCostCents,
    products
  });

  saveToStorage();
}




