import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-order-result-dialog',
  templateUrl: './order-result-dialog.component.html',
  styleUrls: ['./order-result-dialog.component.css']
})
export class OrderResultDialogComponent implements OnInit {

  orderId = Object.assign(this.data.id);
  constructor(public dialogRef: MatDialogRef<OrderResultDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  orderSuccess() {
    if (this.orderId) {
      return 'Order has been placed!';
    } else {
      return 'Sorry, your order has not been placed:( Please, contact developer to get help';
    }
  }
  closeDialog() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
