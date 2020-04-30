import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductInterface} from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  hostURL = 'https://localhost:8443/query/';
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7'
  });
  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Array<ProductInterface>>(this.hostURL + 'getProducts', {headers: this.headers, withCredentials: true});
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
