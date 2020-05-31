import {Component, DoCheck, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OrderService} from '../../services/order.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent  {
  constructor(private authDialog: MatDialog) {
  }
  openAuthDialog(): void {
      const dialogConfig = {
        width: '250px',
      };
      const orderDialogRef = this.authDialog.open(AuthDialogComponent, dialogConfig);
    }
}
