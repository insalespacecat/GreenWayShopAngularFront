import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrderInterface} from '../interfaces/order-interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  OrderAPIURL = 'https://localhost:8443/order';
  constructor(private http: HttpClient) { }
  placeOrder(order: OrderInterface) {
    return this.http.post(this.OrderAPIURL, order);
  }
  getLastOrder() {
    return this.http.get<OrderInterface>(this.OrderAPIURL + '/last', {withCredentials: true});
  }
  getAllOrdersByUsername(username: string){
    return this.http.get<Array<OrderInterface>>(this.OrderAPIURL + '/getAllOrdersByUsername/' + username, {withCredentials: true});
  }
  getOperatorSlice(){
    return this.http.get(this.OrderAPIURL + '/getOperatorSlice');
  }
}
