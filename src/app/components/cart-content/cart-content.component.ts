import {Component, DoCheck, OnInit} from '@angular/core';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartService} from '../../services/cart.service';
import {CartItemInterface} from '../../interfaces/cart-item-interface';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css'],
  animations: [
    trigger('fade',
      [
        transition('* => void', [
          style({opacity: 0}),
          animate(400)
        ]),
        transition('void => *',[
          style({opacity: 0}),
          animate(400)
        ])
      ])
  ]
})
export class CartContentComponent implements OnInit, DoCheck {
  displayedColumns: string[] = ['itemName', 'itemQuantity', 'itemPrice', 'deleteButtons'];
  cartBody: Array<CartItemInterface>;
  discount;
  constructor(private cartService: CartService) { }
  deleteItem(index: number) {
    this.cartService.remove(index);
    this.cartBody = this.cartService.get();
  }
  ngOnInit(): void {
    this.cartService.getCartFromSessionStorage();
    this.cartBody = this.cartService.get();
  }
  ngDoCheck(): void {
    this.cartBody = this.cartService.get();
    console.log(JSON.stringify(this.cartBody));
  }

}
