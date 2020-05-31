import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {OrderInterface} from '../../interfaces/order-interface';
import {CartService} from '../../services/cart.service';
import {Form, FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  info: OrderInterface = Object.assign({}, this.data.orderInfo);
  paymentMethod: any = null;
  discount: number = 5.0;
  phoneFromControl = new FormControl('', [Validators.required, Validators.pattern('^\\+375 \\((17|29|33|44|25)\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')]);
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);
  constructor(public dialogRef: MatDialogRef<OrderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  phoneGetErrorMessage() {
    if (this.phoneFromControl.hasError('required')) {
      return 'We need your phone to call you back';
    }
    if (this.phoneFromControl.hasError('pattern')) {
      return 'Please use +375 (12) 345-67-89 format';
    }
  }
  nameGetErrorMessage() {
    if (this.nameFormControl.hasError('required')) {
      return 'Please, enter your name';
    }
    if (this.nameFormControl.hasError('maxLength')) {
      return 'Sorry, name cannot be longer than 30 symbols';
    }
  }
  addressGetErrorMessage() {
    if (this.addressFormControl.hasError('required')) {
      return 'Please, enter the address';
    }
    if (this.addressFormControl.hasError('minLength')) {
      return 'Please, enter full address';
    }
    if (this.addressFormControl.hasError('maxLength')) {
      return 'Sorry, your address is too long';
    }
  }
  paymentMethodChecked() {
    return this.paymentMethod != null;
  }
  onSubmit() {
    this.info.total = this.getTotal();
    this.data.orderInfo = Object.assign({}, this.info);
    this.data.orderInfo.paymentMethod = this.paymentMethod;
    this.dialogRef.close(this.data);
  }
  discountPresented() {
    return this.discount === null;
  }
  getTotal() {
    if (this.discountPresented()) {
      return (this.info.total - this.info.total / 100 * this.discount);
    }
    return this.info.total;
  }
  getDiscountInMoney() {
    return (this.info.total  / 100 * this.discount);
  }
  ngOnInit(): void {
  }

}
