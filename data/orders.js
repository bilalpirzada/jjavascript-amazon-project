import { cart } from "./cart.js";
import { getDeliveryOption } from "./deliveryOptions.js";

export const orders= JSON.parse(localStorage.getItem('orders')) ||
 [
  {
  id: "0e3713e6-209f-4bef-a3e2-ca267ad830ea",
  orderTime: "2024-02-27T20:57:02.235Z",
  totalCostCents: 5800,
  products: [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      estimatedDeliveryTime: "2024-03-01T20:57:02.235Z"
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      estimatedDeliveryTime: "2024-03-01T20:57:02.235Z"
    }
  ]
},
];

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

  return{
    id,
    orderTime,
    totalCostCents,
    products
  }
}




