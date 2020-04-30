import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RegistrationFormInterface} from '../../interfaces/registration-form-interface';
import {AuthService} from '../../services/auth.service';
import {LoginFormInterface} from '../../interfaces/login-form-interface';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {
  regForm: RegistrationFormInterface = {name: null, username: null, password: null, shippingAddress: null, phoneNumber: null};
  logForm: LoginFormInterface = {username: null, password: null};
  usernameFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern('^\\+375 \\((17|29|33|44|25)\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')]);
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>, private authService: AuthService) {
  }
  usernameGetErrorMessage() {
    if (this.usernameFormControl.hasError('required')) {
      return 'Please, enter your username';
    }
    if (this.usernameFormControl.hasError('maxLength')) {
      return 'Username cannot be longer than 20 symbols';
    }
  }
  passwordGetErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return 'Password is required';
    }
    if (this.passwordFormControl.hasError('maxLength')) {
      return 'Your password should be longer than 5 symbols';
    }
  }
  phoneGetErrorMessage() {
    if (this.phoneFormControl.hasError('required')) {
      return 'We need your phone to call you back';
    }
    if (this.phoneFormControl.hasError('pattern')) {
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
  registration() {
    this.authService.registration(this.regForm);
    this.dialogRef.close();
  }
  login() {
    this.authService.login(this.logForm);
    this.authService.getUserInfo();
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }
}
