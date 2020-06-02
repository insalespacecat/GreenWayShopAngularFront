import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartItemInterface} from '../../interfaces/cart-item-interface';
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  animations: [
    trigger('fade',
      [
        transition('* => void', [
          style({opacity: 0}),
          animate(400)
        ]),
        transition('void => *', [
          style({opacity: 0}),
          animate(400)]
        )
      ])
  ]
})
export class ProductCardComponent {

  @Input() productInfo: ProductInterface;
  @Output() syncCartContent = new EventEmitter<null>();

  cartItem: CartItemInterface = {id: null, quantity: 1, price: null, name: null};

  constructor(private cartService: CartService) { }

  addToCart() {
    this.assembleCartItem();
    this.cartService.add(this.cartItem);
    //this.purchaseProcessService.addItemToCart(this.cartItem);
    this.syncCartContent.emit();
  }

  private assembleCartItem(){
    this.cartItem.id = this.productInfo.id;
    this.cartItem.name = this.productInfo.name;
    this.cartItem.price = this.productInfo.price * this.cartItem.quantity;
  }

}
