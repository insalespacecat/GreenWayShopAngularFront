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

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userInfo: UserInterface;
  orders: Array<OrderInterface> = null;
  ordersDataSource;
  displayedColumns: string[] = ['id', 'total', 'items'];
  constructor(private authService: AuthService, private orderService: OrderService, private dialog: MatDialog) {
    console.log('user info in authService is: ' + JSON.stringify(authService.getUserInfoFromSessionStorage()));
    this.userInfo = authService.getUserInfoFromSessionStorage();
  }


  ngOnInit(): void {
    if(!this.userInfo) {
      this.openAuthDialog();
    } else {
      this.orderService.getAllOrdersByUsername(this.userInfo.username).subscribe(res => this.orders = res);
    }
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
    const orderDialogRef = this.dialog.open(AuthDialogComponent, dialogConfig);
  }
}
