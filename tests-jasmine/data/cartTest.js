import { addToCart, cart ,loadFromStorage} from "../../data/cart.js";


describe("Test suite: addToCart",()=>{
  it('adds an existing product to the cart',()=>{
    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('id-1',1);
    addToCart('id-1',1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart[0].productId).toEqual('id-1');
    console.log(cart)
  });

  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('id-1',1);
    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('id-1');
  })
})