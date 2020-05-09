import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CartComponent } from './components/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import { CartContentComponent } from './components/cart-content/cart-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { OrderResultDialogComponent } from './components/order-result-dialog/order-result-dialog.component';
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import {RouterModule} from '@angular/router';
import { AppRoutes } from './app.routes';
import {MatIconModule} from '@angular/material/icon';
import { QuantityPostfixPipe } from './pipes/quantityPostfix.pipe';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import {MatDividerModule} from '@angular/material/divider';
import {MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule} from '@angular/material/chips';
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ProductGridComponent,
    ProductCardComponent,
    CartComponent,
    CartContentComponent,
    OrderDialogComponent,
    OrderResultDialogComponent,
    OrderConfirmedComponent,
    QuantityPostfixPipe,
    AuthDialogComponent,
    LogoutConfirmationDialogComponent,
    MyAccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
    RouterModule,
    AppRoutes,
    MatIconModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDividerModule,
    MatChipsModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
