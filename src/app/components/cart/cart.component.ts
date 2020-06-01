import {Component, DoCheck, Input, OnChanges, OnInit} from '@angular/core';

import {CartService} from '../../services/cart.service';
import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {OrderInterface} from '../../interfaces/order-interface';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements DoCheck {

  total = 0;
  info: OrderInterface = {id: null, name: null, items: null, paymentMethod: null, address: null, phoneNumber: null,
    total: null, user: this.authService.user};
  orderData: OrderInterface = {id: null, name: null, items: null, paymentMethod: null, address: null, phoneNumber: null,
    total: null, user: this.authService.user};
  orderResult: any = null;
  discount: number = null;
  paymentMethod: any;
  constructor(public cartService: CartService, private orderService: OrderService,  private orderDialog: MatDialog,
              private router: Router, private authService: AuthService) {
  }
  openOrderDialog(): void {
    this.info.items = this.cartService.get();
    this.info.total  = this.cartService.getTotalPrice();
    if (this.info.total > 0) {
      const dialogConfig = {
        width: '250px',
        data: {orderInfo: this.info}
      };
      const orderDialogRef = this.orderDialog.open(OrderDialogComponent, dialogConfig);

      orderDialogRef.afterClosed().subscribe(result => {
        this.orderData = result.orderInfo;
        if (this.orderData) {
          console.log('sending order ' + JSON.stringify(this.orderData));
          this.orderService.placeOrder(this.orderData).subscribe(
            res => {
              this.orderResult = res;
            }
          );
          this.cartService.deleteSync();
          this.info = {
            id: null, name: null, items: null, paymentMethod: null, address: null, phoneNumber: null,
            total: null, user: this.authService.user
          };
          this.router.navigateByUrl('/thankYou');
        }
      });
    }
  }
  discountPresented() {
    return this.discount !== null;
  }

  getTotal() {
    if (this.discountPresented()) {
      return (this.total - this.info.total / 100 * this.discount);
    }
    return this.total;
  }
  getDiscountInMoney() {
    return (this.total  / 100 * this.discount);
  }
  ngDoCheck(): void {
    this.total = this.cartService.getTotalPrice();
    if (this.authService.getLoginStatusFromSessionStorage()) {
      //this.discount = this.authService.getUserInfoFromSessionStorage().discount;
      this.discount = 5;
    }
  }
}
