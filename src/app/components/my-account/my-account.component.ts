import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from '../../interfaces/user-interface';
import {OrderInterface} from "../../interfaces/order-interface";
import {OrderService} from "../../services/order.service";
import {MatDialog} from "@angular/material/dialog";
import {AuthDialogComponent} from "../auth-dialog/auth-dialog.component";
import {LogoutConfirmationDialogComponent} from "../logout-confirmation-dialog/logout-confirmation-dialog.component";
import {ItemsPerOrderDialogComponent} from "../items-per-order-dialog/items-per-order-dialog.component";
import {CartItemInterface} from "../../interfaces/cart-item-interface";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {animate, style, transition, trigger} from "@angular/animations";

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
export class MyAccountComponent implements OnInit {
  userInfo: UserInterface = {username: "alexandraSav", name: "Alexandra", authorities: "USER", active: true,
    phoneNumber: "+375 (33) 123-12-31", discount: 5, shippingAddress: "Minsk, ul Lenina 15, kv 34"};
  orders: Array<OrderInterface> =
    [{id: 74, paymentMethod: "creditCard", total: 45, user: null, name: "Alexandra", address: "Minsk, ul Lenina 15, kv 34",
    phoneNumber: "+375 (33) 123-12-31", items: [{name: "Green tea", quantity: 3, price: 15, id: 4}] },
      {id: 125, paymentMethod: "creditCard", total: 80, user: null, name: "Alexandra", address: "Minsk, ul Lenina 15, kv 34",
        phoneNumber: "+375 (33) 123-12-31", items: [{name: "Green tea", quantity: 3, price: 15, id: 4}, {name: "Aloe Vera plant",
        id: 12, price: 17.5, quantity: 2}] }];

  ordersDataSource;
  displayedColumns: string[] = ['id', 'total', 'items'];
  constructor(private authService: AuthService, private orderService: OrderService, private dialog: MatDialog) {
    console.log('user info in authService is: ' + JSON.stringify(authService.getUserInfoFromSessionStorage()));
    //this.userInfo = authService.getUserInfoFromSessionStorage();
  }
  ngOnInit(): void {
    /*
    this.authService.loadUserInfoFromAPI();
    this.userInfo = this.authService.getUserInfoFromSessionStorage();
    console.log('user info is' + JSON.stringify(this.userInfo));
    if(!this.userInfo) {
      this.openAuthDialog();
    } else {
      this.orderService.getAllOrdersByUsername(this.userInfo.username).subscribe(res => this.orders = res);
    }
     */
  }

  openItemsDialog(items: Array<CartItemInterface>): void {
    console.log("ITEMS: " + JSON.stringify(items));
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
    //const orderDialogRef = this.dialog.open(AuthDialogComponent, dialogConfig);
  }
}
