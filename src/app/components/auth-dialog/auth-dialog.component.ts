import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RegistrationFormInterface} from '../../interfaces/registration-form-interface';
import {AuthService} from '../../services/auth.service';
import {LoginFormInterface} from '../../interfaces/login-form-interface';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})

export class AuthDialogComponent {

  //Forms for ngModel
  registrationForm: RegistrationFormInterface = {name: null, username: null, password: null, shippingAddress: null, phoneNumber: null};
  loginForm: LoginFormInterface = {username: null, password: null};

  //Variables consumed by ngIf to show error messages
  loginSuccess: boolean = true;
  registrationSuccess: boolean = true;

  formGroupRegistration = new FormGroup({
  usernameFormControl: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
  phoneFormControl: new FormControl('', [Validators.required, Validators.pattern('^\\+375 \\((17|29|33|44|25)\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')]),
  nameFormControl: new FormControl('', [Validators.required, Validators.maxLength(30)]),
  addressFormControl: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
  });

  formGroupLogin = new FormGroup({
    usernameFormControl: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>, public authService: AuthService) {
  }



  //Triggers for authService reg and auth methods
  initRegistrationProcess() {
    this.registrationSuccess = this.authService.registration(this.registrationForm);
    if(this.registrationSuccess){
    this.dialogRef.close();
    }
  }
  initLoginProcess(){
    this.authService.login(this.loginForm);
    this.dialogRef.close();
  }

}

/*
 //This syntactic madness here because of custom error messages
  //that (probably) cannot be shown with FormGroup sugar provider
  usernameFormControl = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern('^\\+375 \\((17|29|33|44|25)\\) [0-9]{3}-[0-9]{2}-[0-9]{2}$')]);
  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(30)]);
  addressFormControl = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]);



  //Stay calm:))))))))
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
 */
