import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderInterface} from '../../interfaces/order-interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {
  info: OrderInterface = Object.assign({}, this.data.orderInfo);
  paymentMethod: any = null;
  discount: number = this.info.discount;
  orderResult: any;

  formGroup = new FormGroup({
    phoneFormControl: new FormControl('', [Validators.required, Validators.pattern('^\\+375 \\((17|29|33|44|25)\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')]),
    nameFormControl: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    addressFormControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
  });

  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private orderService: OrderService) {
  }
  onSubmit(){
    //sending order to backend
    this.info.paymentMethod = this.paymentMethod;

    console.log('sending order ' + JSON.stringify(this.info));
    this.orderService.placeOrder(this.info).subscribe(
      res => {
        this.orderResult = res;
      }
    );

    this.dialogRef.close(true);
  }
}
