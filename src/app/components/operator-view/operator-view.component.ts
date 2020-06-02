import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderInterface} from "../../interfaces/order-interface";
import {MatDialog} from "@angular/material/dialog";
import {CartItemInterface} from "../../interfaces/cart-item-interface";
import {ItemsPerOrderDialogComponent} from "../items-per-order-dialog/items-per-order-dialog.component";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-operator-view',
  templateUrl: './operator-view.component.html',
  styleUrls: ['./operator-view.component.css']
})
export class OperatorViewComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['id', 'items', 'total', 'name', 'address', 'phoneNumber', 'paymentMethod'];

  constructor(private orderService: OrderService, private dialog: MatDialog) {
  }

  openItemsDialog(items: Array<CartItemInterface>): void {
    console.log("ITEMS: " + JSON.stringify(items));
    const dialogConfig = {
      width: '400px',
      data: {items}
    };
    const orderDialogRef = this.dialog.open(ItemsPerOrderDialogComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.orderService.getOperatorSlice().subscribe(res => {this.dataSource = res});
  }


}
