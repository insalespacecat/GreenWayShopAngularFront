import {Component, Input, OnInit} from '@angular/core';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartService} from '../../services/cart.service';
import {CartItemInterface} from '../../interfaces/cart-item-interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() productInfo: ProductInterface;
  quantity = 1;
  cartItem: CartItemInterface = {id: null, quantity: null, price: null, name: null};
  constructor(private cartService: CartService) { }
  addToCart() {
    if (this.quantity > 0) {
    this.cartItem.id = this.productInfo.id;
    this.cartItem.name = this.productInfo.name;
    this.cartItem.quantity = this.quantity;
    this.cartItem.price = this.productInfo.price * this.quantity;
    this.cartService.add(this.cartItem);
    this.cartItem = {id: null, quantity: null, price: null, name: null};
    }
  }
  ngOnInit(): void {
  }

}
