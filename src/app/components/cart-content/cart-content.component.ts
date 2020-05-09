import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ProductInterface} from '../../interfaces/product-interface';
import {CartService} from '../../services/cart.service';
import {CartItemInterface} from '../../interfaces/cart-item-interface';
import {PurchaseProcessService} from "../../services/purchase-process.service";

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css']
})
export class CartContentComponent implements OnInit, DoCheck {

  displayedColumns: string[] = ['itemName', 'itemQuantity', 'itemPrice', 'deleteButtons'];
  cartBody;
  discount;

  constructor(private purchaseProcessService: PurchaseProcessService) { }


  deleteItem(item) {
    console.log('delete item is executed');
    this.purchaseProcessService.deleteItemFromCart(item);
    this.cartBody = this.purchaseProcessService.getCart();
  }

  ngOnInit(): void {
    this.purchaseProcessService.getSync();
    this.cartBody = this.purchaseProcessService.getCart();
  }

  ngDoCheck(): void {

    if(JSON.stringify(this.cartBody) !== JSON.stringify(this.purchaseProcessService.getCart())) {
      this.cartBody = this.purchaseProcessService.getCart();
      console.log('CB !== PPS.GC')
    }
    console.log('cart body in cartContent is ' + JSON.stringify(this.cartBody));
  }
}
