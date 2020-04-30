import {Component, DoCheck, OnInit} from '@angular/core';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartService} from '../../services/cart.service';
import {CartItemInterface} from '../../interfaces/cart-item-interface';

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css']
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
    this.cartService.getSync();
    this.cartBody = this.cartService.get();
  }

  ngDoCheck(): void {
    this.cartBody = this.cartService.get();
    console.log(JSON.stringify(this.cartBody));
  }

}
