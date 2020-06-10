import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AuthDialogComponent} from '../auth-dialog/auth-dialog.component';
import {AuthService} from '../../services/auth.service';
import {LogoutConfirmationDialogComponent} from '../logout-confirmation-dialog/logout-confirmation-dialog.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  animations: [
    trigger('fade',
      [
        transition('* => void', [
          style({opacity: 0}),
          animate(400)
        ]),
        transition('void => *',[
          style({opacity: 0}),
          animate(400)
        ])
      ])
  ]
})
export class NavigationBarComponent {

  constructor(private dialog: MatDialog, private authService: AuthService) {
  }

  authenticationStatus() {
    return this.authService.getAuthenticationStatus();
  }
  openAuthDialog(): void {
    const dialogConfig = {
      width: '250px',
    };
    const orderDialogRef = this.dialog.open(AuthDialogComponent, dialogConfig);
  }
  openLogoutConfirmationDialog(): void {
    const dialogConfig = {
      width: '250px',
    };
    const logoutConfirmationDialogRef = this.dialog.open(LogoutConfirmationDialogComponent, dialogConfig);
  }
}

