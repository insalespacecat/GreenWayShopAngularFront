import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartItemInterface} from '../../interfaces/cart-item-interface';
import {PurchaseProcessService} from "../../services/purchase-process.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() productInfo: ProductInterface;
  cartItem: CartItemInterface = {id: null, quantity: 1, price: null, name: null};

  constructor(private purchaseProcessService: PurchaseProcessService) { }

  addToCart() {
    this.assemblyCartItem();
    this.purchaseProcessService.addItemToCart(this.cartItem);
  }

  private assemblyCartItem(){
    this.cartItem.id = this.productInfo.id;
    this.cartItem.name = this.productInfo.name;
    this.cartItem.price = this.productInfo.price * this.cartItem.quantity;
  }

}
