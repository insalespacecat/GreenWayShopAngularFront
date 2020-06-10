import {AfterViewChecked, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from '../../interfaces/user-interface';
import {OrderInterface} from '../../interfaces/order-interface';
import {OrderService} from '../../services/order.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';
import {ItemsPerOrderDialogComponent} from '../items-per-order-dialog/items-per-order-dialog.component';
import {CartItemInterface} from '../../interfaces/cart-item-interface';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
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
export class MyAccountComponent implements OnInit, DoCheck {
  userInfo: UserInterface = {name: null, username: null, authorities: null, active: null, phoneNumber: null, discount: null, shippingAddress: null};
  orders: Array<OrderInterface> = null;
  ordersRetrieved: boolean;
  displayedColumns: string[] = ['id', 'total', 'items'];


  constructor(private authService: AuthService, private orderService: OrderService, private dialog: MatDialog) {
    console.log('user info in authService is: ' + JSON.stringify(authService.getUserInfoFromLocalStorage()));
    this.userInfo = authService.getUserInfoFromLocalStorage();
  }
  ngOnInit(): void {
    this.authService.loadUserInfoFromAPI().subscribe(userData => {
      this.userInfo = userData;
      console.log('Logged in user: ' + JSON.stringify(this.userInfo));
    });
    if(this.userInfo == null){
      this.userInfo = {name: null, username: null, authorities: null, active: null, phoneNumber: null, discount: null, shippingAddress: null};
    }
  }
  ngDoCheck(): void {
    if(this.userInfo.username && !this.ordersRetrieved){
      this.orderService.getAllOrdersByUsername(this.userInfo.username).subscribe(res => this.orders = res);
      this.ordersRetrieved = true;
    }
    if(this.userInfo == null){
      this.userInfo = {name: null, username: null, authorities: null, active: null, phoneNumber: null, discount: null, shippingAddress: null};
    }
  }

  openItemsDialog(items: Array<CartItemInterface>): void {
    console.log('ITEMS: ' + JSON.stringify(items));
    const dialogConfig = {
      width: '400px',
      data: {items}
    };
    const orderDialogRef = this.dialog.open(ItemsPerOrderDialogComponent, dialogConfig);
  }
  openAuthDialog(): void {
    const dialogConfig = {
      width: '250px',
    };
    const orderDialogRef = this.dialog.open(AuthDialogComponent, dialogConfig);
  }
}
