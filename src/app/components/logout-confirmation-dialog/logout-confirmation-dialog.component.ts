import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.css']
})
export class LogoutConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>, private authService: AuthService) { }

  logout() {
    this.authService.logout();
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
