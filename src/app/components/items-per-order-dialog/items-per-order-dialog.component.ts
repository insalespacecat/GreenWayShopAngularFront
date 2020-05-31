import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderInterface} from "../../interfaces/order-interface";
import {ProductInterface} from "../../interfaces/product-interface";
import {CartItemInterface} from "../../interfaces/cart-item-interface";

@Component({
  selector: 'app-items-per-order-dialog',
  templateUrl: './items-per-order-dialog.component.html',
  styleUrls: ['./items-per-order-dialog.component.css']
})
export class ItemsPerOrderDialogComponent implements OnInit {

  items = Object.values(this.data.items);

  displayedColumns: string[] = ['name', 'quantity', 'price'];
  constructor(public dialogRef: MatDialogRef<ItemsPerOrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("ITEMS IN DIALOG: " + JSON.stringify(this.items));
    console.log("DATA:  " + JSON.stringify(this.data));
  }

}
