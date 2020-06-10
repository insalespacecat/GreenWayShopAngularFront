import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderInterface} from '../interfaces/order-interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  OrderAPIURL = 'https://greenway-backend.herokuapp.com/order';
  token: string;
  private headers;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    console.log('token in orderService is' + this.token)
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5',
      'Authorization': 'Bearer ' + JSON.parse(this.token) } );
  }
  placeOrder(order: OrderInterface) {
    return this.http.post(this.OrderAPIURL, order);
  }
  getLastOrder() {
    return this.http.get<OrderInterface>(this.OrderAPIURL + '/last', {headers: this.headers});
  }
  getAllOrdersByUsername(username: string){
    return this.http.get<Array<OrderInterface>>(this.OrderAPIURL + '/getAllOrdersByUsername/' + username, {headers: this.headers});
  }
  getOperatorSlice(){
    return this.http.get(this.OrderAPIURL + '/getOperatorSlice');
  }
}
