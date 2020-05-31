import { Injectable } from '@angular/core';
import {CartItemInterface} from "../interfaces/cart-item-interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

//TODO: This implementation is rly bad. Rewrite it!

//Purchase process service unites cart service and order service
export class PurchaseProcessService {
  //Cart properties declaration
  cartAPIURL = 'https://localhost:8443/cart';

  constructor(private http: HttpClient){
  }

  //**********CART BLOCK************
  //Cart service implementation is based on on idea, that cart in our app should
  //be available during the session. Therefore that, on any changes, we perform a sync with API
  //that saves cart in session attributes. At any sync API returns back cart body.
  //Using this pattern we prevent unexpected cart drops and provide good user experience

  //PurchaseProcess service is used as the connector between productCard and CartComponent. Because
  //i need to connect somehow "add to cart" and cart view to achieve immediate update of the cart component after
  //press button. So i decided to use cartHolder in PurchaseProcess Service for this. Add to cart button updates the
  //cartHolder and cartHolder is used to show the products in the view.

  //Methods for cartContent
  getCart(){
    this.getSync();
    return JSON.parse(sessionStorage.getItem('cartBody'));
  }

  deleteItemFromCart(item) {
    let cartHolder = JSON.parse(sessionStorage.getItem('cartBody'));
    let index = this.findCartItemByIdInCartHolder(item.id, cartHolder);
    console.log('item is ' + JSON.stringify(item));
    console.log('index is ' + JSON.stringify(index));
    cartHolder.splice(index, 1);
    this.postSync(cartHolder);
    this.getSync();
    cartHolder = JSON.parse(sessionStorage.getItem('cartBody'));
    sessionStorage.setItem('cartBody', cartHolder);
  }
  getTotalPrice() {
    let cartTotalPrice = 0;
    let cartBody = JSON.parse(sessionStorage.getItem('cartBody'));
    cartBody.forEach(item => { cartTotalPrice += item.price; });
    return cartTotalPrice;
  }


  postSync(cartBody: Array<CartItemInterface>) {
   this.http.post<Array<CartItemInterface>>(this.cartAPIURL + '/syncPost', cartBody, {withCredentials: true})
     .subscribe(res => {});
  }
  getSync() {
    this.http.get<Array<CartItemInterface>>(this.cartAPIURL + '/syncGet', {withCredentials: true})
      .subscribe(res => sessionStorage.setItem('cartBody', JSON.stringify(res)));
  }
  patchSync(cartBody: Array<CartItemInterface>) {
    this.http.patch<Array<CartItemInterface>>(this.cartAPIURL + '/syncPatch', cartBody, {withCredentials: true})
      .subscribe(res => sessionStorage.setItem('cartBody', JSON.stringify(res)));
  }
  deleteSync() {
    this.http.delete<Array<CartItemInterface>>(this.cartAPIURL + '/syncDelete', {withCredentials: true})
      .subscribe(res => sessionStorage.setItem('cartBody', JSON.stringify(res)));
  }

  //**Cart Filler
  //Cart filler provides functionality to add new items to the cart.
  //Every product carD has "Add to cart" button with quantity input.
  //Purchase process service should be injected in the carDs in order
  //to make the interaction work.
  //Cart filler logic uses local cartFillerCartHolder array, that
  //is updated by getSync() at the beginning of cartFiller method,
  //then we update cart objects in cartFillerCartHolder based on received item from card
  // (for example if user has 1 item of white tea, and adds one more, then cartItem.quantity should be set to 2,
  // and the price should increase)
  //and then we perform a postSync()

  addItemToCart(item: CartItemInterface){
      this.getSync();
      let index: number = null;
      let cartHolder: Array<CartItemInterface> = JSON.parse(sessionStorage.getItem('cartBody'));
      if(cartHolder == null){
        cartHolder = new Array<CartItemInterface>();
      }
      else {
        index = this.findCartItemByIdInCartHolder(item.id, cartHolder);
        console.log("index is " + index);
      }
      console.log("Checking addItemToCart...");
      console.log("cartHolder is" + JSON.stringify(cartHolder));
      if (index !== null) {
        cartHolder[index].price += item.price;
        cartHolder[index].quantity += item.quantity;
        console.log("cartHolder is" + JSON.stringify(cartHolder));
        sessionStorage.setItem('cartBody', JSON.stringify(cartHolder));
      } else {
        cartHolder.push(item);
        console.log("Pushed the item, cartHolder is now: " + JSON.stringify(cartHolder));
        sessionStorage.setItem('cartBody', JSON.stringify(cartHolder));
      }
      this.postSync(cartHolder);
  }

  private findCartItemByIdInCartHolder(id: number, cartHolder: Array<CartItemInterface>){
    this.getSync();
    cartHolder = JSON.parse(sessionStorage.getItem('cartBody'));
    let index = null;
    cartHolder.forEach(elem => {
      console.log(JSON.stringify(elem.id));
      if (elem.id === id) {
        console.log('condition is true');
        index =  cartHolder.indexOf(elem);
      }
    });
    if(index !== null) {
      return index;
    } else {
    return null;
    }
  }

}
