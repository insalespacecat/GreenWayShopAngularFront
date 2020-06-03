import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductInterface} from '../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  hostURL = 'https://greenway-backend.herokuapp.com/query/';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Array<ProductInterface>>(this.hostURL + 'getProducts', {withCredentials: true});
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
