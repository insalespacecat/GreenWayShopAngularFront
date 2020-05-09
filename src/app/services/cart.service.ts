import { Injectable } from '@angular/core';
import {ProductInterface} from '../interfaces/product-interface';
import {CartItemInterface} from '../interfaces/cart-item-interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//Logic that has to provide functionality
//for "beautiful sticky cart that can be shown and hidden by pressing a button" is commented out because
//1)it is not working properly 2) i was unable to implement this type of layout at the moment because i am noob and dkwtd:
//"sticky" property does not work properly (angular issue), position: fixed makes the layout not scalable
//button does not fit mat-grid tile properly
//if i'm trying to remove the cart from mat-gird-list, and place it somewhere else it becomes not clickable
//(in navbar component) for example.

export class CartService {

  private cart: Array<CartItemInterface> = [];
  cartTotalPrice = 0;
  itemIndex: number;
  cartAPIURL = 'https://localhost:8443/cart';
  postSyncResult: any;
  //firstProductExists = false;

  constructor(private http: HttpClient) { }

  getTotalPrice() {
    this.cartTotalPrice = 0;
    this.cart.forEach(item => { this.cartTotalPrice += item.price; });
    return this.cartTotalPrice;
  }
  /*
  firstProductAdded() {
    if (this.firstProductExists) {
      return false;
    } else {
      this.firstProductExists = true;
      return true;
    }
  }
   */
  /*
  hasProducts() {
    return this.cart.length > 0;
  }
   */
  add(cartItem: CartItemInterface) {
    this.cart.forEach(elem => {
      if (elem.id === cartItem.id) {
        this.itemIndex = this.cart.indexOf(elem);
      }
    });
    if (this.itemIndex != null) {
      this.cart[this.itemIndex].price += cartItem.price;
      this.cart[this.itemIndex].quantity += cartItem.quantity;
    } else {
      this.cart.push(cartItem);
    }
    this.itemIndex = null;
    this.postSync();
    return this.get();
  }
  get() {
    return this.cart.slice();
  }
  remove(index: number) {
    this.cart.splice(index, 1);
    this.patchSync();
    /*
    if (this.cart.length === 0) {
      this.firstProductExists = false;
    }
     */
    return this.get();
  }
  postSync() {
    return this.http.post<Array<CartItemInterface>>(this.cartAPIURL + '/syncPost', this.cart, {withCredentials: true})
      .subscribe(res => this.cart = res);
  }
  getSync() {
    return this.http.get<Array<CartItemInterface>>(this.cartAPIURL + '/syncGet', {withCredentials: true})
      .subscribe(res => this.cart = res);
  }
  patchSync() {
    return this.http.patch<Array<CartItemInterface>>(this.cartAPIURL + '/syncPatch', this.cart, {withCredentials: true})
      .subscribe(res => this.cart = res);
  }
  deleteSync() {
    return this.http.delete<Array<CartItemInterface>>(this.cartAPIURL + '/syncDelete', {withCredentials: true})
      .subscribe(res => this.cart = res);
  }
}
