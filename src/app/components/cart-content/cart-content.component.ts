import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PurchaseProcessService} from "../../services/purchase-process.service";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css']
})
export class CartContentComponent implements OnInit {

  displayedColumns: string[] = ['itemName', 'itemQuantity', 'itemPrice', 'deleteButtons'];
  cartBody;
  discount;

  constructor(private purchaseProcessService: PurchaseProcessService, private cartService: CartService) {
  }

  deleteItem(item) {
    console.log('delete item is executed');
    this.purchaseProcessService.deleteItemFromCart(item);
    this.cartBody = this.purchaseProcessService.getCart();
  }

  ngOnInit(): void {
    this.cartService.getSync();
    this.cartBody = this.cartService.get();
    //this.cartBody = this.cartService.getItems();
    //this.cartBody = this.purchaseProcessService.getCart();
  }

  refreshCartView() {
    console.log("CartView refresh is triggered!");
    this.cartService.getSync();
    this.cartBody = this.cartService.get();
    //this.cartBody = this.purchaseProcessService.getCart();
  }
}
