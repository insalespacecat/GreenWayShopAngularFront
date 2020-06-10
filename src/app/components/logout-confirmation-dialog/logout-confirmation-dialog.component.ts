import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout-confirmation-dialog',
  templateUrl: './logout-confirmation-dialog.component.html',
  styleUrls: ['./logout-confirmation-dialog.component.css']
})
export class LogoutConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutConfirmationDialogComponent>, private authService: AuthService,
              private router: Router) { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

}
