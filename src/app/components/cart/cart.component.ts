import {Component, DoCheck, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {OrderInterface} from '../../interfaces/order-interface';

import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from "../../interfaces/user-interface";
import {PurchaseProcessService} from "../../services/purchase-process.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
//CartComponent's logic is responsible for preparation of cart information and shipping of it into the order dialog
//CartContentComponent is responsible for showing cart's body in the view, it is placed in CartComponent using <ng-content>

//So CartComponent's logic is concentrated on ORDER button. Order button here should open OrderDialog.
//openOrderDialog() assembles order object and ships it in order dialog, after order dialog closing,
//if dialog returns true, cart is deleted and user is navigated on /thankYou page
export class CartComponent implements DoCheck, OnInit {

  //This component requires userInfo, so it consumes it from sessionStorage using authService onInit and
  //uses the local variable. If there is no user storage, then variable is to be initialized with nulls
  userInfo: UserInterface;

  total = 0;
  order: OrderInterface = {id: null, name: null, items: null, paymentMethod: null, address: null, phoneNumber: null, total: null,
    user: this.authService.getUserInfoFromSessionStorage(), discount: this.authService.getUserInfoFromSessionStorage().discount};

  orderResult: any = null;
  discount: number = null;

  constructor(public purchaseProcessService: PurchaseProcessService, private orderDialog: MatDialog,
              private router: Router, private authService: AuthService) {
  }

  openOrderDialog(): void {
    console.log('openOrderDialog is executed');
    this.order.items = this.purchaseProcessService.getCart();
    this.order.total  = this.purchaseProcessService.getTotalPrice();
    this.order.discount = this.discount;

    if (this.order.total > 0) {
      const dialogConfig = {
        width: '250px',
        data: {orderInfo: this.order}
      };
      const orderDialogRef = this.orderDialog.open(OrderDialogComponent, dialogConfig);
      console.log('dialog is opened');
      orderDialogRef.afterClosed().subscribe(result => {
        this.orderResult = result;
        //true is expected form order dialog. Means successful order and cart is to be deleted.
        if (this.orderResult) {
          this.purchaseProcessService.deleteSync();
          this.order = {
            id: null, name: null, items: null, paymentMethod: null, address: null, phoneNumber: null,
            total: null, user: this.authService.getUserInfoFromSessionStorage(), discount: this.authService.getUserInfoFromSessionStorage().discount
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
      return (this.total - this.order.total / 100 * this.discount);
    }
    return this.total;
  }
  getDiscountInMoney() {
    return (this.total  / 100 * this.discount);
  }
  ngDoCheck(): void {
    this.total = this.purchaseProcessService.getTotalPrice();
    if (this.authService.getLoginStatusFromSessionStorage()) {
      this.discount = this.authService.getUserInfoFromSessionStorage().discount;
    }
  }
  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfoFromSessionStorage();
  }
}
