import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PurchaseProcessService} from "../../services/purchase-process.service";

@Component({
  selector: 'app-cart-content',
  templateUrl: './cart-content.component.html',
  styleUrls: ['./cart-content.component.css']
})
export class CartContentComponent implements OnInit {

  displayedColumns: string[] = ['itemName', 'itemQuantity', 'itemPrice', 'deleteButtons'];
  cartBody;
  discount;

  constructor(private purchaseProcessService: PurchaseProcessService) {
  }

  deleteItem(item) {
    console.log('delete item is executed');
    this.purchaseProcessService.deleteItemFromCart(item);
    this.cartBody = this.purchaseProcessService.getCart();
  }

  ngOnInit(): void {
    this.purchaseProcessService.getSync();
    this.cartBody = this.purchaseProcessService.getCart();
  }

  refreshCartView() {
    console.log("CartView refresh is triggered!");
    this.cartBody = this.purchaseProcessService.getCart();
  }
}
