import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductInterface} from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  hostURL = 'https://greenway-backend.herokuapp.com/query/';
  token: string;
  private headers;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'ru-RU,ru;q=0.9,en-US,en;q=0.5',
      'Authorization': 'Bearer ' + JSON.parse(this.token) } );
  }

  getProducts() {
    return this.http.get<Array<ProductInterface>>(this.hostURL + 'getProducts');
  }
  addProduct(productToPost: ProductInterface) {
    return this.http.post(this.hostURL + 'addProduct', productToPost);
  }
  patchProduct(productId: number, patchedProduct: ProductInterface) {
    return this.http.patch(this.hostURL + 'patch/' + productId, patchedProduct);
  }
  deleteProduct(productId: number) {
    return this.http.delete(this.hostURL + 'delete/' + productId);
  }
}
